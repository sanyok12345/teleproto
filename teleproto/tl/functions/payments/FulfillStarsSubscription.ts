import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class FulfillStarsSubscription extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3428576179;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.FulfillStarsSubscription";
    static classType = "request";

    peer?: EntityLike;
    subscriptionId!: string;

    constructor(args: { peer?: EntityLike, subscriptionId?: string } = {}) {
        super();
        this.peer = args.peer;
        this.subscriptionId = args.subscriptionId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3428576179, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.subscriptionId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): FulfillStarsSubscription {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _subscriptionId = reader.tgReadString();
        args.subscriptionId = _subscriptionId;
        return new FulfillStarsSubscription(args);
    }
}