import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeTextWithEntities } from "../../types/TypeTextWithEntities";

export class SummarizeText extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2638284002;
    static SUBCLASS_OF_ID = 2513062661;
    static className = "messages.SummarizeText";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    id?: number;
    toLang?: string;

    constructor(args: { flags?: number, peer?: EntityLike, id?: number, toLang?: string } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.id = args.id;
        this.toLang = args.toLang;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2638284002, false);
        let flags = 0;
        if (this.toLang !== undefined && this.toLang !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        if (this.toLang !== undefined && this.toLang !== null) {
            writer.tgWriteString(this.toLang);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTextWithEntities {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SummarizeText {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _toLang = reader.tgReadString();
            args.toLang = _toLang;
        } else {
            args.toLang = undefined;
        }
        return new SummarizeText(args);
    }
}