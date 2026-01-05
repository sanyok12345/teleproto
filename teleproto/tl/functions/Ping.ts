import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypePong } from "../types/TypePong";

export class Ping extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2059302892;
    static SUBCLASS_OF_ID = 2171268721;
    static className = "Ping";
    static classType = "request";

    pingId!: bigint;

    constructor(args: { pingId?: bigint } = {}) {
        super();
        this.pingId = args.pingId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2059302892, false);
        writer.writeLargeInt(this.pingId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePong {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): Ping {
        const args: any = {};
        const _pingId = reader.readLargeInt(64);
        args.pingId = _pingId;
        return new Ping(args);
    }
}