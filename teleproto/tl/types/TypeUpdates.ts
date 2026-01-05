import { UpdatesTooLong } from "./UpdatesTooLong";
import { UpdateShortMessage } from "./UpdateShortMessage";
import { UpdateShortChatMessage } from "./UpdateShortChatMessage";
import { UpdateShort } from "./UpdateShort";
import { UpdatesCombined } from "./UpdatesCombined";
import { Updates } from "./Updates";
import { UpdateShortSentMessage } from "./UpdateShortSentMessage";

export type TypeUpdates = UpdatesTooLong | UpdateShortMessage | UpdateShortChatMessage | UpdateShort | UpdatesCombined | Updates | UpdateShortSentMessage;