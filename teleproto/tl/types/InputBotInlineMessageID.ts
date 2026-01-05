import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputBotInlineMessageID extends TLObject {
    static CONSTRUCTOR_ID = 2299280777;
    static SUBCLASS_OF_ID = 768434944;
    static className = "InputBotInlineMessageID";
    static classType = "constructor";

    dcId!: number;
    id!: bigint;
    accessHash!: bigint;

    constructor(args: { dcId?: number, id?: bigint, accessHash?: bigint } = {}) {
        super();
        this.dcId = args.dcId!;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2299280777, false);
        writer.writeInt(this.dcId);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineMessageID {
        const args: any = {};
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        return new InputBotInlineMessageID(args);
    }
}