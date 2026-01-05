import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBusinessGreetingMessage } from "../../types/TypeInputBusinessGreetingMessage";

export class UpdateBusinessGreetingMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1724755908;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateBusinessGreetingMessage";
    static classType = "request";

    flags?: number;
    message?: TypeInputBusinessGreetingMessage;

    constructor(args: { flags?: number, message?: TypeInputBusinessGreetingMessage } = {}) {
        super();
        this.flags = args.flags;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1724755908, false);
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

    static fromReader(reader: BinaryReader): UpdateBusinessGreetingMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new UpdateBusinessGreetingMessage(args);
    }
}