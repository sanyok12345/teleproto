import { InputPaymentCredentialsSaved } from "./InputPaymentCredentialsSaved";
import { InputPaymentCredentials } from "./InputPaymentCredentials";
import { InputPaymentCredentialsApplePay } from "./InputPaymentCredentialsApplePay";
import { InputPaymentCredentialsGooglePay } from "./InputPaymentCredentialsGooglePay";

export type TypeInputPaymentCredentials = InputPaymentCredentialsSaved | InputPaymentCredentials | InputPaymentCredentialsApplePay | InputPaymentCredentialsGooglePay;