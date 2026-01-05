import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class SetContactSignUpNotification extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3488890721;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SetContactSignUpNotification";
    static classType = "request";

    silent!: boolean;

    constructor(args: { silent?: boolean } = {}) {
        super();
        this.silent = args.silent!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3488890721, false);
        writer.tgWriteBool(this.silent);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetContactSignUpNotification {
        const args: any = {};
        const _silent = reader.tgReadBool();
        args.silent = _silent;
        return new SetContactSignUpNotification(args);
    }
}