import type { CtrState } from "cifrante";
import { aes } from "cifrante";
import { asBuffer } from "../Helpers";

export class CTR {
    private readonly state: CtrState;

    constructor(key: Buffer, iv: Buffer) {
        if (!Buffer.isBuffer(key) || !Buffer.isBuffer(iv) || iv.length !== 16) {
            throw new Error("Key and iv need to be a buffer");
        }

        this.state = aes.ctr(key).create({ iv });
    }

    encrypt(data: Uint8Array): Buffer {
        return asBuffer(this.state.update(data));
    }
}
