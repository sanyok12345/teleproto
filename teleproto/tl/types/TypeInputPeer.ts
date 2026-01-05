import { InputPeerEmpty } from "./InputPeerEmpty";
import { InputPeerSelf } from "./InputPeerSelf";
import { InputPeerChat } from "./InputPeerChat";
import { InputPeerUser } from "./InputPeerUser";
import { InputPeerChannel } from "./InputPeerChannel";
import { InputPeerUserFromMessage } from "./InputPeerUserFromMessage";
import { InputPeerChannelFromMessage } from "./InputPeerChannelFromMessage";

export type TypeInputPeer = InputPeerEmpty | InputPeerSelf | InputPeerChat | InputPeerUser | InputPeerChannel | InputPeerUserFromMessage | InputPeerChannelFromMessage;