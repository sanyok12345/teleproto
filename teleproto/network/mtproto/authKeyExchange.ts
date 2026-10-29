import type { PlainSender } from "./PlainSender";
import type { Logger } from "../../extensions/Logger";
import {
    bufferXor,
    generateKeyDataFromNonce,
    generateRandomBytes,
    getByteArray,
    modExp,
    readBigIntFromBuffer,
    readBufferFromBigInt,
    sha1,
    sha256,
    toSignedLittleBuffer,
} from "../../Helpers";
import { Api } from "../../tl";
import { SecurityError } from "../../errors";
import { Factorizator } from "../../crypto/Factorizator";
import { _serverKeys } from "../../crypto/RSA";
import { IGE } from "../../crypto/IGE";
import bigInt from "big-integer";
import { Reader } from "../../tl/binary/Reader";
import { AuthKey } from "../../crypto/AuthKey";
import { Buffer, crypto } from "../../platform";

const RETRIES = 20;

const DH_PRIME_BITS = 2048n;
const DH_VALUE_MARGIN = 1n << (DH_PRIME_BITS - 64n);
const DH_GENERATOR_RESIDUES: Record<number, [bigint, bigint[]]> = {
    2: [8n, [7n]],
    3: [3n, [2n]],
    4: [1n, [0n]],
    5: [5n, [1n, 4n]],
    6: [24n, [19n, 23n]],
    7: [7n, [3n, 5n, 6n]],
};
const knownSafePrimes = new Set<bigint>([
    BigInt(
        "0x" +
        "c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f" +
        "48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c37" +
        "20fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f64" +
        "2477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4" +
        "a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754" +
        "fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4" +
        "e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f" +
        "0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b"
    ),
]);

function bytesToBigInt(bytes: Buffer): bigint {
    return bytes.length ? BigInt("0x" + bytes.toString("hex")) : 0n;
}

export function isDhValueInRange(value: bigint, prime: bigint): boolean {
    return value > DH_VALUE_MARGIN && value < prime - DH_VALUE_MARGIN;
}

export function checkDhParams(prime: bigint, g: number, gA: bigint): void {
    if (prime >> (DH_PRIME_BITS - 1n) !== 1n) {
        throw new SecurityError("dh_prime is not a 2048-bit number");
    }
    const residues = DH_GENERATOR_RESIDUES[g];
    if (!residues || !residues[1].includes(prime % residues[0])) {
        throw new SecurityError(`g = ${g} does not generate a subgroup of prime order`);
    }
    if (!knownSafePrimes.has(prime)) {
        if (!crypto.isSafePrime(prime)) {
            throw new SecurityError("dh_prime is not a safe prime");
        }
        knownSafePrimes.add(prime);
    }
    if (!isDhValueInRange(gA, prime)) {
        throw new SecurityError("g_a is out of the allowed range");
    }
}

export interface TempKeyParams {
    expiresIn: number;
    dc: number;
}

export interface AuthKeyExchangeResult {
    authKey: AuthKey;
    timeOffset: number;
    serverSalt: bigInt.BigInteger;
}

