import { MTProtoPlainSender } from "./MTProtoPlainSender";
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
} from "../Helpers";
import { Api } from "../tl";
import { SecurityError } from "../errors";
import { Factorizator } from "../crypto/Factorizator";
import { _serverKeys } from "../crypto/RSA";
import { IGE } from "../crypto/IGE";
import bigInt from "big-integer";
import { BinaryReader } from "../extensions";
import { AuthKey } from "../crypto/AuthKey";

const RETRIES = 20;

export interface TempKeyParams {
    expiresIn: number;
    dc: number;
}

export async function doAuthentication(
    sender: MTProtoPlainSender,
    log: any,
    temp?: TempKeyParams
) {
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
        const aesEncrypted = ige.encryptIge(dataWithHash);
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
    const reader = new BinaryReader(plainTextAnswer);
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
    const dhPrime = readBigIntFromBuffer(serverDhInner.dhPrime, false, false);
    const ga = readBigIntFromBuffer(serverDhInner.gA, false, false);
    const timeOffset =
        serverDhInner.serverTime - Math.floor(new Date().getTime() / 1000);
    const b = readBigIntFromBuffer(generateRandomBytes(256), false, false);
    const gb = modExp(bigInt(serverDhInner.g), b, dhPrime);
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

    // @ts-ignore
    const dhHash = dhGen[`newNonceHash${nonceNumber}`];

    if (dhHash.neq(newNonceHash)) {
        throw new SecurityError("Invalid new nonce hash");
    }

    if (!(dhGen instanceof Api.DhGenOk)) {
        throw new Error(`Answer was ${dhGen}`);
    }
    log.debug("Finished authKey generation");

    return { authKey, timeOffset };
}
