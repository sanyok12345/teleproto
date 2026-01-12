import { Api } from "../tl";
import * as utils from "../Utils";
import { sleep } from "../Helpers";
import { computeCheck as computePasswordSrpCheck } from "../Password";
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
 * For when you want to login as a {@link Api.User}<br/>
 * this should handle all needed steps for authorization as a user.<br/>
 * to stop the operation at any point just raise and error with the message `AUTH_USER_CANCEL`.
 */
export interface UserAuthParams {
    /** Either a string or a callback that returns a string for the phone to use to login. */
    phoneNumber: string | (() => Promise<string>);
    /** callback that should return the login code that telegram sent.<br/>
     *  has optional bool `isCodeViaApp` param for whether the code was sent through the app (true) or an SMS (false). */
    phoneCode: (isCodeViaApp?: boolean) => Promise<string>;
    /** optional string or callback that should return the 2FA password if present.<br/>
     *  the password hint will be sent in the hint param */
    password?: (hint?: string) => Promise<string>;
    /** in case of a new account creation this callback should return a first name and last name `[first,last]`. */
    firstAndLastNames?: () => Promise<[string, string?]>;
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
    authParams: UserAuthParams | BotAuthParams
) {
    if (!client.connected) {
        await client.connect();
    }

    if (await client.checkAuthorization()) {
        return;
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
        await client.invoke(new Api.updates.GetState());
        return true;
    } catch (e) {
        return false;
    }
}

/** @hidden */
export async function signInUser(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    authParams: UserAuthParams
): Promise<Api.TypeUser> {
    let phoneNumber: string = "";
    let phoneCodeHash: string = "";
    let isCodeViaApp = false;

    while (1) {
        try {
            if (typeof authParams.phoneNumber === "function") {
                try {
                    phoneNumber = await authParams.phoneNumber();
                } catch (err: any) {
                    if (err.errorMessage === "RESTART_AUTH_WITH_QR") {
                        return client.signInUserWithQrCode(
                            apiCredentials,
                            authParams
                        );
                    }

                    throw err;
                }
            } else {
                phoneNumber = authParams.phoneNumber;
            }
            const sendCodeResult = await client.sendCode(
                apiCredentials,
                phoneNumber,
                authParams.forceSMS,
                authParams.reCaptchaCallback
            );
            phoneCodeHash = sendCodeResult.phoneCodeHash;
            isCodeViaApp = sendCodeResult.isCodeViaApp;

            if (typeof phoneCodeHash !== "string") {
                throw new Error("Failed to retrieve phone code hash");
            }

            // Handle email verification if required
            if (sendCodeResult.emailRequired) {
                // Email setup is required before phone code
                if (!authParams.emailAddress || !authParams.emailVerification) {
                    throw new Error(
                        "Email verification required but emailAddress or emailVerification callback not provided"
                    );
                }

                // Get email address from user
                const email = await authParams.emailAddress();

                // Send verification code to email
                const emailCodeResult = await sendVerifyEmailCode(
                    client,
                    phoneNumber,
                    phoneCodeHash,
                    email
                );

                // Get verification from user
                const verification = await authParams.emailVerification({
                    ...sendCodeResult.emailOptions,
                    emailPattern: emailCodeResult.emailPattern,
                    codeLength: emailCodeResult.length,
                });

                // Verify email
                const verifyResult = await verifyEmail(
                    client,
                    phoneNumber,
                    phoneCodeHash,
                    verification
                );

                // Update phone code hash from the new sent code
                if (verifyResult.sentCode instanceof Api.auth.SentCode) {
                    phoneCodeHash = verifyResult.sentCode.phoneCodeHash;
                    isCodeViaApp =
                        verifyResult.sentCode.type instanceof
                        Api.auth.SentCodeTypeApp;
                }
            } else if (sendCodeResult.emailCodeSent) {
                // Code was sent to existing email
                if (!authParams.emailVerification) {
                    throw new Error(
                        "Email code sent but emailVerification callback not provided"
                    );
                }

                // Get verification from user for existing email
                const verification = await authParams.emailVerification(
                    sendCodeResult.emailOptions || {}
                );

                // Verify with existing email
                const verifyResult = await verifyEmail(
                    client,
                    phoneNumber,
                    phoneCodeHash,
                    verification
                );

                // Update phone code hash from the new sent code
                if (verifyResult.sentCode instanceof Api.auth.SentCode) {
                    phoneCodeHash = verifyResult.sentCode.phoneCodeHash;
                    isCodeViaApp =
                        verifyResult.sentCode.type instanceof
                        Api.auth.SentCodeTypeApp;
                }
            }

            break;
        } catch (err: any) {
            if (typeof authParams.phoneNumber !== "function") {
                throw err;
            }

            const shouldWeStop = await authParams.onError(err);
            if (shouldWeStop) {
                throw new Error("AUTH_USER_CANCEL");
            }
        }
    }

    let phoneCode;
    let isRegistrationRequired = false;
    let termsOfService;

    while (1) {
        try {
            try {
                phoneCode = await authParams.phoneCode(isCodeViaApp);
            } catch (err: any) {
                // This is the support for changing phone number from the phone code screen.
                if (err.errorMessage === "RESTART_AUTH") {
                    return client.signInUser(apiCredentials, authParams);
                }
            }

            if (!phoneCode) {
                throw new Error("Code is empty");
            }

            // May raise PhoneCodeEmptyError, PhoneCodeExpiredError,
            // PhoneCodeHashEmptyError or PhoneCodeInvalidError.
            const result = await client.invoke(
                new Api.auth.SignIn({
                    phoneNumber,
                    phoneCodeHash,
                    phoneCode,
                })
            );

            if (result instanceof Api.auth.AuthorizationSignUpRequired) {
                isRegistrationRequired = true;
                termsOfService = result.termsOfService;
                break;
            }

            return result.user;
        } catch (err: any) {
            if (err.errorMessage === "SESSION_PASSWORD_NEEDED") {
                return client.signInWithPassword(apiCredentials, authParams);
            } else {
                const shouldWeStop = await authParams.onError(err);
                if (shouldWeStop) {
                    throw new Error("AUTH_USER_CANCEL");
                }
            }
        }
    }

    if (isRegistrationRequired) {
        while (1) {
            try {
                let lastName;
                let firstName = "first name";
                if (authParams.firstAndLastNames) {
                    const result = await authParams.firstAndLastNames();
                    firstName = result[0];
                    lastName = result[1];
                }
                if (!firstName) {
                    throw new Error("First name is required");
                }

                const { user } = (await client.invoke(
                    new Api.auth.SignUp({
                        phoneNumber,
                        phoneCodeHash,
                        firstName,
                        lastName,
                    })
                )) as Api.auth.Authorization;

                if (termsOfService) {
                    // This is a violation of Telegram rules: the user should be presented with and accept TOS.
                    await client.invoke(
                        new Api.help.AcceptTermsOfService({
                            id: termsOfService.id,
                        })
                    );
                }

                return user;
            } catch (err: any) {
                const shouldWeStop = await authParams.onError(err);
                if (shouldWeStop) {
                    throw new Error("AUTH_USER_CANCEL");
                }
            }
        }
    }

    await authParams.onError(new Error("Auth failed"));
    return client.signInUser(apiCredentials, authParams);
}

