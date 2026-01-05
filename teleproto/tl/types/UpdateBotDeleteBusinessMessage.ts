import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateBotDeleteBusinessMessage extends TLObject {
    static CONSTRUCTOR_ID = 2687146030;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotDeleteBusinessMessage";
    static classType = "constructor";

    connectionId!: string;
    peer!: TypePeer;
    messages!: number[];
    qts!: number;

    constructor(args: { connectionId?: string, peer?: TypePeer, messages?: number[], qts?: number } = {}) {
        super();
        this.connectionId = args.connectionId!;
        this.peer = args.peer!;
        this.messages = args.messages!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2687146030, false);
        writer.tgWriteString(this.connectionId);
        writer.write(this.peer.getBytes());
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotDeleteBusinessMessage {
        const args: any = {};
        const _connectionId = reader.tgReadString();
        args.connectionId = _connectionId;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotDeleteBusinessMessage(args);
    }
}