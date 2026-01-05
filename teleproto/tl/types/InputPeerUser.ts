import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPeerUser extends TLObject {
    static CONSTRUCTOR_ID = 3723011404;
    static SUBCLASS_OF_ID = 3374092470;
    static className = "InputPeerUser";
    static classType = "constructor";

    userId!: bigint;
    accessHash!: bigint;

    constructor(args: { userId?: bigint, accessHash?: bigint } = {}) {
        super();
        this.userId = args.userId!;
        this.accessHash = args.accessHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3723011404, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeLargeInt(this.accessHash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerUser {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        return new InputPeerUser(args);
    }
}