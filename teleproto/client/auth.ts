import { Api } from "../tl";
import * as utils from "../Utils";
import { sleep } from "../Helpers";
import { computeCheck as computePasswordSrpCheck } from "../Password";
import { UnauthorizedError } from "../errors";
import type { TelegramClient } from "./TelegramClient";

/**
 * Email verification options passed to the email callback.
 */
export interface EmailVerificationOptions {
    /** Whether Google Sign-In is allowed for email verification. */
    googleSigninAllowed?: boolean;
    /** Whether Apple Sign-In is allowed for email verification. */
    appleSigninAllowed?: boolean;
    /** The email pattern (masked email) when code was sent to existing email. */
    emailPattern?: string;
    /** The code length when email code is expected. */
    codeLength?: number;
    /** Period in seconds after which the email can be reset. */
    resetAvailablePeriod?: number;
    /** Date when the pending reset will complete. */
    resetPendingDate?: number;
}

/**
 * Result from the email callback - can be code, Google token, or Apple token.
 */
export type EmailVerificationResult =
    | { type: "code"; code: string }
    | { type: "google"; token: string }
    | { type: "apple"; token: string };

/**
 * How the login code was delivered.
 */
export type CodeDeliveryType =
    | "app"
    | "sms"
    | "call"
    | "flashCall"
    | "missedCall"
    | "fragment"
    | "smsWord"
    | "smsPhrase";

/**
 * How the login code will be delivered after {@link SentCodeInfo.resend}.
 */
export type NextCodeDeliveryType =
    | "sms"
    | "call"
    | "flashCall"
    | "missedCall"
    | "fragment";

/**
 * Login code delivery details passed to the `phoneCode` callback.
 */
export interface SentCodeInfo {
    /** How the code was delivered. */
    type: CodeDeliveryType;
    /** The code length. */
    length?: number;
    /** The flash call number pattern. */
    pattern?: string;
    /** The missed call number prefix. */
    prefix?: string;
    /** The Fragment link to open to get the code. */
    url?: string;
    /** The first letters of the SMS word or phrase. */
    beginning?: string;
    /** How the code will be delivered after a resend, absent when it cannot be resent. */
    nextType?: NextCodeDeliveryType;
    /** Seconds to wait before resending the code. */
    timeout?: number;
    /** Resends the code using `nextType` and returns the new delivery details. */
    resend: () => Promise<SentCodeInfo>;
    /** The raw result. */
    raw: Api.auth.SentCode;
}

/**
 * For when you want to login as a {@link Api.User}<br/>
 * this should handle all needed steps for authorization as a user.<br/>
 * to stop the operation at any point just raise and error with the message `AUTH_USER_CANCEL`.
 */
export interface UserAuthParams {
    /** Either a string or a callback that returns a string for the phone to use to login. */
    phoneNumber: string | (() => Promise<string>);
    /** callback that should return the login code that telegram sent.<br/>
     *  has optional bool `isCodeViaApp` param for whether the code was sent through the app (true) or an SMS (false).<br/>
     *  `info` describes how the code was delivered and can request it again with `info.resend()`. */
    phoneCode: (isCodeViaApp?: boolean, info?: SentCodeInfo) => Promise<string>;
    /** optional string or callback that should return the 2FA password if present.<br/>
     *  the password hint will be sent in the hint param */
    password?: (hint?: string) => Promise<string>;
    /** in case of a new account creation this callback should return a first name and last name `[first,last]`.<br/>
     *  signing up fails without it. */
    firstAndLastNames?: () => Promise<[string, string?]>;
    /** called with the terms of service a new account has to accept before signing up.<br/>
     *  returning false cancels the sign up. when omitted the terms are accepted automatically. */
    acceptTermsOfService?: (
        termsOfService: Api.help.TermsOfService
    ) => Promise<boolean>;
    /** a qrCode token for login through qrCode.<br/>
     *  this would need a QR code that you should scan with another app to login with. */
    qrCode?: (qrCode: { token: Buffer; expires: number }) => Promise<void>;
    /** when an error happens during auth this function will be called with the error.<br/>
     *  if this returns true the auth operation will stop. */
    onError: (err: Error) => Promise<boolean> | void;
    /** whether to send the code through SMS or not. */
    forceSMS?: boolean;
    /** optional callback for handling reCAPTCHA. */
    reCaptchaCallback?: (siteKey: string) => Promise<string>;
    /** callback for email verification when Telegram requires email setup or code.<br/>
     *  Called when `auth.SentCodeTypeSetUpEmailRequired` or `auth.SentCodeTypeEmailCode` is received.<br/>
     *  For setup: should return email address to use and then handle verification code.<br/>
     *  For existing email: should return the verification result (code, Google token, or Apple token). */
    emailVerification?: (
        options: EmailVerificationOptions
    ) => Promise<EmailVerificationResult>;
    /** callback to get email address when email setup is required.<br/>
     *  Called first when `auth.SentCodeTypeSetUpEmailRequired` is received. */
    emailAddress?: () => Promise<string>;
}