export async function doAuthentication(
    sender: PlainSender,
    log: Logger,
    temp?: TempKeyParams
): Promise<AuthKeyExchangeResult> {
    let bytes = generateRandomBytes(16);

    const nonce = readBigIntFromBuffer(bytes, false, true);
    const resPQ = await sender.send(new Api.ReqPqMulti({ nonce }));
    log.debug("Starting authKey generation step 1");

    if (!(resPQ instanceof Api.ResPQ)) {
        throw new SecurityError(`Step 1 answer was ${resPQ}`);
    }
    if (resPQ.nonce.neq(nonce)) {
        throw new SecurityError("Step 1 invalid nonce from server");
    }
    const pq = readBigIntFromBuffer(resPQ.pq, false, true);
    log.debug("Finished authKey generation step 1");

    const { p, q } = Factorizator.factorize(pq);

    const pBuffer = getByteArray(p);
    const qBuffer = getByteArray(q);

    bytes = generateRandomBytes(32);
    const newNonce = readBigIntFromBuffer(bytes, true, true);
    const pqInnerData = (temp
        ? new Api.PQInnerDataTempDc({
              pq: getByteArray(pq),
              p: pBuffer,
              q: qBuffer,
              nonce: resPQ.nonce,
              serverNonce: resPQ.serverNonce,
              newNonce,
              dc: temp.dc,
              expiresIn: temp.expiresIn,
          })
        : new Api.PQInnerData({
              pq: getByteArray(pq),
              p: pBuffer,
              q: qBuffer,
              nonce: resPQ.nonce,
              serverNonce: resPQ.serverNonce,
              newNonce,
          })
    ).getBytes();
    if (pqInnerData.length > 144) {
        throw new SecurityError("Invalid nonce from server");
    }
    let targetFingerprint;
    let targetKey;
    for (const fingerprint of resPQ.serverPublicKeyFingerprints) {
        targetKey = _serverKeys.get(fingerprint.toString());
        if (targetKey !== undefined) {
            targetFingerprint = fingerprint;
            break;
        }
    }
    if (targetFingerprint === undefined || targetKey === undefined) {
        throw new SecurityError(
            "Could not find a valid key for fingerprints"
        );
    }

    const padding = generateRandomBytes(192 - pqInnerData.length);
    const dataWithPadding = Buffer.concat([pqInnerData, padding]);
    const dataPadReversed = Buffer.from(dataWithPadding).reverse();

    let encryptedData;
    for (let i = 0; i < RETRIES; i++) {
        const tempKey = generateRandomBytes(32);
        const shaDigestKeyWithData = await sha256(
            Buffer.concat([tempKey, dataWithPadding])
        );
        const dataWithHash = Buffer.concat([
            dataPadReversed,
            shaDigestKeyWithData,
        ]);

        const ige = new IGE(tempKey, Buffer.alloc(32));
        const aesEncrypted = ige.encryptIge(dataWithHash, dataWithHash);
        ige.dispose();
        const tempKeyXor = bufferXor(tempKey, await sha256(aesEncrypted));

        const keyAesEncrypted = Buffer.concat([tempKeyXor, aesEncrypted]);
        const keyAesEncryptedInt = readBigIntFromBuffer(
            keyAesEncrypted,
            false,
            false
        );
        if (keyAesEncryptedInt.greaterOrEquals(targetKey.n)) {
            log.debug("Aes key greater than RSA. retrying");
            continue;
        }
        const encryptedDataBuffer = modExp(
            keyAesEncryptedInt,
            bigInt(targetKey.e),
            targetKey.n
        );
        encryptedData = readBufferFromBigInt(
            encryptedDataBuffer,
            256,
            false,
            false
        );

        break;
    }
    if (encryptedData === undefined) {
        throw new SecurityError("Could create a secure encrypted key");
    }
    log.debug("Generated a secure aes encrypted data");

    const serverDhParams = await sender.send(
        new Api.ReqDHParams({
            nonce: resPQ.nonce,
            serverNonce: resPQ.serverNonce,
            p: pBuffer,
            q: qBuffer,
            publicKeyFingerprint: targetFingerprint,
            encryptedData,
        })
    );

    if (
        !(
            serverDhParams instanceof Api.ServerDHParamsOk ||
            serverDhParams instanceof Api.ServerDHParamsFail
        )
    ) {
        throw new Error(`Answer was ${serverDhParams}`);
    }
    if (serverDhParams.nonce.neq(resPQ.nonce)) {
        throw new SecurityError("Invalid nonce from server");
    }

    if (serverDhParams.serverNonce.neq(resPQ.serverNonce)) {
        throw new SecurityError("Invalid server nonce from server");
    }

    if (serverDhParams instanceof Api.ServerDHParamsFail) {
        const sh = await sha1(toSignedLittleBuffer(newNonce, 32).slice(4, 20));
        const nnh = readBigIntFromBuffer(sh, true, true);
        if (serverDhParams.newNonceHash.neq(nnh)) {
            throw new SecurityError("Invalid DH fail nonce from server");
        }
    }
    if (!(serverDhParams instanceof Api.ServerDHParamsOk)) {
        throw new Error(`Answer was ${serverDhParams}`);
    }
    log.debug("Finished authKey generation");
    log.debug("Starting authKey generation");

    const { key, iv } = await generateKeyDataFromNonce(
        resPQ.serverNonce,
        newNonce
    );
    if (serverDhParams.encryptedAnswer.length % 16 !== 0) {
        throw new SecurityError("AES block size mismatch");
    }
    const ige = new IGE(key, iv);
    const plainTextAnswer = ige.decryptIge(serverDhParams.encryptedAnswer);
    const reader = new Reader(plainTextAnswer);
    reader.read(20);
    const serverDhInner = reader.tgReadObject();
    if (!(serverDhInner instanceof Api.ServerDHInnerData)) {
        throw new Error(`Answer was ${serverDhInner}`);
    }

    if (serverDhInner.nonce.neq(resPQ.nonce)) {
        throw new SecurityError("Invalid nonce in encrypted answer");
    }
    if (serverDhInner.serverNonce.neq(resPQ.serverNonce)) {
        throw new SecurityError(
            "Invalid server nonce in encrypted answer"
        );
    }
    const prime = bytesToBigInt(serverDhInner.dhPrime);
    checkDhParams(prime, serverDhInner.g, bytesToBigInt(serverDhInner.gA));
    const dhPrime = readBigIntFromBuffer(serverDhInner.dhPrime, false, false);
    const ga = readBigIntFromBuffer(serverDhInner.gA, false, false);
    const timeOffset =
        serverDhInner.serverTime - Math.floor(new Date().getTime() / 1000);
    let b;
    let gb;
    do {
        b = readBigIntFromBuffer(generateRandomBytes(256), false, false);
        gb = modExp(bigInt(serverDhInner.g), b, dhPrime);
    } while (!isDhValueInRange(BigInt(gb.toString()), prime));
    const gab = modExp(ga, b, dhPrime);

    const clientDhInner = new Api.ClientDHInnerData({
        nonce: resPQ.nonce,
        serverNonce: resPQ.serverNonce,
        retryId: bigInt.zero,
        gB: getByteArray(gb, false),
    }).getBytes();

    const clientDdhInnerHashed = Buffer.concat([
        await sha1(clientDhInner),
        clientDhInner,
    ]);

    const clientDhEncrypted = ige.encryptIge(clientDdhInnerHashed);
    ige.dispose();
    const dhGen = await sender.send(
        new Api.SetClientDHParams({
            nonce: resPQ.nonce,
            serverNonce: resPQ.serverNonce,
            encryptedData: clientDhEncrypted,
        })
    );
    const nonceTypes = [Api.DhGenOk, Api.DhGenRetry, Api.DhGenFail];
    const nonceTypesString = ["DhGenOk", "DhGenRetry", "DhGenFail"];
    if (
        !(
            dhGen instanceof nonceTypes[0] ||
            dhGen instanceof nonceTypes[1] ||
            dhGen instanceof nonceTypes[2]
        )
    ) {
        throw new Error(`Answer was ${dhGen}`);
    }
    const { name } = dhGen.constructor;
    if (dhGen.nonce.neq(resPQ.nonce)) {
        throw new SecurityError(`Invalid ${name} nonce from server`);
    }
    if (dhGen.serverNonce.neq(resPQ.serverNonce)) {
        throw new SecurityError(
            `Invalid ${name} server nonce from server`
        );
    }
    const authKey = new AuthKey();
    await authKey.setKey(readBufferFromBigInt(gab, 256, false, false));

    const nonceNumber = 1 + nonceTypesString.indexOf(dhGen.className);

    const newNonceHash = await authKey.calcNewNonceHash(newNonce, nonceNumber);

    const dhHash =
        dhGen instanceof Api.DhGenOk
            ? dhGen.newNonceHash1
            : dhGen instanceof Api.DhGenRetry
              ? dhGen.newNonceHash2
              : dhGen.newNonceHash3;

    if (dhHash.neq(newNonceHash)) {
        throw new SecurityError("Invalid new nonce hash");
    }

    if (!(dhGen instanceof Api.DhGenOk)) {
        throw new Error(`Answer was ${dhGen}`);
    }
    log.debug("Finished authKey generation");

    const saltBytes = toSignedLittleBuffer(newNonce, 32).subarray(0, 8);
    const serverNonceBytes = toSignedLittleBuffer(resPQ.serverNonce, 16);
    for (let i = 0; i < 8; i++) saltBytes[i] ^= serverNonceBytes[i];
    const serverSalt = readBigIntFromBuffer(saltBytes, true, true);

    return { authKey, timeOffset, serverSalt };
}
