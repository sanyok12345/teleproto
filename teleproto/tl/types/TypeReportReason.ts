import { InputReportReasonSpam } from "./InputReportReasonSpam";
import { InputReportReasonViolence } from "./InputReportReasonViolence";
import { InputReportReasonPornography } from "./InputReportReasonPornography";
import { InputReportReasonChildAbuse } from "./InputReportReasonChildAbuse";
import { InputReportReasonOther } from "./InputReportReasonOther";
import { InputReportReasonCopyright } from "./InputReportReasonCopyright";
import { InputReportReasonGeoIrrelevant } from "./InputReportReasonGeoIrrelevant";
import { InputReportReasonFake } from "./InputReportReasonFake";
import { InputReportReasonIllegalDrugs } from "./InputReportReasonIllegalDrugs";
import { InputReportReasonPersonalDetails } from "./InputReportReasonPersonalDetails";

export type TypeReportReason = InputReportReasonSpam | InputReportReasonViolence | InputReportReasonPornography | InputReportReasonChildAbuse | InputReportReasonOther | InputReportReasonCopyright | InputReportReasonGeoIrrelevant | InputReportReasonFake | InputReportReasonIllegalDrugs | InputReportReasonPersonalDetails;