export interface UserPasswordAuthParams {
    /** optional string or callback that should return the 2FA password if present.<br/>
     *  the password hint will be sent in the hint param */
    password?: (hint?: string) => Promise<string>;
    /** when an error happens during auth this function will be called with the error.<br/>
     *  if this returns true the auth operation will stop. */
    onError: (err: Error) => Promise<boolean> | void;
}

export interface QrCodeAuthParams extends UserPasswordAuthParams {
    /** a qrCode token for login through qrCode.<br/>
     *  this would need a QR code that you should scan with another app to login with. */
    qrCode?: (qrCode: { token: Buffer; expires: number }) => Promise<void>;
    /** when an error happens during auth this function will be called with the error.<br/>
     *  if this returns true the auth operation will stop. */
    onError: (err: Error) => Promise<boolean> | void;
    /** an AbortSignal to cancel the QR login flow (e.g. the user closed the page).<br/>
     *  when aborted, the flow stops polling and rejects with an `AbortError`. */
    abortSignal?: AbortSignal;
}

interface ReturnString {
    (): string;
}

/**
 * For when you want as a normal bot created by https://t.me/Botfather.<br/>
 * Logging in as bot is simple and requires no callbacks
 */
export interface BotAuthParams {
    /**
     * the bot token to use.
     */
    botAuthToken: string | ReturnString;
}

/**
 * Credential needed for the authentication. you can get theses from https://my.telegram.org/auth<br/>
 * Note: This is required for both logging in as a bot and a user.<br/>
 */
export interface ApiCredentials {
    /** The app api id. */
    apiId: number;
    /** the app api hash */
    apiHash: string;
}

const QR_CODE_TIMEOUT = 30000;

// region public methods
/** @hidden */
export async function start(
    client: TelegramClient,
    authParams?: UserAuthParams | BotAuthParams
) {
    if (!client.connected) {
        await client.connect();
    }

    // Probe authorization inline (instead of checkAuthorization) so we can keep
    // the actual error the server returned — e.g. AuthKeyUnregisteredError or
    // SessionRevokedError on a revoked session — rather than discarding it.
    let authError: Error | undefined;
    try {
        await client.api.updates.getState();
        return;
    } catch (e: any) {
        authError = e;
    }

    // Not authorized and no way to (re)login: surface the real reason instead
    // of crashing on `"phoneNumber" in undefined` further down in _authFlow.
    if (
        !authParams ||
        (!("phoneNumber" in authParams) && !("botAuthToken" in authParams))
    ) {
        throw (
            authError ??
            new UnauthorizedError(
                "Not authorized and no auth parameters were provided to log in.",
                undefined as any
            )
        );
    }

    const apiCredentials = {
        apiId: client.apiId,
        apiHash: client.apiHash,
    };

    await _authFlow(client, apiCredentials, authParams);
}

/** @hidden */
export async function checkAuthorization(client: TelegramClient) {
    try {
        await client.api.updates.getState();
        return true;
    } catch (e) {
        return false;
    }
}

/** @hidden */
export async function logOut(client: TelegramClient): Promise<boolean> {
    let success = true;
    try {
        await client.api.auth.logOut();
    } catch (e) {
        client._log.warn("auth.LogOut failed: " + (e as Error).message);
        success = false;
    }
    await client.disconnect();
    await client.session.delete();
    return success;
}

/** @hidden */
export async function signInUser(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    authParams: UserAuthParams
): Promise<Api.TypeUser> {
    try {
        while (1) {
            const request = await requestLoginCode(
                client,
                apiCredentials,
                authParams
            );
            if (request === "qr") {
                return client.signInUserWithQrCode(apiCredentials, authParams);
            }
            if (!request) continue;

            const user = await completeSignIn(
                client,
                authParams,
                request.phoneNumber,
                request.sentCode
            );
            if (user) return user;
        }
    } catch (err: any) {
        if (err.errorMessage === "SESSION_PASSWORD_NEEDED") {
            return client.signInWithPassword(apiCredentials, authParams);
        }
        throw err;
    }
    return undefined!;
}

