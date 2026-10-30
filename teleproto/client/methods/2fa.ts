import { generateRandomBytes } from "../../Helpers";
import { computeCheck, computeDigest } from "../../Password";
import type { TelegramClient } from "../TelegramClient";
import { Api } from "../../tl";
import * as errors from "../../errors";
import { Buffer } from "../../platform";

export interface TwoFaParams {
    /** Only verify `currentPassword`, change nothing. */
    isCheckPassword?: boolean;
    /** Current password. Required while 2FA is on; passed alone, removes 2FA. */
    currentPassword?: string;
    /** New password. Empty removes 2FA. */
    newPassword?: string;
    /** Hint shown when Telegram asks for the password. */
    hint?: string;
    /** Recovery email. Requires `emailCodeCallback` and `onEmailCodeError`. */
    email?: string;
    /** Gets the code length, returns the code sent to `email`. Called again until the code is accepted. */
    emailCodeCallback?: (length: number) => Promise<string>;
    /** Called when a code from `emailCodeCallback` is rejected. */
    onEmailCodeError?: (err: Error) => void;
}

/**
 * Changes the 2FA settings of the logged in user. May be slow: SRP math over large primes.
 * Throws if both `currentPassword` and `newPassword` are missing.
 * @param client - The telegram client instance
 * @param params - see {@link TwoFaParams}
 * @throws `PASSWORD_HASH_INVALID` on a wrong password, `EMAIL_INVALID` on a bad email, `EMAIL_HASH_EXPIRED` if the email was not confirmed in time.
 */
export async function updateTwoFaSettings(
    client: TelegramClient,
    {
        isCheckPassword,
        currentPassword,
        newPassword,
        hint = "",
        email,
        emailCodeCallback,
        onEmailCodeError,
    }: TwoFaParams
) {
    if (!newPassword && !currentPassword) {
        throw new Error(
            "Neither `currentPassword` nor `newPassword` is present"
        );
    }

    if (email && !(emailCodeCallback && onEmailCodeError)) {
        throw new Error(
            "`email` present without `emailCodeCallback` and `onEmailCodeError`"
        );
    }

    const pwd = await client.api.account.getPassword();

    if (!(pwd.newAlgo instanceof Api.PasswordKdfAlgoUnknown)) {
        pwd.newAlgo.salt1 = Buffer.concat([
            pwd.newAlgo.salt1,
            generateRandomBytes(32),
        ]);
    }
    if (!pwd.hasPassword && currentPassword) {
        currentPassword = undefined;
    }

    const password = currentPassword
        ? await computeCheck(pwd, currentPassword!)
        : new Api.InputCheckPasswordEmpty();

    if (isCheckPassword) {
        await client.invoke(new Api.auth.CheckPassword({ password }));
        return;
    }
    if (pwd.newAlgo instanceof Api.PasswordKdfAlgoUnknown) {
        throw new Error("Unknown password encryption method");
    }
    try {
        await client.invoke(
            new Api.account.UpdatePasswordSettings({
                password,
                newSettings: new Api.account.PasswordInputSettings({
                    newAlgo: pwd.newAlgo,
                    newPasswordHash: newPassword
                        ? await computeDigest(pwd.newAlgo, newPassword)
                        : Buffer.alloc(0),
                    hint,
                    email,
                    // not explained what it does and it seems to always be set to empty in tdesktop
                    newSecureSettings: undefined,
                }),
            })
        );
    } catch (e) {
        if (e instanceof errors.EmailUnconfirmedError) {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                try {
                    const code = await emailCodeCallback!(e.codeLength);

                    if (!code) {
                        throw new Error("Code is empty");
                    }

                    await client.api.account.confirmPasswordEmail({ code });
                    break;
                } catch (err: any) {
                    onEmailCodeError!(err);
                }
            }
        } else {
            throw e;
        }
    }
}
