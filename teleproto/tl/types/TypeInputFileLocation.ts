import { InputFileLocation } from "./InputFileLocation";
import { InputEncryptedFileLocation } from "./InputEncryptedFileLocation";
import { InputDocumentFileLocation } from "./InputDocumentFileLocation";
import { InputSecureFileLocation } from "./InputSecureFileLocation";
import { InputTakeoutFileLocation } from "./InputTakeoutFileLocation";
import { InputPhotoFileLocation } from "./InputPhotoFileLocation";
import { InputPhotoLegacyFileLocation } from "./InputPhotoLegacyFileLocation";
import { InputPeerPhotoFileLocation } from "./InputPeerPhotoFileLocation";
import { InputStickerSetThumb } from "./InputStickerSetThumb";
import { InputGroupCallStream } from "./InputGroupCallStream";

export type TypeInputFileLocation = InputFileLocation | InputEncryptedFileLocation | InputDocumentFileLocation | InputSecureFileLocation | InputTakeoutFileLocation | InputPhotoFileLocation | InputPhotoLegacyFileLocation | InputPeerPhotoFileLocation | InputStickerSetThumb | InputGroupCallStream;