const RESTART_SIGN_IN_ERRORS = new Set([
    "PHONE_CODE_EXPIRED",
    "PHONE_NUMBER_INVALID",
    "PHONE_NUMBER_BANNED",
]);

const RESTART_SIGN_UP_ERRORS = new Set([
    ...RESTART_SIGN_IN_ERRORS,
    "PHONE_CODE_EMPTY",
    "PHONE_CODE_INVALID",
    "PHONE_NUMBER_OCCUPIED",
]);

async function stepFailed(
    authParams: UserAuthParams,
    err: any,
    restartErrors: Set<string>
): Promise<"retry" | "restart"> {
    if (
        err.errorMessage === "SESSION_PASSWORD_NEEDED" ||
        err.message === "AUTH_USER_CANCEL"
    ) {
        throw err;
    }
    const restart = restartErrors.has(err.errorMessage);
    if (restart && typeof authParams.phoneNumber !== "function") {
        throw err;
    }
    if (await authParams.onError(err)) {
        throw new Error("AUTH_USER_CANCEL");
    }
    return restart ? "restart" : "retry";
}

async function requestLoginCode(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    authParams: UserAuthParams
): Promise<
    | { phoneNumber: string; sentCode: Api.auth.TypeSentCode }
    | "qr"
    | undefined
> {
    try {
        let phoneNumber: string;
        if (typeof authParams.phoneNumber === "function") {
            try {
                phoneNumber = await authParams.phoneNumber();
            } catch (err: any) {
                if (err.errorMessage === "RESTART_AUTH_WITH_QR") return "qr";
                throw err;
            }
        } else {
            phoneNumber = authParams.phoneNumber;
        }

        let sentCode = await requestCode(
            client,
            apiCredentials,
            phoneNumber,
            authParams.reCaptchaCallback
        );
        if (authParams.forceSMS) {
            sentCode = await preferSms(client, phoneNumber, sentCode);
        }
        return { phoneNumber, sentCode };
    } catch (err: any) {
        if (
            err.errorMessage === "SESSION_PASSWORD_NEEDED" ||
            err.message === "AUTH_USER_CANCEL" ||
            typeof authParams.phoneNumber !== "function"
        ) {
            throw err;
        }
        if (await authParams.onError(err)) {
            throw new Error("AUTH_USER_CANCEL");
        }
        return undefined;
    }
}

async function completeSignIn(
    client: TelegramClient,
    authParams: UserAuthParams,
    phoneNumber: string,
    sentCode: Api.auth.TypeSentCode | undefined
): Promise<Api.TypeUser | undefined> {
    while (sentCode) {
        if (sentCode instanceof Api.auth.SentCodeSuccess) {
            return finishAuthorization(
                client,
                authParams,
                phoneNumber,
                "",
                sentCode.authorization
            );
        }
        if (sentCode instanceof Api.auth.SentCodePaymentRequired) {
            throw new Error(
                "Telegram requires a payment to send the login code to this number, which only official apps support"
            );
        }

        const { type, phoneCodeHash } = sentCode;
        if (type instanceof Api.auth.SentCodeTypeSetUpEmailRequired) {
            sentCode = await setUpLoginEmail(
                client,
                authParams,
                phoneNumber,
                phoneCodeHash,
                type
            );
            continue;
        }

        const signedIn =
            type instanceof Api.auth.SentCodeTypeEmailCode
                ? await signInWithEmailCode(
                      client,
                      authParams,
                      phoneNumber,
                      phoneCodeHash,
                      type
                  )
                : await signInWithPhoneCode(
                      client,
                      authParams,
                      phoneNumber,
                      sentCode
                  );
        if (!signedIn) return undefined;

        return finishAuthorization(
            client,
            authParams,
            phoneNumber,
            signedIn.phoneCodeHash,
            signedIn.authorization
        );
    }
    return undefined;
}

