import { NotifyPeer } from "./NotifyPeer";
import { NotifyUsers } from "./NotifyUsers";
import { NotifyChats } from "./NotifyChats";
import { NotifyBroadcasts } from "./NotifyBroadcasts";
import { NotifyForumTopic } from "./NotifyForumTopic";

export type TypeNotifyPeer = NotifyPeer | NotifyUsers | NotifyChats | NotifyBroadcasts | NotifyForumTopic;