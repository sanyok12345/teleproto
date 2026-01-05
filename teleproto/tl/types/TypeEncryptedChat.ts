import { EncryptedChatEmpty } from "./EncryptedChatEmpty";
import { EncryptedChatWaiting } from "./EncryptedChatWaiting";
import { EncryptedChatRequested } from "./EncryptedChatRequested";
import { EncryptedChat } from "./EncryptedChat";
import { EncryptedChatDiscarded } from "./EncryptedChatDiscarded";

export type TypeEncryptedChat = EncryptedChatEmpty | EncryptedChatWaiting | EncryptedChatRequested | EncryptedChat | EncryptedChatDiscarded;