async function setUpLoginEmail(
    client: TelegramClient,
    authParams: UserAuthParams,
    phoneNumber: string,
    phoneCodeHash: string,
    type: Api.auth.SentCodeTypeSetUpEmailRequired
): Promise<Api.auth.TypeSentCode | undefined> {
    if (!authParams.emailAddress || !authParams.emailVerification) {
        throw new Error(
            "Telegram requires a login email for this account: pass emailAddress and emailVerification to sign in"
        );
    }

    while (1) {
        let sentEmailCode: SentEmailCodeResult;
        try {
            const email = await authParams.emailAddress();
            sentEmailCode = await sendVerifyEmailCode(
                client,
                phoneNumber,
                phoneCodeHash,
                email
            );
        } catch (err: any) {
            const next = await stepFailed(
                authParams,
                err,
                RESTART_SIGN_IN_ERRORS
            );
            if (next === "restart") {
                return undefined;
            }
            continue;
        }

        while (1) {
            try {
                const verification = await authParams.emailVerification({
                    googleSigninAllowed: type.googleSigninAllowed,
                    appleSigninAllowed: type.appleSigninAllowed,
                    emailPattern: sentEmailCode.emailPattern,
                    codeLength: sentEmailCode.length,
                });
                const { sentCode } = await verifyEmail(
                    client,
                    phoneNumber,
                    phoneCodeHash,
                    verification
                );
                return sentCode;
            } catch (err: any) {
                const next = await stepFailed(
                    authParams,
                    err,
                    RESTART_SIGN_IN_ERRORS
                );
                if (next === "restart") {
                    return undefined;
                }
            }
        }
    }
    return undefined;
}

async function signInWithEmailCode(
    client: TelegramClient,
    authParams: UserAuthParams,
    phoneNumber: string,
    phoneCodeHash: string,
    type: Api.auth.SentCodeTypeEmailCode
): Promise<
    | { phoneCodeHash: string; authorization: Api.auth.TypeAuthorization }
    | undefined
> {
    if (!authParams.emailVerification) {
        throw new Error(
            "Telegram sent the login code to the account email: pass emailVerification to sign in"
        );
    }

    while (1) {
        try {
            const verification = await authParams.emailVerification({
                googleSigninAllowed: type.googleSigninAllowed,
                appleSigninAllowed: type.appleSigninAllowed,
                emailPattern: type.emailPattern,
                codeLength: type.length,
                resetAvailablePeriod: type.resetAvailablePeriod,
                resetPendingDate: type.resetPendingDate,
            });
            const authorization = await client.invoke(
                new Api.auth.SignIn({
                    phoneNumber,
                    phoneCodeHash,
                    emailVerification: toEmailVerification(verification),
                })
            );
            return { phoneCodeHash, authorization };
        } catch (err: any) {
            const next = await stepFailed(
                authParams,
                err,
                RESTART_SIGN_IN_ERRORS
            );
            if (next === "restart") {
                return undefined;
            }
        }
    }
    return undefined;
}

async function signInWithPhoneCode(
    client: TelegramClient,
    authParams: UserAuthParams,
    phoneNumber: string,
    sentCode: Api.auth.SentCode
): Promise<
    | { phoneCodeHash: string; authorization: Api.auth.TypeAuthorization }
    | undefined
> {
    let current = sentCode;
    const resend = async (): Promise<SentCodeInfo> => {
        const next = await resendCode(client, phoneNumber, current);
        if (!(next instanceof Api.auth.SentCode)) {
            throw new Error("Unexpected resend result " + next.className);
        }
        const info = toSentCodeInfo(next, resend);
        current = next;
        return info;
    };

    while (1) {
        try {
            const info = toSentCodeInfo(current, resend);
            let phoneCode: string;
            try {
                phoneCode = await authParams.phoneCode(
                    info.type === "app",
                    info
                );
            } catch (err: any) {
                if (err.errorMessage === "RESTART_AUTH") return undefined;
                throw err;
            }
            if (!phoneCode) {
                throw new Error("Code is empty");
            }

            const authorization = await client.invoke(
                new Api.auth.SignIn({
                    phoneNumber,
                    phoneCodeHash: current.phoneCodeHash,
                    phoneCode,
                })
            );
            return { phoneCodeHash: current.phoneCodeHash, authorization };
        } catch (err: any) {
            const next = await stepFailed(
                authParams,
                err,
                RESTART_SIGN_IN_ERRORS
            );
            if (next === "restart") {
                return undefined;
            }
        }
    }
    return undefined;
}

