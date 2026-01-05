import { ChatParticipant } from "./ChatParticipant";
import { ChatParticipantCreator } from "./ChatParticipantCreator";
import { ChatParticipantAdmin } from "./ChatParticipantAdmin";

export type TypeChatParticipant = ChatParticipant | ChatParticipantCreator | ChatParticipantAdmin;