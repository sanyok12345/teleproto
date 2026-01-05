import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PeerUser extends TLObject {
    static CONSTRUCTOR_ID = 1498486562;
    static SUBCLASS_OF_ID = 47470215;
    static className = "PeerUser";
    static classType = "constructor";

    userId!: bigint;

    constructor(args: { userId?: bigint } = {}) {
        super();
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1498486562, false);
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerUser {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new PeerUser(args);
    }
}