async function finishAuthorization(
    client: TelegramClient,
    authParams: UserAuthParams,
    phoneNumber: string,
    phoneCodeHash: string,
    authorization: Api.auth.TypeAuthorization
): Promise<Api.TypeUser | undefined> {
    if (authorization instanceof Api.auth.Authorization) {
        return authorization.user;
    }
    if (!authParams.firstAndLastNames) {
        throw new Error(
            "No account is registered with this phone number: pass firstAndLastNames to sign up"
        );
    }

    const { termsOfService } = authorization;
    if (termsOfService && authParams.acceptTermsOfService) {
        if (!(await authParams.acceptTermsOfService(termsOfService))) {
            throw new Error("AUTH_USER_CANCEL");
        }
    }

    while (1) {
        try {
            const [firstName, lastName] = await authParams.firstAndLastNames();
            if (!firstName) {
                throw new Error("First name is required");
            }

            const { user } = (await client.invoke(
                new Api.auth.SignUp({
                    phoneNumber,
                    phoneCodeHash,
                    firstName,
                    lastName: lastName ?? "",
                })
            )) as Api.auth.Authorization;

            if (termsOfService) {
                if (!authParams.acceptTermsOfService) {
                    client._log.warn(
                        "Accepting the Telegram terms of service on behalf of the user: pass acceptTermsOfService to show them"
                    );
                }
                await client.invoke(
                    new Api.help.AcceptTermsOfService({
                        id: termsOfService.id,
                    })
                );
            }

            return user;
        } catch (err: any) {
            const next = await stepFailed(
                authParams,
                err,
                RESTART_SIGN_UP_ERRORS
            );
            if (next === "restart") {
                return undefined;
            }
        }
    }
    return undefined;
}

function qrAbortError(): Error {
    const err = new Error("QR login aborted");
    err.name = "AbortError";
    return err;
}

/** @hidden */
export async function signInUserWithQrCode(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    authParams: QrCodeAuthParams
): Promise<Api.TypeUser> {
    if (authParams.qrCode == undefined) {
        throw new Error("qrCode callback not defined");
    }

    const { abortSignal } = authParams;
    if (abortSignal?.aborted) throw qrAbortError();

    let isScanningComplete = false;
    const stopped = () => isScanningComplete || !!abortSignal?.aborted;

    const inputPromise = (async () => {
        while (!stopped()) {
            const result = await client.invoke(
                new Api.auth.ExportLoginToken({
                    apiId: Number(apiCredentials.apiId),
                    apiHash: apiCredentials.apiHash,
                    exceptIds: [],
                })
            );
            if (!(result instanceof Api.auth.LoginToken)) {
                throw new Error("Unexpected");
            }

            const { token, expires } = result;
            await Promise.race([
                authParams.qrCode!({ token, expires }),
                sleep(QR_CODE_TIMEOUT),
            ]);
            await sleep(QR_CODE_TIMEOUT);
        }
    })();

    const Raw = require("../events/Raw").Raw;
    const rawEvent = new Raw({});
    const onUpdate = (update: Api.TypeUpdate) => {
        if (update instanceof Api.UpdateLoginToken) resolveUpdate();
    };
    let resolveUpdate!: () => void;
    const updatePromise = new Promise<void>((resolve) => (resolveUpdate = resolve));
    client.addEventHandler(onUpdate, rawEvent);

    const abortPromise = new Promise<never>((_, reject) =>
        abortSignal?.addEventListener("abort", () => reject(qrAbortError()), {
            once: true,
        })
    );

    try {
        await Promise.race([updatePromise, inputPromise, abortPromise]);
    } finally {
        isScanningComplete = true;
        client.removeEventHandler(onUpdate, rawEvent);
    }

    try {
        const result2 = await client.invoke(
            new Api.auth.ExportLoginToken({
                apiId: Number(apiCredentials.apiId),
                apiHash: apiCredentials.apiHash,
                exceptIds: [],
            })
        );
        if (
            result2 instanceof Api.auth.LoginTokenSuccess &&
            result2.authorization instanceof Api.auth.Authorization
        ) {
            return result2.authorization.user;
        } else if (result2 instanceof Api.auth.LoginTokenMigrateTo) {
            await client._switchDC(result2.dcId);
            const migratedResult = await client.invoke(
                new Api.auth.ImportLoginToken({
                    token: result2.token,
                })
            );

            if (
                migratedResult instanceof Api.auth.LoginTokenSuccess &&
                migratedResult.authorization instanceof Api.auth.Authorization
            ) {
                return migratedResult.authorization.user;
            } else {
                client._log.error(
                    `Received unknown result while scanning QR ${result2.className}`
                );
                throw new Error(
                    `Received unknown result while scanning QR ${result2.className}`
                );
            }
        } else {
            client._log.error(
                `Received unknown result while scanning QR ${result2.className}`
            );
            throw new Error(
                `Received unknown result while scanning QR ${result2.className}`
            );
        }
    } catch (err: any) {
        if (err.errorMessage === "SESSION_PASSWORD_NEEDED") {
            return client.signInWithPassword(apiCredentials, authParams);
        }
        throw err;
    }

    await authParams.onError(new Error("QR auth failed"));
    throw new Error("QR auth failed");
}

