import { InputMessagesFilterEmpty } from "./InputMessagesFilterEmpty";
import { InputMessagesFilterPhotos } from "./InputMessagesFilterPhotos";
import { InputMessagesFilterVideo } from "./InputMessagesFilterVideo";
import { InputMessagesFilterPhotoVideo } from "./InputMessagesFilterPhotoVideo";
import { InputMessagesFilterDocument } from "./InputMessagesFilterDocument";
import { InputMessagesFilterUrl } from "./InputMessagesFilterUrl";
import { InputMessagesFilterGif } from "./InputMessagesFilterGif";
import { InputMessagesFilterVoice } from "./InputMessagesFilterVoice";
import { InputMessagesFilterMusic } from "./InputMessagesFilterMusic";
import { InputMessagesFilterChatPhotos } from "./InputMessagesFilterChatPhotos";
import { InputMessagesFilterPhoneCalls } from "./InputMessagesFilterPhoneCalls";
import { InputMessagesFilterRoundVoice } from "./InputMessagesFilterRoundVoice";
import { InputMessagesFilterRoundVideo } from "./InputMessagesFilterRoundVideo";
import { InputMessagesFilterMyMentions } from "./InputMessagesFilterMyMentions";
import { InputMessagesFilterGeo } from "./InputMessagesFilterGeo";
import { InputMessagesFilterContacts } from "./InputMessagesFilterContacts";
import { InputMessagesFilterPinned } from "./InputMessagesFilterPinned";

export type TypeMessagesFilter = InputMessagesFilterEmpty | InputMessagesFilterPhotos | InputMessagesFilterVideo | InputMessagesFilterPhotoVideo | InputMessagesFilterDocument | InputMessagesFilterUrl | InputMessagesFilterGif | InputMessagesFilterVoice | InputMessagesFilterMusic | InputMessagesFilterChatPhotos | InputMessagesFilterPhoneCalls | InputMessagesFilterRoundVoice | InputMessagesFilterRoundVideo | InputMessagesFilterMyMentions | InputMessagesFilterGeo | InputMessagesFilterContacts | InputMessagesFilterPinned;