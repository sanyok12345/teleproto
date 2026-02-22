import { NewMessage, NewMessageEvent } from "../teleproto/events";
import { createStartedClient, waitForStopSignal } from "./helpers";

const rules: Array<{ regex: RegExp; reply: string }> = [
    { regex: /\bhello\b|\bhi\b/i, reply: "Hey! 👋" },
    { regex: /\bhelp\b/i, reply: "Try: /about, /time, /echo your text" },
    { regex: /^\/about$/i, reply: "I am a tiny teleproto replier example." },
];

function resolveReply(rule: { reply: string }, text: string): string {
    if (text.startsWith("/echo ")) {
        return text.slice("/echo ".length).trim() || "(empty)";
    }
    return rule.reply;
}

async function main() {
    const { client, closePrompt } = await createStartedClient("replier_session");

    client.addEventHandler(
        async (event: NewMessageEvent) => {
            if (event.message.out) {
                return;
            }

            const text = (event.message.message || "").trim();
            if (!text) {
                return;
            }

            for (const rule of rules) {
                if (rule.regex.test(text)) {
                    const replyText = resolveReply(rule, text);
                    await event.message.reply({ message: replyText });
                    return;
                }
            }

            if (/^\/time$/i.test(text)) {
                await event.message.reply({ message: new Date().toISOString() });
                return;
            }

            if (/^\/echo\s+/i.test(text)) {
                await event.message.reply({
                    message: text.slice(text.indexOf(" ") + 1).trim() || "(empty)",
                });
            }
        },
        new NewMessage({})
    );

    console.log("Auto replier is running. Press Ctrl+C to stop.");

    await waitForStopSignal();
    closePrompt();
    await client.disconnect();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
