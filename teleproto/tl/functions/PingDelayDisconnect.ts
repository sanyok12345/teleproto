import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypePong } from "../types/TypePong";

export class PingDelayDisconnect extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4081220492;
    static SUBCLASS_OF_ID = 2171268721;
    static className = "PingDelayDisconnect";
    static classType = "request";

    pingId!: bigint;
    disconnectDelay!: number;

    constructor(args: { pingId?: bigint, disconnectDelay?: number } = {}) {
        super();
        this.pingId = args.pingId!;
        this.disconnectDelay = args.disconnectDelay!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4081220492, false);
        writer.writeLargeInt(this.pingId, 64);
        writer.writeInt(this.disconnectDelay);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePong {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): PingDelayDisconnect {
        const args: any = {};
        const _pingId = reader.readLargeInt(64);
        args.pingId = _pingId;
        const _disconnectDelay = reader.readInt();
        args.disconnectDelay = _disconnectDelay;
        return new PingDelayDisconnect(args);
    }
}