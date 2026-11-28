// Interactive login by QR code — no SMS or app code needed. Telegram on the
// phone approves the scan: Settings → Devices → Link Desktop Device.
//
//   TG_API_ID=... TG_API_HASH=... bun teleproto_tests/get-session-qr.ts
//
// Needs `npm run build` first (imports dist, the shipped artifact). The
// printed session string grants full account access — store it like a
// password, never commit it.
import { createInterface } from "node:readline/promises";
import QRCode from "qrcode";
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
await client.connect();

console.log("waiting for the scan…\n");
const user = await client.signInUserWithQrCode(
    { apiId, apiHash },
    {
        qrCode: async ({ token }) => {
            const url = `tg://login?token=${token.toString("base64url")}`;
            console.clear();
            console.log("On the phone: Telegram → Settings → Devices → Link Desktop Device\n");
            console.log(await QRCode.toString(url, { type: "terminal", small: true }));
        },
        // asked only when the account has a cloud password
        password: () => rl.question("2FA password: "),
        onError: (error) => console.error("onError:", error.message),
    },
);

console.log("\nlogged in as:", user.username);
console.log("\nTG_STRING_SESSION:");
console.log(client.session.save());
console.log("\nkeep it secret — it is the full login");

rl.close();
await client.disconnect();
process.exit(0);
