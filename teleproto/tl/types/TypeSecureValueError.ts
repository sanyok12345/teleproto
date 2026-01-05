import { SecureValueErrorData } from "./SecureValueErrorData";
import { SecureValueErrorFrontSide } from "./SecureValueErrorFrontSide";
import { SecureValueErrorReverseSide } from "./SecureValueErrorReverseSide";
import { SecureValueErrorSelfie } from "./SecureValueErrorSelfie";
import { SecureValueErrorFile } from "./SecureValueErrorFile";
import { SecureValueErrorFiles } from "./SecureValueErrorFiles";
import { SecureValueError } from "./SecureValueError";
import { SecureValueErrorTranslationFile } from "./SecureValueErrorTranslationFile";
import { SecureValueErrorTranslationFiles } from "./SecureValueErrorTranslationFiles";

export type TypeSecureValueError = SecureValueErrorData | SecureValueErrorFrontSide | SecureValueErrorReverseSide | SecureValueErrorSelfie | SecureValueErrorFile | SecureValueErrorFiles | SecureValueError | SecureValueErrorTranslationFile | SecureValueErrorTranslationFiles;