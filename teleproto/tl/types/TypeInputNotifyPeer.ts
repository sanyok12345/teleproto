import { InputNotifyPeer } from "./InputNotifyPeer";
import { InputNotifyUsers } from "./InputNotifyUsers";
import { InputNotifyChats } from "./InputNotifyChats";
import { InputNotifyBroadcasts } from "./InputNotifyBroadcasts";
import { InputNotifyForumTopic } from "./InputNotifyForumTopic";

export type TypeInputNotifyPeer = InputNotifyPeer | InputNotifyUsers | InputNotifyChats | InputNotifyBroadcasts | InputNotifyForumTopic;