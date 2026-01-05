import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeDestroySessionRes } from "../types/TypeDestroySessionRes";

export class DestroySession extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3880853798;
    static SUBCLASS_OF_ID = 2936858557;
    static className = "DestroySession";
    static classType = "request";

    sessionId!: bigint;

    constructor(args: { sessionId?: bigint } = {}) {
        super();
        this.sessionId = args.sessionId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3880853798, false);
        writer.writeLargeInt(this.sessionId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDestroySessionRes {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DestroySession {
        const args: any = {};
        const _sessionId = reader.readLargeInt(64);
        args.sessionId = _sessionId;
        return new DestroySession(args);
    }
}