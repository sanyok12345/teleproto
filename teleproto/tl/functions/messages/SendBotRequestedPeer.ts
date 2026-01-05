import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendBotRequestedPeer extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2444415072;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendBotRequestedPeer";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    buttonId!: number;
    requestedPeers!: EntityLike[];

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, buttonId?: number, requestedPeers?: EntityLike[] } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.buttonId = args.buttonId!;
        this.requestedPeers = args.requestedPeers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2444415072, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.writeInt(this.buttonId);
        writer.writeVector(this.requestedPeers, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendBotRequestedPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _buttonId = reader.readInt();
        args.buttonId = _buttonId;
        const _requestedPeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.requestedPeers = _requestedPeers;
        return new SendBotRequestedPeer(args);
    }
}