import { ChannelParticipantsRecent } from "./ChannelParticipantsRecent";
import { ChannelParticipantsAdmins } from "./ChannelParticipantsAdmins";
import { ChannelParticipantsKicked } from "./ChannelParticipantsKicked";
import { ChannelParticipantsBots } from "./ChannelParticipantsBots";
import { ChannelParticipantsBanned } from "./ChannelParticipantsBanned";
import { ChannelParticipantsSearch } from "./ChannelParticipantsSearch";
import { ChannelParticipantsContacts } from "./ChannelParticipantsContacts";
import { ChannelParticipantsMentions } from "./ChannelParticipantsMentions";

export type TypeChannelParticipantsFilter = ChannelParticipantsRecent | ChannelParticipantsAdmins | ChannelParticipantsKicked | ChannelParticipantsBots | ChannelParticipantsBanned | ChannelParticipantsSearch | ChannelParticipantsContacts | ChannelParticipantsMentions;