import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeSecureValueError } from "../../types/TypeSecureValueError";

export class SetSecureValueErrors extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2429064373;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "users.SetSecureValueErrors";
    static classType = "request";

    id?: EntityLike;
    errors!: TypeSecureValueError[];

    constructor(args: { id?: EntityLike, errors?: TypeSecureValueError[] } = {}) {
        super();
        this.id = args.id;
        this.errors = args.errors!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2429064373, false);
        writer.write((this.id! as any).getBytes());
        writer.writeVector(this.errors, (item) => {
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

    static fromReader(reader: BinaryReader): SetSecureValueErrors {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _errors = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.errors = _errors;
        return new SetSecureValueErrors(args);
    }
}