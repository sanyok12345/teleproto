import { Api } from "../../tl";
import * as errors from "../../errors";
import * as utils from "../../Utils";
import { unionId } from "../../Helpers";
import type { TelegramClient } from "../TelegramClient";
import type bigInt from "big-integer";
import { RequestState } from "../../network/mtproto/RequestState";
import { MTProtoSender } from "../../network";
import type { SessionLease } from "../../network/dc/SessionPool";
import { RpcCallControl } from "./RpcCallControl";
import { _resaveUploadedParts } from "../methods/uploads";

/**
 * Invokes a raw Telegram API request and returns the result.
 *
 * Handles automatic retry on transient errors (server errors, flood waits below
 * {@link TelegramClientParams.floodSleepThreshold}, DC migration, reCAPTCHA),
 * and caches any entities found in the response.
 *
 * @param client - The Telegram client instance.
 * @param request - The MTProto request to invoke.
 * @param dcId - Optional DC to send the request to (uses a borrowed sender).
 * @param otherSender - Optional explicit sender to use instead of the default.
 * @returns The response corresponding to the request type.
 * @throws {FloodWaitError} If the flood wait exceeds `floodSleepThreshold`.
 * @throws {Error} If the request fails after all retries.
 * @hidden
 */
interface InvokeAttempt {
    client: TelegramClient;
    request: Api.AnyRequest;
    state: RequestState;
    dcId?: number;
    sender: MTProtoSender;
    lease?: SessionLease;
    control: RpcCallControl;
    options: Api.ApiCallOptions;
    resavedFiles?: boolean;
}

type InvokeErrorPolicy = (e: any, ctx: InvokeAttempt) => Promise<boolean>;

const telegramInternalErrors: InvokeErrorPolicy = async (e, ctx) => {
    if (
        !(
            e instanceof errors.ServerError ||
            e.errorMessage === "RPC_CALL_FAIL" ||
            e.errorMessage === "RPC_MCGET_FAIL"
        )
    ) {
        return false;
    }
    ctx.client._log.warn(
        `Telegram is having internal issues ${e.constructor.name}`
    );
    await ctx.control.sleep(2000);
    return true;
};

const floodWait: InvokeErrorPolicy = async (e, ctx) => {
    if (
        !(
            e instanceof errors.FloodWaitError ||
            e instanceof errors.FloodTestPhoneWaitError
        )
    ) {
        return false;
    }
    if (e.seconds > (ctx.options.floodSleepThreshold ?? ctx.client.floodSleepThreshold)) {
        throw e;
    }
    ctx.client._log.info(
        `Sleeping for ${e.seconds}s on flood wait (Caused by ${ctx.request.className})`
    );
    await ctx.control.sleep(e.seconds * 1000);
    return true;
};

const dcMigration: InvokeErrorPolicy = async (e, ctx) => {
    if (
        !(
            e instanceof errors.PhoneMigrateError ||
            e instanceof errors.NetworkMigrateError ||
            e instanceof errors.UserMigrateError
        )
    ) {
        return false;
    }
    if (
        e instanceof errors.UserMigrateError &&
        (ctx.dcId !== undefined || ctx.sender !== ctx.client._sender) &&
        e.newDc === ctx.client.session.dcId
    ) {
        ctx.client._log.info(
            `Request must run on the home DC ${e.newDc}; rerouting to the main sender`
        );
        ctx.lease?.release();
        ctx.lease = undefined;
        ctx.dcId = undefined;
        ctx.sender = ctx.client._sender!;
        return true;
    }
    ctx.client._log.info(`Migrating to data center ${e.newDc}`);
    const shouldRaise =
        e instanceof errors.PhoneMigrateError ||
        e instanceof errors.NetworkMigrateError;
    if (shouldRaise && (await ctx.control.wait(ctx.client.isUserAuthorized()))) {
        throw e;
    }
    ctx.control.check();
    await ctx.control.wait(ctx.client._switchDC(e.newDc));
    ctx.control.check();
    ctx.lease?.release();
    ctx.lease = undefined;
    if (ctx.dcId === undefined) {
        ctx.sender = ctx.client._sender!;
    } else {
        ctx.lease = await ctx.control.wait<SessionLease>(ctx.client._leaseSender(ctx.dcId).then((lease) => {
            if (ctx.control.signal.aborted) lease.release();
            return lease;
        }));
        ctx.sender = ctx.lease.sender;
    }
    return true;
};

const msgWait: InvokeErrorPolicy = async (e, ctx) => {
    if (!(e instanceof errors.MsgWaitError)) {
        return false;
    }
    await ctx.control.wait(ctx.state.isReady());
    ctx.state.after = undefined;
    return true;
};

const reCaptcha: InvokeErrorPolicy = async (e, ctx) => {
    if (
        !(
            e.errorMessage &&
            e.errorMessage.startsWith("RECAPTCHA_CHECK_") &&
            ctx.client._reCaptchaCallback
        )
    ) {
        return false;
    }
    const match = e.errorMessage.match(/RECAPTCHA_CHECK_.*(6Le[-\w]+)/);
    if (!match) {
        throw e;
    }
    const token = await ctx.control.wait(ctx.client._reCaptchaCallback(match[1]));
    ctx.control.check();
    const newRequest = new Api.InvokeWithReCaptcha({
        token: token,
        query: ctx.request,
    });
    await ctx.control.wait(newRequest.resolve(ctx.client, utils));
    ctx.control.check();
    ctx.state.request = newRequest;
    ctx.state.data = newRequest.getBytes();
    return true;
};

