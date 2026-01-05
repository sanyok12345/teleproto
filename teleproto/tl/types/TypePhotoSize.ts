import { PhotoSizeEmpty } from "./PhotoSizeEmpty";
import { PhotoSize } from "./PhotoSize";
import { PhotoCachedSize } from "./PhotoCachedSize";
import { PhotoStrippedSize } from "./PhotoStrippedSize";
import { PhotoSizeProgressive } from "./PhotoSizeProgressive";
import { PhotoPathSize } from "./PhotoPathSize";

export type TypePhotoSize = PhotoSizeEmpty | PhotoSize | PhotoCachedSize | PhotoStrippedSize | PhotoSizeProgressive | PhotoPathSize;