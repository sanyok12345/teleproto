import type { CtrState } from "cifrante";
import { aes } from "cifrante";
import { asBuffer } from "../Helpers";

export class CTR {
    private readonly state: CtrState;

    constructor(key: Buffer, iv: Buffer) {
        if (!Buffer.isBuffer(key) || !Buffer.isBuffer(iv) || iv.length !== 16) {
            throw new Error("Key and iv need to be a buffer");
        }

        const cipher = aes.ctr(key);
        this.state = cipher.create({ iv });
        cipher.dispose();
    }

    encrypt(data: Uint8Array): Buffer {
        return asBuffer(this.state.update(data));
    }

    encryptInPlace(data: Buffer): Buffer {
        this.state.update(data, data);
        return data;
    }

    dispose(): void {
        this.state.dispose();
    }
}
