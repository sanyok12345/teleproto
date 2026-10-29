import bigInt from "big-integer";
import { Api } from "../../tl";
import { GZIPPacked, MessageContainer, RPCResult, TLMessage } from "../../tl/core";
import { Reader } from "../../tl/binary/Reader";
import type { Logger } from "../../extensions/Logger";
import { BadMessageError, RPCMessageToError, type RPCError } from "../../errors";
import { unionId } from "../../Helpers";
import type { SessionState } from "./SessionState";
import type { PendingRequests } from "./PendingRequests";
import { readResult, RequestState } from "./RequestState";
import { Buffer } from "../../platform";

const UPDATES_ID = unionId("Updates");

const RESEND_CODES = new Set([16, 20]);
const NEW_SESSION_CODES = new Set([17, 32, 33, 34, 35]);
const INIT_ERRORS = new Set(["CONNECTION_NOT_INITED", "CONNECTION_LAYER_INVALID"]);
const AUTH_LOST_ERRORS = new Set(["AUTH_KEY_UNREGISTERED", "SESSION_REVOKED"]);

export interface RouterHost {
    readonly log: Logger;
    readonly state: SessionState;
    readonly pending: PendingRequests;
    readonly isMain: boolean;
    ack(msgId: bigInt.BigInteger): void;
    sendService(request: Api.MsgsStateInfo | Api.MsgResendReq): void;
    requeue(states: RequestState[]): void;
    resendBefore(firstMsgId: bigInt.BigInteger): void;
    setSalt(salt: bigInt.BigInteger): void;
    badSalt(salt: bigInt.BigInteger): void;
    restartSession(): void;
    requireInit(): void;
    initAnswered(): void;
    authLost(error: RPCError): void;
    tempKeyRejected(): void;
    stateInfo(reqMsgId: bigInt.BigInteger, info: Buffer): void;
    update(update: Api.TypeUpdates): void;
}

function isUpdates(body: unknown): body is Api.TypeUpdates {
    return (body as { SUBCLASS_OF_ID?: number } | undefined)?.SUBCLASS_OF_ID === UPDATES_ID;
}

export class MessageRouter {
    private sessionUniqueId?: string;

    constructor(private readonly host: RouterHost) {}

    route(message: TLMessage): void {
        this.host.ack(message.msgId);
        const body = message.obj;
        if (body instanceof MessageContainer) {
            for (const inner of body.messages) this.route(inner);
        } else if (body instanceof GZIPPacked) {
            this.route(new TLMessage(message.msgId, 0, new Reader(body.data).tgReadObject()));
        } else if (body instanceof RPCResult) {
            this.rpcResult(body);
        } else if (body instanceof Api.Pong) {
            this.host.pending.take(body.msgId)?.resolve(body);
        } else if (body instanceof Api.FutureSalts) {
            this.host.pending.take(body.reqMsgId)?.resolve(body);
        } else if (body instanceof Api.BadServerSalt) {
            this.host.badSalt(body.newServerSalt);
            this.host.requeue(this.host.pending.takeMessage(body.badMsgId));
        } else if (body instanceof Api.BadMsgNotification) {
            this.badMessage(body, message.msgId);
        } else if (body instanceof Api.NewSessionCreated) {
            this.newSession(body);
        } else if (body instanceof Api.MsgsAck) {
            for (const msgId of body.msgIds) {
                const state = this.host.pending.get(msgId);
                if (state) state.acknowledged = true;
            }
        } else if (body instanceof Api.MsgDetailedInfo) {
            if (this.host.pending.get(body.msgId) && !this.host.state.hasReceived(body.answerMsgId)) {
                this.host.sendService(new Api.MsgResendReq({ msgIds: [body.answerMsgId] }));
            } else {
                this.host.ack(body.answerMsgId);
            }
        } else if (body instanceof Api.MsgNewDetailedInfo) {
            if (this.host.state.hasReceived(body.answerMsgId)) this.host.ack(body.answerMsgId);
            else this.host.sendService(new Api.MsgResendReq({ msgIds: [body.answerMsgId] }));
        } else if (body instanceof Api.MsgsStateReq || body instanceof Api.MsgResendReq) {
            this.host.sendService(
                new Api.MsgsStateInfo({ reqMsgId: message.msgId, info: "\x01".repeat(body.msgIds.length) })
            );
        } else if (body instanceof Api.MsgsStateInfo) {
            this.host.stateInfo(body.reqMsgId, Buffer.from(body.info, "binary"));
        } else if (body instanceof Api.MsgsAllInfo) {
            return;
        } else if (isUpdates(body)) {
            this.host.update(body);
        } else {
            this.host.log.warn(`Ignoring unexpected ${(body as { className?: string })?.className ?? typeof body}`);
        }
    }

    private rpcResult(result: RPCResult) {
        const state = this.host.pending.take(result.reqMsgId);
        if (!state) {
            this.host.log.debug(`Result for unknown request ${result.reqMsgId}`);
            return;
        }
        if (result.error) {
            const error = RPCMessageToError(result.error, state.request as Api.AnyRequest);
            if (INIT_ERRORS.has(error.errorMessage)) {
                this.host.requireInit();
                this.host.requeue([state]);
                return;
            }
            if (error.errorMessage === "AUTH_KEY_PERM_EMPTY") {
                this.host.requeue([state]);
                this.host.tempKeyRejected();
                return;
            }
            if (state.initWrapped && error.code !== 401) this.host.initAnswered();
            state.reject(error);
            if (AUTH_LOST_ERRORS.has(error.errorMessage)) this.host.authLost(error);
            return;
        }
        try {
            const value = readResult(state.request, new Reader(result.body ?? Buffer.alloc(0)));
            if (state.initWrapped) this.host.initAnswered();
            state.resolve(value);
        } catch (error) {
            this.host.log.error(`Failed to read result for ${state.request.className}`, error);
            state.reject(error);
        }
    }

    private badMessage(notice: Api.BadMsgNotification, serverMsgId: bigInt.BigInteger) {
        const states = this.host.pending.takeMessage(notice.badMsgId);
        const code = notice.errorCode;
        this.host.log.debug(`bad_msg_notification ${code} for ${notice.badMsgId}`);
        if (code === 16 || code === 17) this.host.state.updateTimeOffset(bigInt(serverMsgId));
        if (RESEND_CODES.has(code)) {
            this.host.requeue(states);
        } else if (NEW_SESSION_CODES.has(code)) {
            this.host.requeue(states);
            this.host.restartSession();
        } else {
            for (const state of states) {
                if (!(state.request instanceof Api.MsgsAck)) state.reject(new BadMessageError(state.request as Api.AnyRequest, code));
            }
        }
    }

    private newSession(created: Api.NewSessionCreated) {
        this.host.resendBefore(created.firstMsgId);
        this.host.setSalt(created.serverSalt);
        const uniqueId = created.uniqueId.toString();
        const previous = this.sessionUniqueId;
        this.sessionUniqueId = uniqueId;
        if (previous !== undefined && previous !== uniqueId) this.host.requireInit();
        if (this.host.isMain) this.host.update(new Api.UpdatesTooLong());
    }

    reset() {
        this.sessionUniqueId = undefined;
    }
}
