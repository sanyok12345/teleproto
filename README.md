# teleproto

<p align="center">
  <img src="https://img.shields.io/npm/v/teleproto" alt="npm version">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen" alt="node version">
  <img src="https://img.shields.io/badge/language-TypeScript-3178c6" alt="typescript">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license">
  <a href="https://t.me/teleproto"><img src="https://img.shields.io/badge/Telegram-Chat-26A5E4?logo=telegram" alt="telegram chat"></a>
</p>

Modern Telegram MTProto client for Node.js, written in TypeScript.
`teleproto` is a high-performance fork of GramJS focused on clean API ergonomics, runtime reliability, and up-to-date Telegram layers.

## Features

- **MTProto-first**: Full Telegram API access through high-level client methods and raw `Api` calls.
- **TypeScript-friendly**: Strong typings across client methods, events, sessions, and TL objects.
- **Session options**: Use `StringSession` for portability or `StoreSession` for local persistence.
- **Event system**: Handle updates with builders like `NewMessage`, `EditedMessage`, `CallbackQuery`, and more.
- **Examples included**: Ready-to-run scripts in `teleproto_examples`.

## Installation

```bash 
npm i teleproto
```

## Quick Start

1. Open https://my.telegram.org
2. Create an app in **API development tools**
3. Copy your `api_id` and `api_hash`

```ts
import { TelegramClient } from "teleproto";
import { StringSession } from "teleproto/sessions";
import readline from "readline";

const apiId = 123456;
const apiHash = "0123456789abcdef0123456789abcdef";
const session = new StringSession("");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q: string) =>
  new Promise<string>((resolve) => rl.question(q, resolve));

async function main() {
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await ask("Phone number: "),
    password: async () => await ask("2FA password (if enabled): "),
    phoneCode: async () => await ask("Code from Telegram: "),
    onError: (err) => console.error(err),
  });

  console.log("Connected as:", (await client.getMe())?.username || "unknown");
  console.log("String session:\n", client.session.save());

  await client.sendMessage("me", { message: "Hello from teleproto!" });
  await client.disconnect();
  rl.close();
}

main().catch(console.error);
```

## Sessions

Use `StringSession` when you want to store auth as a single string:

```ts
import { StringSession } from "teleproto/sessions";
const session = new StringSession("");
```

Use `StoreSession` when you want local folder-based persistence:

```ts
import { StoreSession } from "teleproto/sessions";
const session = new StoreSession("teleproto_session");
```

## Events

```ts
import { NewMessage } from "teleproto/events";

client.addEventHandler(
  async (event) => {
    const text = event.message.message || "";
    if (/^hello$/i.test(text.trim())) {
      await event.message.reply({ message: "Hi there!" });
    }
  },
  new NewMessage({})
);
```

## Raw API

```ts
import { Api } from "teleproto";

const result = await client.invoke(
  new Api.help.GetConfig()
);
console.log(result);
```

## Examples

Practical scripts are available in `teleproto_examples`:

- `print_updates.ts`
- `print_messages.ts`
- `replier.ts`
- `interactive_terminal.ts`

Run any example from the project root:

```bash
npx ts-node --transpile-only teleproto_examples/print_updates.ts
```

## Community

- [Telegram Chat](https://t.me/teleproto) — questions, discussions, updates
- [GitHub Issues](https://github.com/sanyok12345/teleproto/issues) — bug reports and feature requests

## License

MIT
