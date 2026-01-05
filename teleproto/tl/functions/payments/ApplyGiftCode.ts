import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ApplyGiftCode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4142032980;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.ApplyGiftCode";
    static classType = "request";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4142032980, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ApplyGiftCode {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new ApplyGiftCode(args);
    }
}