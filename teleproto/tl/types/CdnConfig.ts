import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeCdnPublicKey } from "./TypeCdnPublicKey";

export class CdnConfig extends TLObject {
    static CONSTRUCTOR_ID = 1462101002;
    static SUBCLASS_OF_ID = 3973724540;
    static className = "CdnConfig";
    static classType = "constructor";

    publicKeys!: TypeCdnPublicKey[];

    constructor(args: { publicKeys?: TypeCdnPublicKey[] } = {}) {
        super();
        this.publicKeys = args.publicKeys!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1462101002, false);
        writer.writeVector(this.publicKeys, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CdnConfig {
        const args: any = {};
        const _publicKeys = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.publicKeys = _publicKeys;
        return new CdnConfig(args);
    }
}