/** @hidden */
export async function signInUserWithQrCode(
    client: TelegramClient,
    apiCredentials: ApiCredentials,
    authParams: QrCodeAuthParams
): Promise<Api.TypeUser> {
    let isScanningComplete = false;

    if (authParams.qrCode == undefined) {
        throw new Error("qrCode callback not defined");
    }
    const inputPromise = (async () => {
        while (1) {
            if (isScanningComplete) {
                break;
            }

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

    const updatePromise = new Promise((resolve) => {
        client.addEventHandler((update: Api.TypeUpdate) => {
            if (update instanceof Api.UpdateLoginToken) {
                resolve(undefined);
            }
        });
    });

    try {
        await Promise.race([updatePromise, inputPromise]);
    } catch (err) {
        throw err;
    } finally {
        isScanningComplete = true;
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
    try {
        const { apiId, apiHash } = apiCredentials;
        const request = new Api.auth.SendCode({
            phoneNumber,
            apiId,
            apiHash,
            settings: new Api.CodeSettings({}),
        });

        let sendResult: any;

        try {
            sendResult = await client.invoke(request);
        } catch (err: any) {
            const match = err.errorMessage?.match(/RECAPTCHA_CHECK_.*(6Le[-\w]+)/);
            if (match && reCaptchaCallback) {
                const siteKey = match[1];
                const token = await reCaptchaCallback(siteKey);
                sendResult = await client.invoke(
                    new Api.InvokeWithReCaptcha({
                        token: token,
                        query: request,
                    })
                );
            } else {
                throw err;
            }
        }

        if (sendResult instanceof Api.auth.SentCodeSuccess)
            throw new Error("logged in right after sending the code");

        if (!(sendResult instanceof Api.auth.SentCode)) {
            return {
                phoneCodeHash: sendResult.phoneCodeHash,
                isCodeViaApp: false,
            };
        }

        // Handle email verification types
        if (
            sendResult.type instanceof Api.auth.SentCodeTypeSetUpEmailRequired
        ) {
            return {
                phoneCodeHash: sendResult.phoneCodeHash,
                isCodeViaApp: false,
                emailRequired: true,
                emailOptions: {
                    googleSigninAllowed: sendResult.type.googleSigninAllowed,
                    appleSigninAllowed: sendResult.type.appleSigninAllowed,
                },
            };
        }

        if (sendResult.type instanceof Api.auth.SentCodeTypeEmailCode) {
            return {
                phoneCodeHash: sendResult.phoneCodeHash,
                isCodeViaApp: false,
                emailCodeSent: true,
                emailOptions: {
                    googleSigninAllowed: sendResult.type.googleSigninAllowed,
                    appleSigninAllowed: sendResult.type.appleSigninAllowed,
                    emailPattern: sendResult.type.emailPattern,
                    codeLength: sendResult.type.length,
                    resetAvailablePeriod: sendResult.type.resetAvailablePeriod,
                    resetPendingDate: sendResult.type.resetPendingDate,
                },
            };
        }

        // If we already sent a SMS, do not resend the phoneCode (hash may be empty)
        if (!forceSMS || sendResult.type instanceof Api.auth.SentCodeTypeSms) {
            return {
                phoneCodeHash: sendResult.phoneCodeHash,
                isCodeViaApp: sendResult.type instanceof Api.auth.SentCodeTypeApp,
            };
        }

        const resendResult = await client.invoke(
            new Api.auth.ResendCode({
                phoneNumber,
                phoneCodeHash: sendResult.phoneCodeHash,
            })
        );
        if (resendResult instanceof Api.auth.SentCodeSuccess)
            throw new Error("logged in right after resending the code");

        if (!(resendResult instanceof Api.auth.SentCode)) {
            return {
                phoneCodeHash: resendResult.phoneCodeHash,
                isCodeViaApp: false,
            };
        }

        // Handle email types in resend result as well
        if (
            resendResult.type instanceof Api.auth.SentCodeTypeSetUpEmailRequired
        ) {
            return {
                phoneCodeHash: resendResult.phoneCodeHash,
                isCodeViaApp: false,
                emailRequired: true,
                emailOptions: {
                    googleSigninAllowed: resendResult.type.googleSigninAllowed,
                    appleSigninAllowed: resendResult.type.appleSigninAllowed,
                },
            };
        }

        if (resendResult.type instanceof Api.auth.SentCodeTypeEmailCode) {
            return {
                phoneCodeHash: resendResult.phoneCodeHash,
                isCodeViaApp: false,
                emailCodeSent: true,
                emailOptions: {
                    googleSigninAllowed: resendResult.type.googleSigninAllowed,
                    appleSigninAllowed: resendResult.type.appleSigninAllowed,
                    emailPattern: resendResult.type.emailPattern,
                    codeLength: resendResult.type.length,
                    resetAvailablePeriod: resendResult.type.resetAvailablePeriod,
                    resetPendingDate: resendResult.type.resetPendingDate,
                },
            };
        }

        return {
            phoneCodeHash: resendResult.phoneCodeHash,
            isCodeViaApp: resendResult.type instanceof Api.auth.SentCodeTypeApp,
        };
    } catch (err: any) {
        if (err.errorMessage === "AUTH_RESTART") {
            return sendCode(
                client,
                apiCredentials,
                phoneNumber,
                forceSMS,
                reCaptchaCallback
            );
        } else {
            throw err;
        }
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
    let emailVerification: Api.TypeEmailVerification;

    switch (verification.type) {
        case "code":
            emailVerification = new Api.EmailVerificationCode({
                code: verification.code,
            });
            break;
        case "google":
            emailVerification = new Api.EmailVerificationGoogle({
                token: verification.token,
            });
            break;
        case "apple":
            emailVerification = new Api.EmailVerificationApple({
                token: verification.token,
            });
            break;
    }

    const result = await client.invoke(
        new Api.account.VerifyEmail({
            purpose: new Api.EmailVerifyPurposeLoginSetup({
                phoneNumber,
                phoneCodeHash,
            }),
            verification: emailVerification,
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
