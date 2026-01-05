import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DeleteByPhones extends MTProtoRequest {
    static CONSTRUCTOR_ID = 269745566;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "contacts.DeleteByPhones";
    static classType = "request";

    phones!: string[];

    constructor(args: { phones?: string[] } = {}) {
        super();
        this.phones = args.phones!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(269745566, false);
        writer.writeVector(this.phones, (item) => {
            writer.tgWriteString(item);
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

    static fromReader(reader: BinaryReader): DeleteByPhones {
        const args: any = {};
        const _phones = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.phones = _phones;
        return new DeleteByPhones(args);
    }
}