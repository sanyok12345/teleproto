import { PhoneCallDiscardReasonMissed } from "./PhoneCallDiscardReasonMissed";
import { PhoneCallDiscardReasonDisconnect } from "./PhoneCallDiscardReasonDisconnect";
import { PhoneCallDiscardReasonHangup } from "./PhoneCallDiscardReasonHangup";
import { PhoneCallDiscardReasonBusy } from "./PhoneCallDiscardReasonBusy";
import { PhoneCallDiscardReasonMigrateConferenceCall } from "./PhoneCallDiscardReasonMigrateConferenceCall";

export type TypePhoneCallDiscardReason = PhoneCallDiscardReasonMissed | PhoneCallDiscardReasonDisconnect | PhoneCallDiscardReasonHangup | PhoneCallDiscardReasonBusy | PhoneCallDiscardReasonMigrateConferenceCall;