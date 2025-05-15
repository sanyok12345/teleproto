# teleproto

A modern Telegram client library written in TypeScript for Node.js, forked from [GramJS](https://github.com/gram-js/gramjs) with performance and size improvements.

## Quick Start

Here's how to get started with teleproto:

### Installation

```bash
$ npm i teleproto
```

### Authentication Setup

1. Login to your [Telegram account](https://my.telegram.org/)
2. Click "API development tools" and create an application
3. Save your API ID and hash (never share these with anyone)

### Basic Usage

```javascript
import { TelegramClient } from "teleproto";
import { StringSession } from "teleproto/sessions";
import readline from "readline";

const apiId = 123456; // Replace with your API ID
const apiHash = "123456abcdefg"; // Replace with your API Hash
const stringSession = new StringSession(""); // Save the string session for later use

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("Starting teleproto client...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  
  await client.start({
    phoneNumber: async () => 
      await new Promise(resolve => rl.question("Phone number: ", resolve)),
    password: async () =>
      await new Promise(resolve => rl.question("Password: ", resolve)),
    phoneCode: async () =>
      await new Promise(resolve => rl.question("Verification code: ", resolve)),
    onError: (err) => console.error(err),
  });
  
  console.log("Connected successfully!");
  console.log("Session string:", client.session.save()); // Save this to avoid login next time
  
  // Send a message to yourself
  await client.sendMessage("me", { message: "Hello from teleproto!" });
  
  // Disconnect when done
  await client.disconnect();
  rl.close();
}

main();
```

You can also use `StoreSession` to save auth data to a folder instead of a string:

```javascript
import { StoreSession } from "teleproto/sessions";
const storeSession = new StoreSession("session_folder");
const client = new TelegramClient(storeSession, apiId, apiHash, {});
```

## API Usage

### Calling Raw API Methods

```javascript
await client.invoke(new Api.RequestClass({ param1: "value1" }));
```

### Event Handling

```javascript
import { NewMessage } from "teleproto/events";

client.addEventHandler(async (event) => {
  console.log("New message received:", event.message.text);
  
  if (event.message.text === "Hello") {
    await event.message.reply("Hi there!");
  }
}, new NewMessage({}));
```