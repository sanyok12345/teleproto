import { InputStorePaymentPremiumSubscription } from "./InputStorePaymentPremiumSubscription";
import { InputStorePaymentGiftPremium } from "./InputStorePaymentGiftPremium";
import { InputStorePaymentPremiumGiftCode } from "./InputStorePaymentPremiumGiftCode";
import { InputStorePaymentPremiumGiveaway } from "./InputStorePaymentPremiumGiveaway";
import { InputStorePaymentStarsTopup } from "./InputStorePaymentStarsTopup";
import { InputStorePaymentStarsGift } from "./InputStorePaymentStarsGift";
import { InputStorePaymentStarsGiveaway } from "./InputStorePaymentStarsGiveaway";
import { InputStorePaymentAuthCode } from "./InputStorePaymentAuthCode";

export type TypeInputStorePaymentPurpose = InputStorePaymentPremiumSubscription | InputStorePaymentGiftPremium | InputStorePaymentPremiumGiftCode | InputStorePaymentPremiumGiveaway | InputStorePaymentStarsTopup | InputStorePaymentStarsGift | InputStorePaymentStarsGiveaway | InputStorePaymentAuthCode;