import { SentCodeTypeApp } from "./SentCodeTypeApp";
import { SentCodeTypeSms } from "./SentCodeTypeSms";
import { SentCodeTypeCall } from "./SentCodeTypeCall";
import { SentCodeTypeFlashCall } from "./SentCodeTypeFlashCall";
import { SentCodeTypeMissedCall } from "./SentCodeTypeMissedCall";
import { SentCodeTypeEmailCode } from "./SentCodeTypeEmailCode";
import { SentCodeTypeSetUpEmailRequired } from "./SentCodeTypeSetUpEmailRequired";
import { SentCodeTypeFragmentSms } from "./SentCodeTypeFragmentSms";
import { SentCodeTypeFirebaseSms } from "./SentCodeTypeFirebaseSms";
import { SentCodeTypeSmsWord } from "./SentCodeTypeSmsWord";
import { SentCodeTypeSmsPhrase } from "./SentCodeTypeSmsPhrase";

export type TypeSentCodeType = SentCodeTypeApp | SentCodeTypeSms | SentCodeTypeCall | SentCodeTypeFlashCall | SentCodeTypeMissedCall | SentCodeTypeEmailCode | SentCodeTypeSetUpEmailRequired | SentCodeTypeFragmentSms | SentCodeTypeFirebaseSms | SentCodeTypeSmsWord | SentCodeTypeSmsPhrase;