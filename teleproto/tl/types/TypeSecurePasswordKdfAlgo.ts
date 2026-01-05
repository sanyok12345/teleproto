import { SecurePasswordKdfAlgoUnknown } from "./SecurePasswordKdfAlgoUnknown";
import { SecurePasswordKdfAlgoPBKDF2HMACSHA512iter100000 } from "./SecurePasswordKdfAlgoPBKDF2HMACSHA512iter100000";
import { SecurePasswordKdfAlgoSHA512 } from "./SecurePasswordKdfAlgoSHA512";

export type TypeSecurePasswordKdfAlgo = SecurePasswordKdfAlgoUnknown | SecurePasswordKdfAlgoPBKDF2HMACSHA512iter100000 | SecurePasswordKdfAlgoSHA512;