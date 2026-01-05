import { InputPrivacyValueAllowContacts } from "./InputPrivacyValueAllowContacts";
import { InputPrivacyValueAllowAll } from "./InputPrivacyValueAllowAll";
import { InputPrivacyValueAllowUsers } from "./InputPrivacyValueAllowUsers";
import { InputPrivacyValueDisallowContacts } from "./InputPrivacyValueDisallowContacts";
import { InputPrivacyValueDisallowAll } from "./InputPrivacyValueDisallowAll";
import { InputPrivacyValueDisallowUsers } from "./InputPrivacyValueDisallowUsers";
import { InputPrivacyValueAllowChatParticipants } from "./InputPrivacyValueAllowChatParticipants";
import { InputPrivacyValueDisallowChatParticipants } from "./InputPrivacyValueDisallowChatParticipants";
import { InputPrivacyValueAllowCloseFriends } from "./InputPrivacyValueAllowCloseFriends";
import { InputPrivacyValueAllowPremium } from "./InputPrivacyValueAllowPremium";
import { InputPrivacyValueAllowBots } from "./InputPrivacyValueAllowBots";
import { InputPrivacyValueDisallowBots } from "./InputPrivacyValueDisallowBots";

export type TypeInputPrivacyRule = InputPrivacyValueAllowContacts | InputPrivacyValueAllowAll | InputPrivacyValueAllowUsers | InputPrivacyValueDisallowContacts | InputPrivacyValueDisallowAll | InputPrivacyValueDisallowUsers | InputPrivacyValueAllowChatParticipants | InputPrivacyValueDisallowChatParticipants | InputPrivacyValueAllowCloseFriends | InputPrivacyValueAllowPremium | InputPrivacyValueAllowBots | InputPrivacyValueDisallowBots;