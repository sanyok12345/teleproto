import bigInt from "big-integer";
import { crypto } from "../platform";

function toNative(value: bigInt.BigInteger): bigint {
    return BigInt(value.toString());
}

function fromNative(value: bigint): bigInt.BigInteger {
    return bigInt(value.toString());
}

export class Factorizator {
    static gcd(a: bigInt.BigInteger, b: bigInt.BigInteger) {
        return fromNative(crypto.gcd(toNative(a), toNative(b)));
    }

    static factorize(pq: bigInt.BigInteger) {
        const { p, q } = crypto.factor(toNative(pq));
        return p < q
            ? { p: fromNative(p), q: fromNative(q) }
            : { p: fromNative(q), q: fromNative(p) };
    }
}
