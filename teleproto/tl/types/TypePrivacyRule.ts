import { PrivacyValueAllowContacts } from "./PrivacyValueAllowContacts";
import { PrivacyValueAllowAll } from "./PrivacyValueAllowAll";
import { PrivacyValueAllowUsers } from "./PrivacyValueAllowUsers";
import { PrivacyValueDisallowContacts } from "./PrivacyValueDisallowContacts";
import { PrivacyValueDisallowAll } from "./PrivacyValueDisallowAll";
import { PrivacyValueDisallowUsers } from "./PrivacyValueDisallowUsers";
import { PrivacyValueAllowChatParticipants } from "./PrivacyValueAllowChatParticipants";
import { PrivacyValueDisallowChatParticipants } from "./PrivacyValueDisallowChatParticipants";
import { PrivacyValueAllowCloseFriends } from "./PrivacyValueAllowCloseFriends";
import { PrivacyValueAllowPremium } from "./PrivacyValueAllowPremium";
import { PrivacyValueAllowBots } from "./PrivacyValueAllowBots";
import { PrivacyValueDisallowBots } from "./PrivacyValueDisallowBots";

export type TypePrivacyRule = PrivacyValueAllowContacts | PrivacyValueAllowAll | PrivacyValueAllowUsers | PrivacyValueDisallowContacts | PrivacyValueDisallowAll | PrivacyValueDisallowUsers | PrivacyValueAllowChatParticipants | PrivacyValueDisallowChatParticipants | PrivacyValueAllowCloseFriends | PrivacyValueAllowPremium | PrivacyValueAllowBots | PrivacyValueDisallowBots;