import { InputPrivacyKeyStatusTimestamp } from "./InputPrivacyKeyStatusTimestamp";
import { InputPrivacyKeyChatInvite } from "./InputPrivacyKeyChatInvite";
import { InputPrivacyKeyPhoneCall } from "./InputPrivacyKeyPhoneCall";
import { InputPrivacyKeyPhoneP2P } from "./InputPrivacyKeyPhoneP2P";
import { InputPrivacyKeyForwards } from "./InputPrivacyKeyForwards";
import { InputPrivacyKeyProfilePhoto } from "./InputPrivacyKeyProfilePhoto";
import { InputPrivacyKeyPhoneNumber } from "./InputPrivacyKeyPhoneNumber";
import { InputPrivacyKeyAddedByPhone } from "./InputPrivacyKeyAddedByPhone";
import { InputPrivacyKeyVoiceMessages } from "./InputPrivacyKeyVoiceMessages";
import { InputPrivacyKeyAbout } from "./InputPrivacyKeyAbout";
import { InputPrivacyKeyBirthday } from "./InputPrivacyKeyBirthday";
import { InputPrivacyKeyStarGiftsAutoSave } from "./InputPrivacyKeyStarGiftsAutoSave";
import { InputPrivacyKeyNoPaidMessages } from "./InputPrivacyKeyNoPaidMessages";
import { InputPrivacyKeySavedMusic } from "./InputPrivacyKeySavedMusic";

export type TypeInputPrivacyKey = InputPrivacyKeyStatusTimestamp | InputPrivacyKeyChatInvite | InputPrivacyKeyPhoneCall | InputPrivacyKeyPhoneP2P | InputPrivacyKeyForwards | InputPrivacyKeyProfilePhoto | InputPrivacyKeyPhoneNumber | InputPrivacyKeyAddedByPhone | InputPrivacyKeyVoiceMessages | InputPrivacyKeyAbout | InputPrivacyKeyBirthday | InputPrivacyKeyStarGiftsAutoSave | InputPrivacyKeyNoPaidMessages | InputPrivacyKeySavedMusic;