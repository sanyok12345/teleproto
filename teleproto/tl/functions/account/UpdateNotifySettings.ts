import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputNotifyPeer } from "../../types/TypeInputNotifyPeer";
import { TypeInputPeerNotifySettings } from "../../types/TypeInputPeerNotifySettings";

export class UpdateNotifySettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2227067795;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateNotifySettings";
    static classType = "request";

    peer?: TypeInputNotifyPeer;
    settings!: TypeInputPeerNotifySettings;

    constructor(args: { peer?: TypeInputNotifyPeer, settings?: TypeInputPeerNotifySettings } = {}) {
        super();
        this.peer = args.peer;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2227067795, false);
        writer.write(this.peer!.getBytes());
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateNotifySettings {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new UpdateNotifySettings(args);
    }
}