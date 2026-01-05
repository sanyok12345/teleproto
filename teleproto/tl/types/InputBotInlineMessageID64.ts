import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputBotInlineMessageID64 extends TLObject {
    static CONSTRUCTOR_ID = 3067680215;
    static SUBCLASS_OF_ID = 768434944;
    static className = "InputBotInlineMessageID64";
    static classType = "constructor";

    dcId!: number;
    ownerId!: bigint;
    id!: number;
    accessHash!: bigint;

    constructor(args: { dcId?: number, ownerId?: bigint, id?: number, accessHash?: bigint } = {}) {
        super();
        this.dcId = args.dcId!;
        this.ownerId = args.ownerId!;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3067680215, false);
        writer.writeInt(this.dcId);
        writer.writeLargeInt(this.ownerId, 64);
        writer.writeInt(this.id);
        writer.writeLargeInt(this.accessHash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineMessageID64 {
        const args: any = {};
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _ownerId = reader.readLargeInt(64);
        args.ownerId = _ownerId;
        const _id = reader.readInt();
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        return new InputBotInlineMessageID64(args);
    }
}