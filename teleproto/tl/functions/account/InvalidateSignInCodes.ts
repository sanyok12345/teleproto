import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class InvalidateSignInCodes extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3398101178;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.InvalidateSignInCodes";
    static classType = "request";

    codes!: string[];

    constructor(args: { codes?: string[] } = {}) {
        super();
        this.codes = args.codes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3398101178, false);
        writer.writeVector(this.codes, (item) => {
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

    static fromReader(reader: BinaryReader): InvalidateSignInCodes {
        const args: any = {};
        const _codes = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.codes = _codes;
        return new InvalidateSignInCodes(args);
    }
}