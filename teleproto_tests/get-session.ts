// Interactive login that prints a StringSession — the credential the smoke
// test and user-account scripts take as TG_STRING_SESSION.
//
//   TG_API_ID=... TG_API_HASH=... bun teleproto_tests/get-session.ts
//
// Needs `npm run build` (or `bun run build`) first: it imports dist, the
// shipped artifact. The printed string grants full account access — store
// it like a password, never commit it.
import { createInterface } from "node:readline/promises";
import { TelegramClient } from "../dist/index.js";
import { StringSession } from "../dist/sessions/index.js";

const rl = createInterface({ input: process.stdin, output: process.stdout });

const apiId = Number(process.env.TG_API_ID);
const apiHash = process.env.TG_API_HASH;
if (!apiId || !apiHash) {
    console.error("set TG_API_ID and TG_API_HASH");
    process.exit(2);
}

const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
    connectionRetries: 3,
});

await client.start({
    phoneNumber: () => rl.question("Phone (international, e.g. +7995...): "),
    phoneCode: (_, info) => rl.question(`Code (${info?.type?.className ?? "telegram"}): `),
    password: () => rl.question("2FA password: "),
    emailAddress: () => rl.question("Login email: "),
    emailVerification: () => rl.question("Email code: "),
    onError: console.error,
});

console.log("\nlogged in as:", (await client.getMe()).username);
console.log("\nTG_STRING_SESSION:");
console.log(client.session.save());
console.log("\nkeep it secret — it is the full login");

rl.close();
await client.disconnect();
process.exit(0);
