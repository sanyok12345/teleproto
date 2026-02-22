import { TelegramClient } from "../teleproto";
import { createStartedClient } from "./helpers";

function printHelp() {
    console.log("Commands:");
    console.log("  /dialogs              - list top dialogs");
    console.log("  /use <n>              - select dialog by number from last list");
    console.log("  /history [n]          - print latest N messages in active dialog");
    console.log("  /download <id> <path> - download media by message id");
    console.log("  /exit                 - disconnect and quit");
    console.log("  any other text        - send message to active dialog");
}

async function printDialogs(client: TelegramClient, limit = 15) {
    const dialogs = await client.getDialogs({ limit });
    dialogs.forEach((dialog, index) => {
        console.log(`${index + 1}. ${dialog.title} (${dialog.id})`);
    });
    return dialogs;
}

async function main() {
    const { client, ask, closePrompt } = await createStartedClient("interactive_session");

    console.log("Interactive teleproto client started.");
    printHelp();

    let dialogs = await printDialogs(client, 15);
    let current = dialogs[0];

    if (current) {
        console.log(`Active dialog: ${current.title}`);
    } else {
        console.log("No dialogs found. Open Telegram chats and run again.");
    }

    while (true) {
        const input = (await ask("teleproto> ")).trim();
        if (!input) continue;

        if (input === "/exit") {
            break;
        }

        if (input === "/help") {
            printHelp();
            continue;
        }

        if (input === "/dialogs") {
            dialogs = await printDialogs(client, 15);
            continue;
        }

        if (input.startsWith("/use ")) {
            const idx = Number(input.slice(5).trim());
            if (!Number.isInteger(idx) || idx < 1 || idx > dialogs.length) {
                console.log("Invalid dialog index.");
                continue;
            }
            current = dialogs[idx - 1];
            console.log(`Active dialog: ${current.title}`);
            continue;
        }

        if (!current) {
            console.log("No active dialog. Use /dialogs and /use <n>.");
            continue;
        }

        if (input.startsWith("/history")) {
            const maybeLimit = input.split(" ")[1];
            const limit = maybeLimit ? Math.max(1, Number(maybeLimit)) : 10;

            const messages = await client.getMessages(current.entity, { limit });
            for (const message of [...messages].reverse()) {
                const sender = message.senderId ? message.senderId.toString() : "?";
                const text = message.message || "<non-text message>";
                console.log(`[${message.id}] ${sender}: ${text}`);
            }
            continue;
        }

        if (input.startsWith("/download ")) {
            const args = input.slice("/download ".length).trim().split(/\s+/);
            if (args.length < 2) {
                console.log("Usage: /download <msg-id> <output-path>");
                continue;
            }

            const messageId = Number(args[0]);
            const outputPath = args.slice(1).join(" ");
            if (!Number.isInteger(messageId)) {
                console.log("Message id must be a number.");
                continue;
            }

            const found = await client.getMessages(current.entity, { ids: messageId });
            const msg = found[0];
            if (!msg) {
                console.log("Message not found.");
                continue;
            }

            const result = await msg.downloadMedia({ outputFile: outputPath });
            if (!result) {
                console.log("No downloadable media in that message.");
            } else {
                console.log("Downloaded to:", result);
            }
            continue;
        }

        await client.sendMessage(current.entity, { message: input });
    }

    closePrompt();
    await client.disconnect();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
