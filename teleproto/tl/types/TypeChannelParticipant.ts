import { ChannelParticipant } from "./ChannelParticipant";
import { ChannelParticipantSelf } from "./ChannelParticipantSelf";
import { ChannelParticipantCreator } from "./ChannelParticipantCreator";
import { ChannelParticipantAdmin } from "./ChannelParticipantAdmin";
import { ChannelParticipantBanned } from "./ChannelParticipantBanned";
import { ChannelParticipantLeft } from "./ChannelParticipantLeft";

export type TypeChannelParticipant = ChannelParticipant | ChannelParticipantSelf | ChannelParticipantCreator | ChannelParticipantAdmin | ChannelParticipantBanned | ChannelParticipantLeft;