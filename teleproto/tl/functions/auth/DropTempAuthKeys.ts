import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DropTempAuthKeys extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2387124616;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "auth.DropTempAuthKeys";
    static classType = "request";

    exceptAuthKeys!: bigint[];

    constructor(args: { exceptAuthKeys?: bigint[] } = {}) {
        super();
        this.exceptAuthKeys = args.exceptAuthKeys!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2387124616, false);
        writer.writeVector(this.exceptAuthKeys, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DropTempAuthKeys {
        const args: any = {};
        const _exceptAuthKeys = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.exceptAuthKeys = _exceptAuthKeys;
        return new DropTempAuthKeys(args);
    }
}