import { Messages } from "./Messages";
import { MessagesSlice } from "./MessagesSlice";
import { ChannelMessages } from "./ChannelMessages";
import { MessagesNotModified } from "./MessagesNotModified";

export type TypeMessages = Messages | MessagesSlice | ChannelMessages | MessagesNotModified;