import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSecureValueType } from "../../types/TypeSecureValueType";
import { TypeSecureValue } from "../../types/TypeSecureValue";

export class GetSecureValue extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1936088002;
    static SUBCLASS_OF_ID = 3895345441;
    static className = "account.GetSecureValue";
    static classType = "request";

    types!: TypeSecureValueType[];

    constructor(args: { types?: TypeSecureValueType[] } = {}) {
        super();
        this.types = args.types!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1936088002, false);
        writer.writeVector(this.types, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSecureValue[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSecureValue {
        const args: any = {};
        const _types = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.types = _types;
        return new GetSecureValue(args);
    }
}