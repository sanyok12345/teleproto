[![npm](https://img.shields.io/npm/v/teleproto)](https://www.npmjs.com/package/teleproto)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)

This project was forked from the open source GramJS project in 2025 and is now developed independently.

This README is just a fast *quick start*. Ongoing discussion happens in the [Telegram chat](https://t.me/teleproto).

# What is teleproto?

teleproto is a TypeScript client for Telegram's MTProto API — the same protocol Telegram's own apps speak. Through it, your code gets the full account surface: userbots, multi-account automation, file transfer, raw TL invocation when you need it. If you only need to push notifications from a bot, the official Bot API is simpler; teleproto exists for everything *beyond* that.

# Installing teleproto

    % npm install teleproto

Pure JavaScript, no native build step — installs cleanly on Alpine, ARM, and serverless runtimes.

# Connecting to Telegram

You need an `api_id` and `api_hash` from <https://my.telegram.org>. Then:

```ts
import { TelegramClient } from "teleproto";
import { StringSession } from "teleproto/sessions";
import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });

const apiId = 0;     // from https://my.telegram.org
const apiHash = "";  // from https://my.telegram.org
const session = new StringSession("");

const client = new TelegramClient(session, apiId, apiHash, {
  connectionRetries: 5,
});

await client.start({
  phoneNumber: () => rl.question("Phone: "),
  password:    () => rl.question("2FA password: "),
  phoneCode:   () => rl.question("Code: "),
  onError: console.error,
});

console.log(await client.getMe());
console.log("Session string:", client.session.save());

rl.close();
```

The session string is your saved login. Drop it back into `new StringSession(saved)` next time and skip the auth flow entirely.

# Sending and receiving

Send a message, listen for incoming ones:

```ts
await client.sendMessage("me", { message: "hello from teleproto" });

client.updates.on("newMessage", (update) => console.log(update.message.message));
```

Handlers form a chain: `next()` passes the update to the handlers behind it, returning without it consumes the update. Names are the schema's own — `updateNewChannelMessage` is `"newChannelMessage"` — so every update type is subscribable, autocompleted and typed as its exact class:

```ts
client.updates.use(async (update, next) => {
  update.state.startedAt = Date.now();   // for the handlers behind this one
  await next();
});

client.updates.on(["newMessage", "newChannelMessage"], handler, { chats: ["durov"] });
client.updates.on("botCallbackQuery", [checkAuth, handleClick]);
client.updates.catch((error, update) => console.error(update?.className, error));
```

Telegram streams channel updates only to a session that keeps the channel open, so listening to a channel you are not a member of takes a subscription. `watch` keeps it alive and stops on the returned function:

```ts
const stop = client.updates.watch("durov", (update) => console.log(update.message.id));
```

Event builders still work, and give the event objects with their shortcuts:

```ts
import { NewMessage } from "teleproto/events";

client.updates.on(new NewMessage({ pattern: /^\/start/ }), (event) =>
  event.message.reply({ message: "hi" }));
```

The older `client.addEventHandler(handler, new NewMessage({}))` is untouched and runs before the chain.

# Keyboards

Build them from a grid, by chaining, or both — the class is the builder:

```ts
import { InlineKeyboard, ReplyKeyboard, Keyboard } from "teleproto";

const keyboard = new InlineKeyboard()
  .callback("Yes", "yes", { style: { color: "success" } })
  .callback("No", "no", { style: { color: "danger" } })
  .row()
  .url("Open", "https://t.me/durov");

await client.sendMessage(chat, { message: "Well?", buttons: keyboard });
```

Reply keyboards carry their own options, and `Keyboard` holds the markups without buttons:

```ts
const menu = new ReplyKeyboard([], { resize: true, placeholder: "Pick one" })
  .text("Hi")
  .requestPhone("Share phone")
  .requestPeer("Pick a chat", { buttonId: 1, peerType, max: 3 });

Keyboard.hide({ selective: true });
Keyboard.forceReply({ placeholder: "Answer here" });
```

Only bots can attach keyboards; the server drops them from messages sent by a user account.

Layer 229 replaced the separate `keyboardButtonUrl`, `keyboardButtonCallback` and their fifteen siblings with `keyboardButton` and `keyboardInlineButton`, each carrying a `type`. Code that matched the old classes needs the new shape:

```ts
if (button instanceof Api.KeyboardInlineButton) {
  if (button.type instanceof Api.InlineButtonTypeCallback) handle(button.type.data);
  if (button.type instanceof Api.InlineButtonTypeUrl) open(button.type.url);
}
```

# Raw MTProto API

Every method in Telegram's TL schema is callable through `client.api`, typed and autocompleted:

```ts
const dialogs = await client.api.messages.getDialogs({ limit: 10 });
const full = await client.api.users.getFullUser({ id: "me" });
```

Or construct requests manually:

```ts
import { Api } from "teleproto";

const config = await client.invoke(new Api.help.GetConfig());
```

# Versioning

teleproto uses a three-part version `MAJOR.LAYER.PATCH`:

- **MAJOR** — bumped on breaking API changes in teleproto itself.
- **LAYER** — the Telegram TL schema layer the release ships against
  (e.g. `1.225.x` ships layer 225).
- **PATCH** — fixes and non-breaking improvements within the same layer.

This stays compatible with npm's range syntax:

- `^1.225.0` accepts new layers and patches — recommended default.
- `~1.225.0` sticks to layer 225 only; useful if you depend on
  schema specifics that newer layers might change.
- `1.225.1` is an exact pin.

# Examples

Runnable scripts live in [teleproto_examples/](teleproto_examples/):

- `print_updates.ts` — log every update the client receives
- `print_messages.ts` — listen for new messages only
- `replier.ts` — auto-reply pattern for bots and userbots
- `interactive_terminal.ts` — REPL against a live client

Each is self-contained. Set your credentials at the top and run:

    % npx ts-node --transpile-only teleproto_examples/print_updates.ts

# Code contributions

Please see [CONTRIBUTING.md][1].

# License

teleproto is distributed under the [MIT License][2].

[1]: ./CONTRIBUTING.md
[2]: ./LICENSE
