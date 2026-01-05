import { TlsBlockString } from "./TlsBlockString";
import { TlsBlockRandom } from "./TlsBlockRandom";
import { TlsBlockZero } from "./TlsBlockZero";
import { TlsBlockDomain } from "./TlsBlockDomain";
import { TlsBlockGrease } from "./TlsBlockGrease";
import { TlsBlockPublicKey } from "./TlsBlockPublicKey";
import { TlsBlockScope } from "./TlsBlockScope";
import { TlsBlockPermutation } from "./TlsBlockPermutation";
import { TlsBlockM } from "./TlsBlockM";
import { TlsBlockE } from "./TlsBlockE";
import { TlsBlockPadding } from "./TlsBlockPadding";

export type TypeTlsBlock = TlsBlockString | TlsBlockRandom | TlsBlockZero | TlsBlockDomain | TlsBlockGrease | TlsBlockPublicKey | TlsBlockScope | TlsBlockPermutation | TlsBlockM | TlsBlockE | TlsBlockPadding;