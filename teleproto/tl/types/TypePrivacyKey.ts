import { PrivacyKeyStatusTimestamp } from "./PrivacyKeyStatusTimestamp";
import { PrivacyKeyChatInvite } from "./PrivacyKeyChatInvite";
import { PrivacyKeyPhoneCall } from "./PrivacyKeyPhoneCall";
import { PrivacyKeyPhoneP2P } from "./PrivacyKeyPhoneP2P";
import { PrivacyKeyForwards } from "./PrivacyKeyForwards";
import { PrivacyKeyProfilePhoto } from "./PrivacyKeyProfilePhoto";
import { PrivacyKeyPhoneNumber } from "./PrivacyKeyPhoneNumber";
import { PrivacyKeyAddedByPhone } from "./PrivacyKeyAddedByPhone";
import { PrivacyKeyVoiceMessages } from "./PrivacyKeyVoiceMessages";
import { PrivacyKeyAbout } from "./PrivacyKeyAbout";
import { PrivacyKeyBirthday } from "./PrivacyKeyBirthday";
import { PrivacyKeyStarGiftsAutoSave } from "./PrivacyKeyStarGiftsAutoSave";
import { PrivacyKeyNoPaidMessages } from "./PrivacyKeyNoPaidMessages";
import { PrivacyKeySavedMusic } from "./PrivacyKeySavedMusic";

export type TypePrivacyKey = PrivacyKeyStatusTimestamp | PrivacyKeyChatInvite | PrivacyKeyPhoneCall | PrivacyKeyPhoneP2P | PrivacyKeyForwards | PrivacyKeyProfilePhoto | PrivacyKeyPhoneNumber | PrivacyKeyAddedByPhone | PrivacyKeyVoiceMessages | PrivacyKeyAbout | PrivacyKeyBirthday | PrivacyKeyStarGiftsAutoSave | PrivacyKeyNoPaidMessages | PrivacyKeySavedMusic;