const connectionNotInited: InvokeErrorPolicy = async (e, ctx) => {
    if (e.message !== "CONNECTION_NOT_INITED") {
        return false;
    }
    const targetSender = ctx.sender || ctx.client._sender;
    if (targetSender) {
        targetSender._needsInitConnection = true;
    }
    ctx.client._log.warn(
        "CONNECTION_NOT_INITED, will re-wrap next request with initConnection"
    );
    return true;
};

const missingFileParts: InvokeErrorPolicy = async (e, ctx) => {
    const part = e instanceof errors.FilePartMissingError ? e.value : e.errorMessage === "MD5_CHECKSUM_INVALID" ? "all" : undefined;
    if (part === undefined || ctx.resavedFiles) return false;
    ctx.resavedFiles = true;
    return ctx.control.wait(_resaveUploadedParts(ctx.client, ctx.request, part));
};

const INVOKE_ERROR_POLICIES: InvokeErrorPolicy[] = [
    telegramInternalErrors,
    floodWait,
    dcMigration,
    msgWait,
    reCaptcha,
    connectionNotInited,
    missingFileParts,
];

export async function invoke<R extends Api.AnyRequest>(
    client: TelegramClient,
    request: R,
    dcId?: number,
    otherSender?: MTProtoSender | SessionLease,
    options: Api.ApiCallOptions = {}
): Promise<R["__response"]> {
    if (request.classType !== "request") {
        throw new Error("You can only invoke MTProtoRequests");
    }
    const control = new RpcCallControl(options);
    const authorizationError = client.updates.authorizationError;
    const ctx: InvokeAttempt = {
        client, request, state: undefined!, dcId, sender: client._sender!, control, options,
    };
    try {
        control.check();
        if (dcId) {
            ctx.lease = await control.wait<SessionLease>(client._leaseSender(dcId).then((lease) => {
                if (control.signal.aborted) lease.release();
                return lease;
            }));
            ctx.sender = ctx.lease.sender;
        }
        if (otherSender !== undefined) {
            ctx.sender = otherSender instanceof MTProtoSender ? otherSender : otherSender.sender;
        }
        if (!ctx.sender || ctx.sender.userDisconnected) {
            throw new Error("Cannot send requests while disconnected. Please connect first.");
        }
        await control.wait(client._connectedDeferred.promise);
        control.check();
        await control.wait(request.resolve(client, utils));
        control.check();
        client._lastRequest = Date.now();
        const state = new RequestState(request);
        ctx.state = state;
        const attempts = options.maxRetryCount === undefined ? client._requestRetries : options.maxRetryCount + 1;
        let attempt: number = 0;
        for (attempt = 0; attempt < attempts; attempt++) {
            control.check();
            ctx.sender.addStateToQueue(state);

            try {
                const result = await control.wait(state.promise);
                state.finished.resolve();
                try {
                    await client.session.processEntities(result);
                } catch (err) {
                    client._log.warn(`session.processEntities failed: ${err}`);
                }
                client._entityCache.add(result);

                if (!dcId && !otherSender) {
                    if (result instanceof Api.auth.Authorization || result instanceof Api.auth.LoginTokenSuccess ||
                        (result instanceof Api.updates.State && authorizationError !== undefined &&
                            authorizationError === client.updates.authorizationError)) {
                        client.updates._resumeAuthorization();
                    }
                    const sub = (result as { SUBCLASS_OF_ID?: number })
                        ?.SUBCLASS_OF_ID;
                    if (sub === unionId("Updates")) {
                        client.updateManager.onUpdates(
                            result as Api.TypeUpdates,
                            true,
                            request
                        );
                    } else if (
                        sub === unionId("messages.AffectedMessages") ||
                        sub === unionId("messages.AffectedHistory") ||
                        sub === unionId("messages.AffectedFoundMessages")
                    ) {
                        const affected = result as {
                            pts: number;
                            ptsCount: number;
                        };
                        type WrappedRequest = {
                            query?: unknown;
                            channel?: { channelId?: bigInt.BigInteger };
                        };
                        let affectedRequest = request as WrappedRequest;
                        while ((affectedRequest.query as { classType?: string })?.classType === "request") {
                            affectedRequest = affectedRequest.query as WrappedRequest;
                        }
                        const channel = affectedRequest.channel;
                        client.updateManager.applyAffected(
                            affected.pts,
                            affected.ptsCount,
                            channel?.channelId?.toString()
                        );
                    }
                }

                return result;
            } catch (e: any) {
                control.check();
                if ((e instanceof errors.FloodWaitError || e instanceof errors.FloodTestPhoneWaitError) &&
                    client.updateManager.handleChannelFloodWait(request, e.seconds)) throw e;
                if (attempt + 1 >= attempts) throw e;
                let recovered = false;
                for (const policy of INVOKE_ERROR_POLICIES) {
                    try {
                        recovered = await policy(e, ctx);
                    } catch (fatal) {
                        state.finished.resolve();
                        throw fatal;
                    }
                    if (recovered) break;
                }
                if (!recovered) {
                    state.finished.resolve();
                    throw e;
                }
            }
            state.resetPromise();
        }
        throw new Error(`Request was unsuccessful ${attempt} time(s)`);
    } finally {
        if (ctx.state) {
            if (control.signal.aborted) ctx.sender.cancelRequest(ctx.state, control.signal.reason);
            ctx.state.finished.resolve();
        }
        ctx.lease?.release();
        control.dispose();
    }
}
