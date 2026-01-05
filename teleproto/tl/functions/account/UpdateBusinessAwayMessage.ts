import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBusinessAwayMessage } from "../../types/TypeInputBusinessAwayMessage";

export class UpdateBusinessAwayMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2724888485;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateBusinessAwayMessage";
    static classType = "request";

    flags?: number;
    message?: TypeInputBusinessAwayMessage;

    constructor(args: { flags?: number, message?: TypeInputBusinessAwayMessage } = {}) {
        super();
        this.flags = args.flags;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2724888485, false);
        let flags = 0;
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
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

    static fromReader(reader: BinaryReader): UpdateBusinessAwayMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new UpdateBusinessAwayMessage(args);
    }
}