import { TelegramClient } from "../teleproto";
import { StoreSession, StringSession } from "../teleproto/sessions";
import { createInterface } from "readline";

type Ask = (prompt: string, secret?: boolean) => Promise<string>;

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

function createAsker(): { ask: Ask; close: () => void } {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const ask: Ask = async (prompt: string, secret = false) =>
        await new Promise<string>((resolve) => {
            if (secret) {
                (rl as any).stdoutMuted = true;
                const original = (rl as any)._writeToOutput;
                (rl as any)._writeToOutput = (text: string) => {
                    if ((rl as any).stdoutMuted) {
                        process.stdout.write("*");
                    } else {
                        process.stdout.write(text);
                    }
                };

                rl.question(prompt, (answer) => {
                    (rl as any).stdoutMuted = false;
                    (rl as any)._writeToOutput = original;
                    process.stdout.write("\n");
                    resolve(answer.trim());
                });
                return;
            }

            rl.question(prompt, (answer) => resolve(answer.trim()));
        });

    return {
        ask,
        close: () => rl.close(),
    };
}

export async function createStartedClient(defaultSessionName: string) {
    const apiId = Number(requireEnv("TG_API_ID"));
    const apiHash = requireEnv("TG_API_HASH");

    if (!Number.isInteger(apiId)) {
        throw new Error("TG_API_ID must be a number");
    }

    const stringSessionValue = process.env.TG_STRING_SESSION;
    const session = stringSessionValue
        ? new StringSession(stringSessionValue)
        : new StoreSession(process.env.TG_SESSION || defaultSessionName);

    const { ask, close } = createAsker();
    const client = new TelegramClient(session, apiId, apiHash, {
        connectionRetries: 5,
    });

    await client.start({
        phoneNumber: async () => ask("Phone number: "),
        password: async () => ask("2FA password (if enabled): ", true),
        phoneCode: async () => ask("Telegram login code: "),
        onError: (err) => console.error("Auth error:", err),
    });

    if (!stringSessionValue) {
        console.log("Session folder:", process.env.TG_SESSION || defaultSessionName);
    } else {
        console.log("Session string:\n", client.session.save());
    }

    return {
        client,
        ask,
        closePrompt: close,
    };
}

export function waitForStopSignal() {
    return new Promise<void>((resolve) => {
        const done = () => {
            process.off("SIGINT", done);
            process.off("SIGTERM", done);
            resolve();
        };

        process.on("SIGINT", done);
        process.on("SIGTERM", done);
    });
}
