import { ResetPasswordFailedWait } from "./ResetPasswordFailedWait";
import { ResetPasswordRequestedWait } from "./ResetPasswordRequestedWait";
import { ResetPasswordOk } from "./ResetPasswordOk";

export type TypeResetPasswordResult = ResetPasswordFailedWait | ResetPasswordRequestedWait | ResetPasswordOk;