/**
 * Result from sendCode containing info about how to proceed with verification.
 */
export interface SendCodeResult {
    /** The phone code hash needed for sign in. */
    phoneCodeHash: string;
    /** Whether the code was sent via Telegram app (true) or SMS (false). */
    isCodeViaApp: boolean;
    /** If true, email setup is required before phone code. */
    emailRequired?: boolean;
    /** If true, code was sent to existing email. */
    emailCodeSent?: boolean;
    /** Email verification options when email is involved. */
    emailOptions?: EmailVerificationOptions;
}

/** @hidden */
export async function sendCode(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    phoneNumber: string,
    forceSMS = false,
    reCaptchaCallback?: (siteKey: string) => Promise<string>
): Promise<SendCodeResult> {
    let sentCode = await requestCode(
        client,
        apiCredentials,
        phoneNumber,
        reCaptchaCallback
    );
    if (forceSMS) {
        try {
            sentCode = await preferSms(client, phoneNumber, sentCode);
        } catch (err: any) {
            if (err.errorMessage !== "AUTH_RESTART") throw err;
            return sendCode(
                client,
                apiCredentials,
                phoneNumber,
                forceSMS,
                reCaptchaCallback
            );
        }
    }

    if (sentCode instanceof Api.auth.SentCodeSuccess) {
        throw new Error("logged in right after sending the code");
    }
    if (!(sentCode instanceof Api.auth.SentCode)) {
        return {
            phoneCodeHash: sentCode.phoneCodeHash,
            isCodeViaApp: false,
        };
    }

    const { type, phoneCodeHash } = sentCode;
    if (type instanceof Api.auth.SentCodeTypeSetUpEmailRequired) {
        return {
            phoneCodeHash,
            isCodeViaApp: false,
            emailRequired: true,
            emailOptions: {
                googleSigninAllowed: type.googleSigninAllowed,
                appleSigninAllowed: type.appleSigninAllowed,
            },
        };
    }
    if (type instanceof Api.auth.SentCodeTypeEmailCode) {
        return {
            phoneCodeHash,
            isCodeViaApp: false,
            emailCodeSent: true,
            emailOptions: {
                googleSigninAllowed: type.googleSigninAllowed,
                appleSigninAllowed: type.appleSigninAllowed,
                emailPattern: type.emailPattern,
                codeLength: type.length,
                resetAvailablePeriod: type.resetAvailablePeriod,
                resetPendingDate: type.resetPendingDate,
            },
        };
    }
    return {
        phoneCodeHash,
        isCodeViaApp: type instanceof Api.auth.SentCodeTypeApp,
    };
}

async function requestCode(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    phoneNumber: string,
    reCaptchaCallback?: (siteKey: string) => Promise<string>
): Promise<Api.auth.TypeSentCode> {
    const { apiId, apiHash } = apiCredentials;
    const request = new Api.auth.SendCode({
        phoneNumber,
        apiId,
        apiHash,
        settings: new Api.CodeSettings({}),
    });

    try {
        return await client.invoke(request);
    } catch (err: any) {
        const match = err.errorMessage?.match(
            /RECAPTCHA_CHECK_.*(6Le[-\w]+)/
        );
        if (match && reCaptchaCallback) {
            const token = await reCaptchaCallback(match[1]);
            return client.invoke(
                new Api.InvokeWithReCaptcha({ token, query: request })
            ) as Promise<Api.auth.TypeSentCode>;
        }
        if (err.errorMessage === "AUTH_RESTART") {
            return requestCode(
                client,
                apiCredentials,
                phoneNumber,
                reCaptchaCallback
            );
        }
        throw err;
    }
}

async function resendCode(
    client: TelegramClient,
    phoneNumber: string,
    sentCode: Api.auth.SentCode
): Promise<Api.auth.TypeSentCode> {
    if (!sentCode.nextType) {
        throw new Error("The login code cannot be resent");
    }
    return client.invoke(
        new Api.auth.ResendCode({
            phoneNumber,
            phoneCodeHash: sentCode.phoneCodeHash,
        })
    );
}

async function preferSms(
    client: TelegramClient,
    phoneNumber: string,
    sentCode: Api.auth.TypeSentCode
): Promise<Api.auth.TypeSentCode> {
    if (
        !(sentCode instanceof Api.auth.SentCode) ||
        sentCode.type instanceof Api.auth.SentCodeTypeSms
    ) {
        return sentCode;
    }
    if (!(sentCode.nextType instanceof Api.auth.CodeTypeSms)) {
        client._log.warn(
            "forceSMS ignored: Telegram does not offer SMS as the next delivery method for this code"
        );
        return sentCode;
    }
    return resendCode(client, phoneNumber, sentCode);
}

