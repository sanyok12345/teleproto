import { InputMessageID } from "./InputMessageID";
import { InputMessageReplyTo } from "./InputMessageReplyTo";
import { InputMessagePinned } from "./InputMessagePinned";
import { InputMessageCallbackQuery } from "./InputMessageCallbackQuery";

export type TypeInputMessage = InputMessageID | InputMessageReplyTo | InputMessagePinned | InputMessageCallbackQuery;