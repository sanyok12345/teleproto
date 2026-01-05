import { InputInvoiceMessage } from "./InputInvoiceMessage";
import { InputInvoiceSlug } from "./InputInvoiceSlug";
import { InputInvoicePremiumGiftCode } from "./InputInvoicePremiumGiftCode";
import { InputInvoiceStars } from "./InputInvoiceStars";
import { InputInvoiceChatInviteSubscription } from "./InputInvoiceChatInviteSubscription";
import { InputInvoiceStarGift } from "./InputInvoiceStarGift";
import { InputInvoiceStarGiftUpgrade } from "./InputInvoiceStarGiftUpgrade";
import { InputInvoiceStarGiftTransfer } from "./InputInvoiceStarGiftTransfer";
import { InputInvoicePremiumGiftStars } from "./InputInvoicePremiumGiftStars";
import { InputInvoiceBusinessBotTransferStars } from "./InputInvoiceBusinessBotTransferStars";
import { InputInvoiceStarGiftResale } from "./InputInvoiceStarGiftResale";
import { InputInvoiceStarGiftPrepaidUpgrade } from "./InputInvoiceStarGiftPrepaidUpgrade";
import { InputInvoicePremiumAuthCode } from "./InputInvoicePremiumAuthCode";
import { InputInvoiceStarGiftDropOriginalDetails } from "./InputInvoiceStarGiftDropOriginalDetails";
import { InputInvoiceStarGiftAuctionBid } from "./InputInvoiceStarGiftAuctionBid";

export type TypeInputInvoice = InputInvoiceMessage | InputInvoiceSlug | InputInvoicePremiumGiftCode | InputInvoiceStars | InputInvoiceChatInviteSubscription | InputInvoiceStarGift | InputInvoiceStarGiftUpgrade | InputInvoiceStarGiftTransfer | InputInvoicePremiumGiftStars | InputInvoiceBusinessBotTransferStars | InputInvoiceStarGiftResale | InputInvoiceStarGiftPrepaidUpgrade | InputInvoicePremiumAuthCode | InputInvoiceStarGiftDropOriginalDetails | InputInvoiceStarGiftAuctionBid;