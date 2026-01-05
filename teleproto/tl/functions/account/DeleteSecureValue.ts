import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSecureValueType } from "../../types/TypeSecureValueType";

export class DeleteSecureValue extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3095444555;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.DeleteSecureValue";
    static classType = "request";

    types!: TypeSecureValueType[];

    constructor(args: { types?: TypeSecureValueType[] } = {}) {
        super();
        this.types = args.types!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3095444555, false);
        writer.writeVector(this.types, (item) => {
            writer.write(item.getBytes());
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

    static fromReader(reader: BinaryReader): DeleteSecureValue {
        const args: any = {};
        const _types = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.types = _types;
        return new DeleteSecureValue(args);
    }
}