function toSentCodeInfo(
    sentCode: Api.auth.SentCode,
    resend: () => Promise<SentCodeInfo>
): SentCodeInfo {
    const { type, nextType, timeout } = sentCode;
    return {
        ...toCodeDelivery(type),
        nextType: nextType && toNextCodeDelivery(nextType),
        timeout,
        resend,
        raw: sentCode,
    };
}

function toCodeDelivery(
    type: Api.auth.TypeSentCodeType
): Omit<SentCodeInfo, "nextType" | "timeout" | "resend" | "raw"> {
    if (type instanceof Api.auth.SentCodeTypeApp) {
        return { type: "app", length: type.length };
    }
    if (
        type instanceof Api.auth.SentCodeTypeSms ||
        type instanceof Api.auth.SentCodeTypeFirebaseSms
    ) {
        return { type: "sms", length: type.length };
    }
    if (type instanceof Api.auth.SentCodeTypeCall) {
        return { type: "call", length: type.length };
    }
    if (type instanceof Api.auth.SentCodeTypeFlashCall) {
        return { type: "flashCall", pattern: type.pattern };
    }
    if (type instanceof Api.auth.SentCodeTypeMissedCall) {
        return {
            type: "missedCall",
            prefix: type.prefix,
            length: type.length,
        };
    }
    if (type instanceof Api.auth.SentCodeTypeFragmentSms) {
        return { type: "fragment", url: type.url, length: type.length };
    }
    if (type instanceof Api.auth.SentCodeTypeSmsWord) {
        return { type: "smsWord", beginning: type.beginning };
    }
    if (type instanceof Api.auth.SentCodeTypeSmsPhrase) {
        return { type: "smsPhrase", beginning: type.beginning };
    }
    throw new Error("Unexpected code delivery type " + type.className);
}

function toNextCodeDelivery(
    nextType: Api.auth.TypeCodeType
): NextCodeDeliveryType {
    if (nextType instanceof Api.auth.CodeTypeSms) return "sms";
    if (nextType instanceof Api.auth.CodeTypeCall) return "call";
    if (nextType instanceof Api.auth.CodeTypeFlashCall) return "flashCall";
    if (nextType instanceof Api.auth.CodeTypeMissedCall) return "missedCall";
    return "fragment";
}

function toEmailVerification(
    verification: EmailVerificationResult
): Api.TypeEmailVerification {
    switch (verification.type) {
        case "code":
            return new Api.EmailVerificationCode({ code: verification.code });
        case "google":
            return new Api.EmailVerificationGoogle({
                token: verification.token,
            });
        case "apple":
            return new Api.EmailVerificationApple({
                token: verification.token,
            });
    }
}

/** @hidden */
export async function signInWithPassword(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    authParams: UserPasswordAuthParams
): Promise<Api.TypeUser> {
    let emptyPassword = false;
    while (1) {
        try {
            const passwordSrpResult = await client.invoke(
                new Api.account.GetPassword()
            );
            if (!authParams.password) {
                emptyPassword = true;
                break;
            }

            const password = await authParams.password(passwordSrpResult.hint);
            if (!password) {
                throw new Error("Password is empty");
            }

            const passwordSrpCheck = await computePasswordSrpCheck(
                passwordSrpResult,
                password
            );
            const { user } = (await client.invoke(
                new Api.auth.CheckPassword({
                    password: passwordSrpCheck,
                })
            )) as Api.auth.Authorization;

            return user;
        } catch (err: any) {
            const shouldWeStop = await authParams.onError(err);
            if (shouldWeStop) {
                throw new Error("AUTH_USER_CANCEL");
            }
        }
    }
    if (emptyPassword) {
        throw new Error("Account has 2FA enabled.");
    }
    return undefined!; // Never reached (TypeScript fix)
}

/** @hidden */
export async function signInBot(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    authParams: BotAuthParams
) {
    const { apiId, apiHash } = apiCredentials;
    let { botAuthToken } = authParams;
    if (!botAuthToken) {
        throw new Error("a valid BotToken is required");
    }
    if (typeof botAuthToken === "function") {
        let token;
        while (true) {
            token = await botAuthToken();
            if (token) {
                botAuthToken = token;
                break;
            }
        }
    }

    const { user } = (await client.invoke(
        new Api.auth.ImportBotAuthorization({
            apiId,
            apiHash,
            botAuthToken,
        })
    )) as Api.auth.Authorization;
    return user;
}

