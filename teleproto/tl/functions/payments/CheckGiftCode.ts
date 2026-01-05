import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeCheckedGiftCode } from "../../types/payments/TypeCheckedGiftCode";

export class CheckGiftCode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2387719361;
    static SUBCLASS_OF_ID = 1529452520;
    static className = "payments.CheckGiftCode";
    static classType = "request";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2387719361, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeCheckedGiftCode {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckGiftCode {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new CheckGiftCode(args);
    }
}