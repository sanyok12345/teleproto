import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PopularContact extends TLObject {
    static CONSTRUCTOR_ID = 1558266229;
    static SUBCLASS_OF_ID = 67708250;
    static className = "PopularContact";
    static classType = "constructor";

    clientId!: bigint;
    importers!: number;

    constructor(args: { clientId?: bigint, importers?: number } = {}) {
        super();
        this.clientId = args.clientId!;
        this.importers = args.importers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1558266229, false);
        writer.writeLargeInt(this.clientId, 64);
        writer.writeInt(this.importers);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PopularContact {
        const args: any = {};
        const _clientId = reader.readLargeInt(64);
        args.clientId = _clientId;
        const _importers = reader.readInt();
        args.importers = _importers;
        return new PopularContact(args);
    }
}