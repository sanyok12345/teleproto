# teleproto

Telegram MTProto client for servers and browsers, written in TypeScript.

[![npm](https://img.shields.io/npm/v/teleproto)](https://www.npmjs.com/package/teleproto)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)

teleproto connects to Telegram the same way the official apps do and works as
a user account or a bot: send and read messages, handle updates, transfer
files, and call any Telegram API method with full types.

Forked from GramJS in 2025 and developed independently: see
[Coming from GramJS](#coming-from-gramjs) for what changed.

API reference: [ref.teleproto.dev](https://ref.teleproto.dev). Guides:
[docs.teleproto.dev](https://docs.teleproto.dev). Questions:
[Telegram chat](https://t.me/teleproto).

## Table of contents

- [Install](#install)
- [Quick start](#quick-start)
- [Coming from GramJS](#coming-from-gramjs)
- [Updates](#updates)
- [Typed API](#typed-api)
- [Errors](#errors)
- [Transports](#transports)
- [Keyboards](#keyboards)
- [Rich messages](#rich-messages)
- [Messages and files](#messages-and-files)
- [Sessions](#sessions)
- [Browser](#browser)
- [Extending](#extending)
- [Examples](#examples)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [License](#license)

## Install

```
npm install teleproto
```

Node.js 18+ and browsers through a bundler, with no polyfills (see
[Browser](#browser)). TypeScript types included; works with both `import` and
`require`.

## Quick start

Get an `api_id` and `api_hash` at <https://my.telegram.org>, then log in:

```ts
import { TelegramClient } from "teleproto";
import { StringSession } from "teleproto/sessions";
import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const client = new TelegramClient(new StringSession(""), apiId, apiHash, { connectionRetries: 5 });

await client.start({
  phoneNumber: () => rl.question("Phone: "),
  password: () => rl.question("2FA password: "),
  phoneCode: (_, info) => rl.question(`Code (${info?.type}): `),
  emailAddress: () => rl.question("Login email: "),
  emailVerification: () => rl.question("Email code: "),
  onError: console.error,
});

console.log(await client.getMe());
console.log(client.session.save());
```

A code of type `app` arrives in Telegram on your other devices, not by SMS.
The printed string is the saved login: pass it to `new StringSession(saved)`
and `start` skips the prompts.

Bots log in with a token:

```ts
await client.start({ botAuthToken: "123456:ABC..." });
```

## Coming from GramJS

teleproto keeps the GramJS API where it can, so most code compiles after an
import swap. Some behavior is different, and teleproto covers parts of
Telegram that GramJS does not. Read this before switching a running bot.

### Switch the package

```
npm uninstall telegram && npm install teleproto
```

```diff
-import { TelegramClient } from "telegram";
-import { StringSession } from "telegram/sessions";
+import { TelegramClient } from "teleproto";
+import { StringSession } from "teleproto/sessions";
```

Then run `tsc --noEmit`: teleproto ships the current schema layer, which
renames some fields and changes some request and result shapes, and the
compiler points at each one.

### Works as before

- `client.invoke(new Api...)`, `client.addEventHandler` and event builders.
- GramJS session strings: pass them to `StringSession`, no new login.
- GramJS deep imports such as `teleproto/extensions/BinaryReader` or
  `teleproto/network/connection/TCPObfuscated`.

### API changes

| GramJS | teleproto |
| --- | --- |
| `proxy: { ... }`, `networkSocket` | `transport: new SocksTransport(...)` and the other [transports](#transports) |
| `useWSS: true` | `transport: new WebSocketTransport()` |
| `sendReadAcknowledge(chat, { maxId })` | `markAsRead(chat, maxId)` |
| `err.errorMessage === "SESSION_REVOKED"` | `err instanceof errors.SessionRevokedError` or [`errors.handle`](#errors) |
| `Button.inline(...)` rows | `new InlineKeyboard().callback(...)` (`Button` still works) |

`proxy` and `networkSocket` still work but are deprecated. Layer 229 merged
the keyboard button classes into `KeyboardButton` and `KeyboardInlineButton`
with a `type`, so code that matched the old classes needs the new shape:

```ts
if (button instanceof Api.KeyboardInlineButton) {
  if (button.type instanceof Api.InlineButtonTypeCallback) handle(button.type.data);
  if (button.type instanceof Api.InlineButtonTypeUrl) open(button.type.url);
}
```

### Behavior changes

- **Missed updates arrive after a restart.** With `StoreSession`, or a
  session that persists `setUpdateState`, the client resumes from the saved
  state and delivers what it missed while offline, marked `update.missed`.
  Filter them in middleware or pass `catchUp: false` to skip them.
- **Handler order.** `addEventHandler` handlers run first, then the
  `client.updates` chain.
- **Channels you have not joined** send updates only through
  `client.updates.watch`.
- **Errors are classes.** Every Telegram error has its own class, so a dead
  session at `start()` throws `AuthKeyUnregisteredError` or
  `SessionRevokedError`, a restricted account throws the `Frozen*` errors,
  and slow mode throws `SlowModeWaitError` with `seconds`.
- **Files** go over several connections in parallel and through Telegram's
  CDNs, and message media downloads refresh expired file references on
  their own.
- **The peer cache in memory is bounded** to 4096 users and 4096 chats by
  default; older peers are read back from the session. `entityCache` sets
  the limit.
- **Connections are checked by ping.** A dead link is dropped and redialed,
  and after a sleep or a frozen background tab the client first checks the
  link with a ping instead of reconnecting blindly.
- **Browsers** need no polyfills, and the client picks `WebSocketTransport`
  on its own.

### What teleproto adds

- The `client.updates` chain with schema names, filters and `watch`.
- Control over missed updates: `update.missed` and `catchUp`.
- Typed error handling with `errors.handle` and `errors.match`.
- `client.api`: every method as a typed call.
- Sign-in flows Telegram added later: login email (`emailAddress`,
  `emailVerification`) and reCAPTCHA (`reCaptchaCallback`).
- MTProxy with fake-TLS secrets, SOCKS, HTTP and WebSocket transports, and
  [your own](#custom-transport).
- Keyboard builders with button styles.
- Rich messages built with `RichContent` and the `Rich` text helpers.
- Perfect forward secrecy for file transfers (`pfs`) and Telegram's test
  servers (`testServers`).
- A release for every schema layer: `1.232.x` is layer 232.

## Updates

`client.updates` is a middleware chain over every update type in the schema:

```ts
client.updates.on("newMessage", (update) => {
  if (update.message instanceof Api.Message) console.log(update.message.message);
});
```

Names come from the schema (`updateNewChannelMessage` is
`"newChannelMessage"`), so every update is subscribable and typed as its exact
class. `next()` passes the update on; returning without it consumes it.

```ts
client.updates.use(async (update, next) => {
  update.state.startedAt = Date.now();
  await next();
});

client.updates.on(["newMessage", "newChannelMessage"], handler, { chats: ["durov"] });
client.updates.on("botCallbackQuery", [checkAuth, handleClick]);
client.updates.catch((error, update) => console.error("handler failed", update, error));
```

Telegram sends channel updates only to sessions that keep the channel open.
For a channel you have not joined, use `watch`; it returns a stop function:

```ts
const stop = client.updates.watch("durov", (update) => console.log(update.message.id));
```

Updates missed while offline or during a reconnect arrive with
`update.missed` set, so handlers decide what to do with them. `catchUp: false`
in the client options skips them at start instead, like the Bot API's
`drop_pending_updates`.

```ts
client.updates.use((update, next) => (update.missed ? undefined : next()));
```

Event builders plug into the same chain:

```ts
import { NewMessage } from "teleproto/events";

client.updates.on(new NewMessage({ pattern: /^\/start/ }), (event) =>
  event.message.reply({ message: "hi" }));
```

## Typed API

Every Telegram method is a plain async call on `client.api`, with typed
parameters and results and Telegram's docs in your editor:

```ts
const resolved = await client.api.contacts.resolveUsername({ username: "durov" });
const full = await client.api.users.getFullUser({ id: "me" });
```

Nested TL objects are plain objects: `_` names the constructor, and the
compiler checks the fields against it. Where a type has one constructor, `_`
can be left out:

```ts
await client.api.messages.sendMedia({
  peer: "me",
  media: { _: "inputMediaDice", emoticon: "🎲" },
  message: "",
});

await client.api.messages.sendMessage({
  peer: "me",
  message: "hello",
  entities: [{ _: "messageEntityBold", offset: 0, length: 5 }],
});

await client.api.contacts.importContacts({
  contacts: [{ clientId: 1, phone: "+15550100", firstName: "Ann", lastName: "" }],
});
```

`client.api.call` takes a whole request in the same form, which suits
requests built from data:

```ts
await client.api.call({ _: "messages.sendMessage", peer: "me", message: "hi" });
```

Requests can still be built from classes:

```ts
import { Api } from "teleproto";

const config = await client.invoke(new Api.help.GetConfig());
```

## Errors

Every Telegram error is its own class in `teleproto/errors`, generated from
Telegram's error list. `errors.handle` maps classes to handlers, and each
handler gets the error typed as its class:

```ts
import { errors } from "teleproto";

await client
  .sendMessage(chat, { message: "hi" })
  .catch(errors.handle({
    FloodWaitError: (e) => sleep(e.seconds * 1000),
    SlowModeWaitError: (e) => console.log(`slow mode: next message in ${e.seconds}s`),
    ChatWriteForbiddenError: () => console.log("cannot write to this chat"),
    RPCError: (e) => console.log(`telegram error ${e.code}: ${e.errorMessage}`),
  }));
```

The most specific class wins whatever the key order, so
`ChatWriteForbiddenError` beats `RPCError`, and an error with no handler is
rethrown. Inside `try`/`catch`, `errors.match(error, handlers)` does the same,
and plain `instanceof` checks work too.

Flood waits up to `floodSleepThreshold` seconds (60 by default) are slept
through, so `FloodWaitError` reaches you only for longer ones. Errors share a
base class per HTTP code (`BadRequestError`, `ForbiddenError`, `FloodError`
and so on), all extending `RPCError` with `code` and `errorMessage`. An error
newer than your teleproto version falls back to that base class, with the
exact server string in `errorMessage`.

## Transports

`transport` routes every connection, file transfers included:

```ts
import { MTProxyTransport } from "teleproto";

new TelegramClient(session, apiId, apiHash, {
  transport: new MTProxyTransport({ host: "proxy.example.com", port: 443, secret: "ee..." }),
});
```

| Transport | Route |
| --- | --- |
| `TcpTransport` | direct TCP, the Node.js default |
| `WebSocketTransport` | secure WebSocket, the browser default |
| `MTProxyTransport` | MTProxy, including fake-TLS `ee` secrets |
| `SocksTransport` | SOCKS4 or SOCKS5 proxy |
| `HttpProxyTransport` | HTTP `CONNECT` proxy |
| `WebProxyTransport` | Telegram WEB relay, experimental |

Your own route: see [Custom transport](#custom-transport).

## Keyboards

Keyboards are built by chaining:

```ts
import { InlineKeyboard, ReplyKeyboard, Keyboard } from "teleproto";

const keyboard = new InlineKeyboard()
  .callback("Yes", "yes", { style: { color: "success" } })
  .callback("No", "no", { style: { color: "danger" } })
  .row()
  .url("Open", "https://t.me/durov");

await client.sendMessage(chat, { message: "Well?", buttons: keyboard });

const menu = new ReplyKeyboard([], { resize: true, placeholder: "Pick one" })
  .text("Hi")
  .requestPhone("Share phone");

Keyboard.hide({ selective: true });
```

Only bots can attach keyboards; Telegram drops them from messages sent by
user accounts.

## Rich messages

Rich messages carry titles, lists, tables, media and collapsible sections.
`RichContent` builds one block by block, and `Rich` formats the text inside:

```ts
import { RichContent, Rich } from "teleproto";

const post = new RichContent()
  .heading(1, "Release 1.232")
  .paragraph(Rich.bold("teleproto"), " ships layer 232. ", Rich.link("Changelog", "https://ref.teleproto.dev"))
  .list(["Typed API", "Transports", { text: "Docs", checked: true }])
  .photo(cover, { caption: "Cover" })
  .table([["Name", "Value"], ["layer", "232"]], { header: true })
  .details("More", (more) => more.paragraph("Written by ", Rich.mention("the author", author)));

await client.sendMessage(chat, { richMessage: post });
```

Photos, documents and mentioned users are attached to the message for you.
Every page block of the schema is reachable: `block()` takes raw blocks,
including plain objects with `_`. Telegram can also parse the content itself:
`Rich.markdown("# Title")` or `Rich.html("<h1>Title</h1>")`.

## Messages and files

```ts
await client.sendMessage("me", { message: "**hello** from teleproto" });

await client.sendFile("me", { file: "./photo.jpg", caption: "a photo" });

const [message] = await client.getMessages("me", { limit: 1 });
const bytes = await client.downloadMedia(message);
```

Text is parsed as Markdown by default; use `parseMode: "html"` per call or
`client.setParseMode("html")`. In the browser, pass files as `Buffer`, `Blob`
or `File` instead of paths.

Transfers run in parallel over several connections to the file's data
center and use Telegram's CDNs; downloads of message media refresh expired
file references on their own. `downloadPool` and `maxConcurrentDownloads`
tune them.

## Sessions

- `StringSession`: one string you store yourself.
- `StoreSession`: persisted under a name, in a folder on Node.js and in
  `localStorage` in the browser.
- `MemorySession`: in memory only, lost on exit.

```ts
import { StoreSession } from "teleproto/sessions";

const client = new TelegramClient(new StoreSession("main"), apiId, apiHash, {});
```

`StoreSession` also keeps the update state, so after a restart the client
fetches the updates it missed while offline.

## Browser

The same package runs in the browser through any bundler (Vite, esbuild,
webpack 5) with no polyfills:

```ts
import { TelegramClient } from "teleproto";
import { StoreSession } from "teleproto/sessions";

const client = new TelegramClient(new StoreSession("main"), apiId, apiHash, {});
await client.start({ botAuthToken });

const file = fileInput.files![0];
await client.sendFile(chat, { file, caption: file.name });
```

In the browser the client connects over WebSocket, `StoreSession` keeps the
session in `localStorage`, and files are `File`, `Blob` or `Buffer` instead of
paths. TCP transports (MTProxy, SOCKS, HTTP proxy) need raw sockets that
browsers do not have; go through a proxy with `WebProxyTransport` or your own
WebSocket relay via [`WebSocketTransport.webSocket`](#custom-transport).

## Extending

Storage, network route, logging and text parsing come from objects you pass
in, and each can be replaced.

### Custom session

Extend `StringSession` to keep the login in your own storage. The client
calls `save()` after connecting and whenever the auth key or data center
changes, and `setUpdateState()` as updates arrive; persisting both lets a
restart catch up on missed updates.

```ts
import { StringSession, type StoredUpdateState } from "teleproto/sessions";

interface KeyValueStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<unknown>;
}

class KeyValueSession extends StringSession {
  constructor(private readonly store: KeyValueStore, private readonly key: string, saved = "", state?: StoredUpdateState) {
    super(saved);
    super.setUpdateState(state);
  }

  static async open(store: KeyValueStore, key: string) {
    const [saved, state] = await Promise.all([store.get(key), store.get(`${key}:updates`)]);
    return new KeyValueSession(store, key, saved ?? "", state ? JSON.parse(state) : undefined);
  }

  save() {
    const value = super.save();
    if (value) void this.store.set(this.key, value);
    return value;
  }

  setUpdateState(state: StoredUpdateState | undefined) {
    super.setUpdateState(state);
    void this.store.set(`${this.key}:updates`, state ? JSON.stringify(state) : "");
  }
}

const client = new TelegramClient(await KeyValueSession.open(redis, "tg:main"), apiId, apiHash, {});
```

### Custom transport

Extend `Transport` and implement `connect`: open a stream to the given address
and return it, as a `net.Socket` or any duplex stream. MTProto framing,
obfuscation, keep-alive and reconnects stay with teleproto.

```ts
import { connect } from "node:net";
import { once } from "node:events";
import { Transport, type TransportAddress } from "teleproto";

class RelayTransport extends Transport {
  async connect({ host, port }: TransportAddress) {
    const socket = connect(9000, "relay.internal");
    await once(socket, "connect");
    socket.write(`${host}:${port}\n`);
    return socket;
  }
}

new TelegramClient(session, apiId, apiHash, { transport: new RelayTransport() });
```

For WebSocket, extend `WebSocketTransport` and return the socket from
`webSocket`. This one goes through a SOCKS proxy that only accepts domain
names:

```ts
import WebSocket from "ws";
import { SocksProxyAgent } from "socks-proxy-agent";
import { WebSocketTransport } from "teleproto";

const agent = new SocksProxyAgent("socks5h://127.0.0.1:1080");

class ProxiedWebSocketTransport extends WebSocketTransport {
  webSocket(url: string, protocols: string | string[]) {
    return new WebSocket(url, protocols, { agent });
  }
}
```

### Logging

Give the logger a `handler` to send records to your own logging:

```ts
import { Logger } from "teleproto";
import { LogLevel } from "teleproto/extensions/Logger";

const logger = new Logger(LogLevel.INFO);
logger.handler = ({ level, message, error, date }) => appLog.write({ level, message, error, date });

new TelegramClient(session, apiId, apiHash, { baseLogger: logger });
```

### Parse mode

A parse mode turns text into text plus entities, and back:

```ts
client.setParseMode({
  parse: (text) => [text.toUpperCase(), []],
  unparse: (text) => text,
});
```

## Examples

Runnable scripts in [teleproto_examples](https://github.com/sanyok12345/teleproto/tree/main/teleproto_examples):

- `print_updates.ts`: logs every update.
- `print_messages.ts`: logs new messages.
- `replier.ts`: replies by pattern.
- `interactive_terminal.ts`: a REPL on a live client.

Run them from the repository after a build, with credentials in the
environment:

```
npm install && npm run build
TG_API_ID=... TG_API_HASH=... npx ts-node --transpile-only teleproto_examples/print_updates.ts
```

## Versioning

Versions are `MAJOR.LAYER.PATCH`:

- **MAJOR**: breaking changes in teleproto.
- **LAYER**: the Telegram schema layer, so `1.232.x` ships layer 232.
- **PATCH**: fixes and non-breaking changes within a layer.

`^1.232.0` takes new layers and patches (recommended), `~1.232.0` stays on
layer 232, `1.232.0` pins exactly.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
