import { PhoneCallEmpty } from "./PhoneCallEmpty";
import { PhoneCallWaiting } from "./PhoneCallWaiting";
import { PhoneCallRequested } from "./PhoneCallRequested";
import { PhoneCallAccepted } from "./PhoneCallAccepted";
import { PhoneCall } from "./PhoneCall";
import { PhoneCallDiscarded } from "./PhoneCallDiscarded";

export type TypePhoneCall = PhoneCallEmpty | PhoneCallWaiting | PhoneCallRequested | PhoneCallAccepted | PhoneCall | PhoneCallDiscarded;