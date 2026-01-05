import { CodeTypeSms } from "./CodeTypeSms";
import { CodeTypeCall } from "./CodeTypeCall";
import { CodeTypeFlashCall } from "./CodeTypeFlashCall";
import { CodeTypeMissedCall } from "./CodeTypeMissedCall";
import { CodeTypeFragmentSms } from "./CodeTypeFragmentSms";

export type TypeCodeType = CodeTypeSms | CodeTypeCall | CodeTypeFlashCall | CodeTypeMissedCall | CodeTypeFragmentSms;