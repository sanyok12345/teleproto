import { ChatEmpty } from "./ChatEmpty";
import { Chat } from "./Chat";
import { ChatForbidden } from "./ChatForbidden";
import { Channel } from "./Channel";
import { ChannelForbidden } from "./ChannelForbidden";

export type TypeChat = ChatEmpty | Chat | ChatForbidden | Channel | ChannelForbidden;