/**
 * Signs in with a web authorization token
 * (`auth.importWebTokenAuthorization`).
 *
 * Users only — bots cannot invoke this. It may be used over an
 * unauthenticated connection, so a plain {@link TelegramClient.connect} is
 * enough beforehand. The token is short-lived: once expired — or already
 * redeemed elsewhere, e.g. by the browser that opened the login URL — the
 * server answers `WEBAUTH_TOKEN_EXPIRED`.
 * @hidden
 */
export async function signInWithWebToken(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    webAuthToken: string
): Promise<Api.User> {
    const { apiId, apiHash } = apiCredentials;
    const result = await client.invoke(
        new Api.auth.ImportWebTokenAuthorization({
            apiId,
            apiHash,
            webAuthToken,
        })
    );
    if (result instanceof Api.auth.AuthorizationSignUpRequired) {
        throw new Error(
            "The account bound to this web token does not exist yet; sign up is required"
        );
    }
    const user = result.user as Api.User;
    client._bot = user.bot;
    client._selfInputPeer = utils.getInputPeer(
        user,
        false
    ) as Api.InputPeerUser;
    client._log.info(
        "Signed in successfully as " + utils.getDisplayName(user)
    );
    return user;
}

/** @hidden */
export async function _authFlow(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    authParams: UserAuthParams | BotAuthParams
) {
    const me =
        "phoneNumber" in authParams
            ? await client.signInUser(apiCredentials, authParams)
            : await client.signInBot(apiCredentials, authParams);

    client._log.info("Signed in successfully as " + utils.getDisplayName(me));
}

/**
 * Result from sendVerifyEmailCode.
 */
export interface SentEmailCodeResult {
    /** The masked email pattern where the code was sent. */
    emailPattern: string;
    /** The length of the verification code. */
    length: number;
}

/**
 * Sends an email verification code for login setup.
 * @param client - The telegram client
 * @param phoneNumber - The phone number being used for login
 * @param phoneCodeHash - The phone code hash from sendCode
 * @param email - The email address to verify
 * @returns The email pattern and code length
 */
/** @hidden */
export async function sendVerifyEmailCode(
    client: TelegramClient,
    phoneNumber: string,
    phoneCodeHash: string,
    email: string
): Promise<SentEmailCodeResult> {
    const result = await client.invoke(
        new Api.account.SendVerifyEmailCode({
            purpose: new Api.EmailVerifyPurposeLoginSetup({
                phoneNumber,
                phoneCodeHash,
            }),
            email,
        })
    );

    return {
        emailPattern: result.emailPattern,
        length: result.length,
    };
}

/**
 * Result from verifyEmail for login.
 */
export interface EmailVerifiedLoginResult {
    /** The verified email address. */
    email: string;
    /** The new sent code result to continue with phone verification. */
    sentCode: Api.auth.TypeSentCode;
}

/**
 * Verifies an email address during login setup.
 * @param client - The telegram client
 * @param phoneNumber - The phone number being used for login
 * @param phoneCodeHash - The phone code hash from sendCode
 * @param verification - The verification (code, Google token, or Apple token)
 * @returns The verified email and the new sent code for phone verification
 */
/** @hidden */
export async function verifyEmail(
    client: TelegramClient,
    phoneNumber: string,
    phoneCodeHash: string,
    verification: EmailVerificationResult
): Promise<EmailVerifiedLoginResult> {
    const result = await client.invoke(
        new Api.account.VerifyEmail({
            purpose: new Api.EmailVerifyPurposeLoginSetup({
                phoneNumber,
                phoneCodeHash,
            }),
            verification: toEmailVerification(verification),
        })
    );

    if (!(result instanceof Api.account.EmailVerifiedLogin)) {
        throw new Error(
            "Expected EmailVerifiedLogin but got " + result.className
        );
    }

    return {
        email: result.email,
        sentCode: result.sentCode,
    };
}

/**
 * Resets the login email when the user cannot access their current email.
 * This will cancel the current email verification and allow setting up a new one.
 * @param client - The telegram client
 * @param phoneNumber - The phone number being used for login
 * @param phoneCodeHash - The phone code hash from sendCode
 * @returns The new sent code result
 */
/** @hidden */
export async function resetLoginEmail(
    client: TelegramClient,
    phoneNumber: string,
    phoneCodeHash: string
): Promise<Api.auth.TypeSentCode> {
    return await client.invoke(
        new Api.auth.ResetLoginEmail({
            phoneNumber,
            phoneCodeHash,
        })
    );
}
