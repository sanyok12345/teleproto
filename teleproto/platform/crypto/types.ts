import { Buffer } from "../buffer";

export type BinaryInput = Uint8Array | string;

export interface Hasher {
    update(data: BinaryInput): Hasher;
    digest(): Buffer;
}

export interface StreamCipher {
    update(data: Uint8Array): Buffer;
    final(): Buffer;
}

export interface IgeCipher {
    readonly backend: string;
    encrypt(data: Uint8Array, iv: Uint8Array, output?: Uint8Array): Buffer;
    decrypt(data: Uint8Array, iv: Uint8Array, output?: Uint8Array): Buffer;
    dispose(): void;
}

export interface CtrCipher {
    update(data: Uint8Array, output?: Uint8Array): Buffer;
    dispose(): void;
}

export interface RsaPublicKey {
    n: Buffer;
    e: Buffer;
}

export interface Factors {
    p: bigint;
    q: bigint;
}
