import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ImportedContact extends TLObject {
    static CONSTRUCTOR_ID = 3242081360;
    static SUBCLASS_OF_ID = 3041246170;
    static className = "ImportedContact";
    static classType = "constructor";

    userId!: bigint;
    clientId!: bigint;

    constructor(args: { userId?: bigint, clientId?: bigint } = {}) {
        super();
        this.userId = args.userId!;
        this.clientId = args.clientId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3242081360, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeLargeInt(this.clientId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ImportedContact {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _clientId = reader.readLargeInt(64);
        args.clientId = _clientId;
        return new ImportedContact(args);
    }
}