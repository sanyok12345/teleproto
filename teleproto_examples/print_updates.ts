import { Raw } from "../teleproto/events";
import { createStartedClient, waitForStopSignal } from "./helpers";

async function main() {
    const { client, closePrompt } = await createStartedClient("updates_session");

    client.addEventHandler(
        async (update: any) => {
            const kind = update?.className || update?.constructor?.name || "UnknownUpdate";
            console.log(`[${new Date().toISOString()}] ${kind}`);
            console.dir(update, { depth: 4, colors: true });
        },
        new Raw({})
    );

    console.log("Listening for raw updates. Press Ctrl+C to stop.");

    await waitForStopSignal();
    closePrompt();
    await client.disconnect();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
