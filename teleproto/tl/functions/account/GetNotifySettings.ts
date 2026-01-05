import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputNotifyPeer } from "../../types/TypeInputNotifyPeer";
import { TypePeerNotifySettings } from "../../types/TypePeerNotifySettings";

export class GetNotifySettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 313765169;
    static SUBCLASS_OF_ID = 3475030132;
    static className = "account.GetNotifySettings";
    static classType = "request";

    peer?: TypeInputNotifyPeer;

    constructor(args: { peer?: TypeInputNotifyPeer } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(313765169, false);
        writer.write(this.peer!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePeerNotifySettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetNotifySettings {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetNotifySettings(args);
    }
}