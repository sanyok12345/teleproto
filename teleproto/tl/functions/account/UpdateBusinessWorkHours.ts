import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBusinessWorkHours } from "../../types/TypeBusinessWorkHours";

export class UpdateBusinessWorkHours extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1258348646;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateBusinessWorkHours";
    static classType = "request";

    flags?: number;
    businessWorkHours?: TypeBusinessWorkHours;

    constructor(args: { flags?: number, businessWorkHours?: TypeBusinessWorkHours } = {}) {
        super();
        this.flags = args.flags;
        this.businessWorkHours = args.businessWorkHours;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1258348646, false);
        let flags = 0;
        if (this.businessWorkHours !== undefined && this.businessWorkHours !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.businessWorkHours !== undefined && this.businessWorkHours !== null) {
            writer.write(this.businessWorkHours.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateBusinessWorkHours {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _businessWorkHours = reader.tgReadObject();
            args.businessWorkHours = _businessWorkHours;
        } else {
            args.businessWorkHours = undefined;
        }
        return new UpdateBusinessWorkHours(args);
    }
}