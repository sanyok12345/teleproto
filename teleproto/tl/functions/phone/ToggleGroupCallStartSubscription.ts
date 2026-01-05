import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleGroupCallStartSubscription extends MTProtoRequest {
    static CONSTRUCTOR_ID = 563885286;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.ToggleGroupCallStartSubscription";
    static classType = "request";

    call!: TypeInputGroupCall;
    subscribed!: boolean;

    constructor(args: { call?: TypeInputGroupCall, subscribed?: boolean } = {}) {
        super();
        this.call = args.call!;
        this.subscribed = args.subscribed!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(563885286, false);
        writer.write(this.call.getBytes());
        writer.tgWriteBool(this.subscribed);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleGroupCallStartSubscription {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _subscribed = reader.tgReadBool();
        args.subscribed = _subscribed;
        return new ToggleGroupCallStartSubscription(args);
    }
}