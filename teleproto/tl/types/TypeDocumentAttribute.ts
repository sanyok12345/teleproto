import { DocumentAttributeImageSize } from "./DocumentAttributeImageSize";
import { DocumentAttributeAnimated } from "./DocumentAttributeAnimated";
import { DocumentAttributeSticker } from "./DocumentAttributeSticker";
import { DocumentAttributeVideo } from "./DocumentAttributeVideo";
import { DocumentAttributeAudio } from "./DocumentAttributeAudio";
import { DocumentAttributeFilename } from "./DocumentAttributeFilename";
import { DocumentAttributeHasStickers } from "./DocumentAttributeHasStickers";
import { DocumentAttributeCustomEmoji } from "./DocumentAttributeCustomEmoji";

export type TypeDocumentAttribute = DocumentAttributeImageSize | DocumentAttributeAnimated | DocumentAttributeSticker | DocumentAttributeVideo | DocumentAttributeAudio | DocumentAttributeFilename | DocumentAttributeHasStickers | DocumentAttributeCustomEmoji;