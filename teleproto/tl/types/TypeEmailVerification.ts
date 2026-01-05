import { EmailVerificationCode } from "./EmailVerificationCode";
import { EmailVerificationGoogle } from "./EmailVerificationGoogle";
import { EmailVerificationApple } from "./EmailVerificationApple";

export type TypeEmailVerification = EmailVerificationCode | EmailVerificationGoogle | EmailVerificationApple;