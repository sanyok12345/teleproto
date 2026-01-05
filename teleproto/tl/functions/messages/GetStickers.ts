import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStickers } from "../../types/messages/TypeStickers";

export class GetStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3584414625;
    static SUBCLASS_OF_ID = 3611015646;
    static className = "messages.GetStickers";
    static classType = "request";

    emoticon!: string;
    hash?: bigint;

    constructor(args: { emoticon?: string, hash?: bigint } = {}) {
        super();
        this.emoticon = args.emoticon!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3584414625, false);
        writer.tgWriteString(this.emoticon);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStickers {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetStickers(args);
    }
}