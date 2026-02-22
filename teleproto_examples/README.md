# teleproto examples

This folder contains single-file examples inspired by the core Telethon examples, adapted for `teleproto` and TypeScript.

## Requirements

- Node.js 18+
- API credentials from https://my.telegram.org

Environment variables used by examples:

- `TG_API_ID` (required)
- `TG_API_HASH` (required)
- `TG_SESSION` (optional, default depends on script)
- `TG_STRING_SESSION` (optional, overrides `TG_SESSION` when set)

## Run

From project root:

```bash
npx ts-node --transpile-only teleproto_examples/print_updates.ts
npx ts-node --transpile-only teleproto_examples/print_messages.ts
npx ts-node --transpile-only teleproto_examples/replier.ts
npx ts-node --transpile-only teleproto_examples/interactive_terminal.ts
```

## Scripts

- `print_updates.ts` — prints raw Telegram updates.
- `print_messages.ts` — listens for `hello|hi|ping`, logs messages, replies `pong` to `ping`.
- `replier.ts` — tiny auto-replier with command-like triggers.
- `interactive_terminal.ts` — terminal mini-client: list dialogs, pick one, read history, send and download media.
