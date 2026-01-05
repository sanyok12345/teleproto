import { SentCode } from "./SentCode";
import { SentCodeSuccess } from "./SentCodeSuccess";
import { SentCodePaymentRequired } from "./SentCodePaymentRequired";

export type TypeSentCode = SentCode | SentCodeSuccess | SentCodePaymentRequired;