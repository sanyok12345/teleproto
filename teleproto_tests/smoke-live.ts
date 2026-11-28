// Live smoke test against real Telegram servers. Exercises connect, auth,
// updates, message send/receive, file upload/download and session reuse —
// the full client loop — under the runtime that runs it (Node.js or Bun).
//
// Credentials come from the environment and never touch the repository:
//
//   TG_API_ID           required
//   TG_API_HASH         required
//   TG_BOT_TOKEN        bot login (or TG_STRING_SESSION for a user account)
//   TG_STRING_SESSION   user login from a previously saved StringSession
//   TG_CHAT_ID          target chat; required for bots (they cannot write to
//                       "me"), defaults to "me" (Saved Messages) for users
//
//   npm run smoke:bun
//   npm run smoke:node
//
// Both need `npm run build` first — the script imports the built dist, the
// same artifact that gets published.
import { readFileSync } from "node:fs";
import { TelegramClient } from "../dist/index.js";
import { StringSession, StoreSession } from "../dist/sessions/index.js";
import { Api } from "../dist/tl/index.js";
import { Buffer, crypto } from "../dist/platform/index.js";

interface Step {
    name: string;
    ok: boolean;
    detail: string;
}

const steps: Step[] = [];
function record(name: string, ok: boolean, detail = ""): void {
    steps.push({ name, ok, detail });
    console.log(`${ok ? "  ✓" : "  ✗"} ${name}${detail ? ` — ${detail}` : ""}`);
}

const runtime = typeof (globalThis as { Bun?: unknown }).Bun !== "undefined"
    ? `bun ${(globalThis as { version?: string }).version ?? ""}`.trim()
    : `node ${process.versions.node}`;

function fail(message: string): never {
    console.error(`smoke: ${message}`);
    console.error("set TG_API_ID, TG_API_HASH and TG_BOT_TOKEN (or TG_STRING_SESSION),");
    console.error("plus TG_CHAT_ID when authenticating as a bot.");
    process.exit(2);
}

const apiId = Number(process.env.TG_API_ID);
const apiHash = process.env.TG_API_HASH;
const botToken = process.env.TG_BOT_TOKEN;
const savedSession = process.env.TG_STRING_SESSION;
const chat = process.env.TG_CHAT_ID ?? (botToken ? undefined : "me");

if (!apiId || !apiHash) fail("TG_API_ID / TG_API_HASH are missing");
if (!botToken && !savedSession) fail("neither TG_BOT_TOKEN nor TG_STRING_SESSION is set");
if (!chat) fail("bots need TG_CHAT_ID (they cannot message Saved Messages)");

console.log(`teleproto live smoke — ${runtime} — chat ${chat}`);

// --- client 1: log in and exercise the full loop -------------------------------
const storeDir = `${process.cwd()}/.smoke-session`;
const session = botToken ? new StoreSession(storeDir) : new StringSession(savedSession);
const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 3,
    catchUp: false,
    autoReconnect: true,
});

// incoming updates observed while the test runs; a real channel/message push
// exercises the whole updates chain
let incoming = 0;
client.updates.on(["newMessage", "newChannelMessage"], (update) => {
    const message = (update as { message?: unknown }).message;
    if (message instanceof Api.Message) incoming++;
});

if (botToken) {
    await client.start({ botAuthToken });
} else {
    // the provided session string is already authorized; start() would sit
    // on the login prompts if it were not, so connect directly and let
    // getMe reject an invalid session
    await client.connect();
}
record("connect + auth", true, `as ${(await client.getMe()).username ?? (await client.getMe()).phoneNumber ?? "?"}`);

const me = await client.getMe();
record("getMe", true, `id=${me.id.toString()}`);

// --- send a message; its id comes back through the RPC result's updates ------
const note = `teleproto smoke ${runtime} ${Date.now()}`;
const sent = await client.sendMessage(chat!, { message: note });
record("sendMessage", true, `id=${sent.id}`);

// a session never receives a push for its own outgoing message — it already
// knows the id from the RPC result — so the update pipeline is verified on
// real incoming traffic: any channel or private chat message that arrives
// while the test runs flows through client.updates
const deadline = Date.now() + 25_000;
while (Date.now() < deadline && incoming === 0) {
    await new Promise((resolve) => setTimeout(resolve, 250));
}
record("updates chain delivers incoming traffic", incoming > 0, incoming > 0 ? `${incoming} message(s) through client.updates` : "no incoming messages in 25s");

// --- upload a small file and download it back ---------------------------------
const payload = Buffer.concat([
    Buffer.from("teleproto smoke file header\n"),
    crypto.randomBytes(16 * 1024),
]);
const fileMessage = await client.sendFile(chat!, {
    file: payload,
    caption: `smoke ${runtime}`,
    forceDocument: true,
});
record("sendFile(Buffer)", true, `id=${fileMessage.id}`);

const fetched = await client.getMessages(chat!, { ids: [fileMessage.id] });
const mediaMessage = fetched[0] instanceof Api.Message ? fetched[0] : undefined;
let downloaded: Buffer | undefined;
if (mediaMessage?.document) {
    downloaded = await client.downloadMedia(mediaMessage, {});
}
record(
    "downloadMedia round trip",
    !!downloaded && downloaded.equals(payload),
    downloaded ? `${downloaded.length} bytes` : "no document on message",
);

// --- clean up the chat ---------------------------------------------------------
const deleted = await client
    .deleteMessages(chat!, [sent.id, fileMessage.id], { revoke: true })
    .then(() => true)
    .catch(() => false);
record("cleanup messages", deleted, deleted ? "deleted" : "left in chat (revoke not permitted)");

await client.disconnect();

// --- client 2: a fresh client object must reuse the session without auth ------
const reused = new TelegramClient(
    botToken ? new StoreSession(storeDir) : new StringSession(client.session.save()),
    apiId,
    apiHash,
    { connectionRetries: 3, catchUp: false },
);
let reuseOk = false;
let reuseDetail = "";
try {
    await reused.connect();
    const meAgain = await reused.getMe();
    reuseOk = meAgain.id.toString() === me.id.toString();
    reuseDetail = `same id=${meAgain.id.toString()}`;
} catch (e) {
    reuseDetail = String((e as Error).message ?? e);
} finally {
    await reused.disconnect();
}
record("session reuse without re-auth", reuseOk, reuseDetail);

// -------------------------------------------------------------------------------
const failed = steps.filter((step) => !step.ok);
console.log(failed.length === 0
    ? `\nSMOKE PASS — ${steps.length}/${steps.length} steps (${runtime})`
    : `\nSMOKE FAIL — ${steps.length - failed.length}/${steps.length} steps (${runtime})`);
process.exit(failed.length === 0 ? 0 : 1);
