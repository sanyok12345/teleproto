import { SecureValueTypePersonalDetails } from "./SecureValueTypePersonalDetails";
import { SecureValueTypePassport } from "./SecureValueTypePassport";
import { SecureValueTypeDriverLicense } from "./SecureValueTypeDriverLicense";
import { SecureValueTypeIdentityCard } from "./SecureValueTypeIdentityCard";
import { SecureValueTypeInternalPassport } from "./SecureValueTypeInternalPassport";
import { SecureValueTypeAddress } from "./SecureValueTypeAddress";
import { SecureValueTypeUtilityBill } from "./SecureValueTypeUtilityBill";
import { SecureValueTypeBankStatement } from "./SecureValueTypeBankStatement";
import { SecureValueTypeRentalAgreement } from "./SecureValueTypeRentalAgreement";
import { SecureValueTypePassportRegistration } from "./SecureValueTypePassportRegistration";
import { SecureValueTypeTemporaryRegistration } from "./SecureValueTypeTemporaryRegistration";
import { SecureValueTypePhone } from "./SecureValueTypePhone";
import { SecureValueTypeEmail } from "./SecureValueTypeEmail";

export type TypeSecureValueType = SecureValueTypePersonalDetails | SecureValueTypePassport | SecureValueTypeDriverLicense | SecureValueTypeIdentityCard | SecureValueTypeInternalPassport | SecureValueTypeAddress | SecureValueTypeUtilityBill | SecureValueTypeBankStatement | SecureValueTypeRentalAgreement | SecureValueTypePassportRegistration | SecureValueTypeTemporaryRegistration | SecureValueTypePhone | SecureValueTypeEmail;