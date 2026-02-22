import { NewMessage, NewMessageEvent } from "../teleproto/events";
import { createStartedClient, waitForStopSignal } from "./helpers";

async function main() {
    const { client, closePrompt } = await createStartedClient("messages_session");

    client.addEventHandler(
        async (event: NewMessageEvent) => {
            const message = event.message;
            const text = message.message || "";
            const sender = message.senderId ? message.senderId.toString() : "unknown";

            console.log(`[msg ${message.id}] from=${sender} text=${JSON.stringify(text)}`);

            if (/^ping$/i.test(text.trim())) {
                await message.reply({ message: "pong" });
            }
        },
        new NewMessage({ pattern: /(?:hello|hi|ping)/i })
    );

    console.log("Listening for new messages matching hello|hi|ping. Press Ctrl+C to stop.");

    await waitForStopSignal();
    closePrompt();
    await client.disconnect();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
