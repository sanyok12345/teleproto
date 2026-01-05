import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeResPQ } from "../types/TypeResPQ";

export class ReqPq extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1615239032;
    static SUBCLASS_OF_ID = 2020181688;
    static className = "ReqPq";
    static classType = "request";

    nonce!: bigint;

    constructor(args: { nonce?: bigint } = {}) {
        super();
        this.nonce = args.nonce!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1615239032, false);
        writer.writeLargeInt(this.nonce, 128);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeResPQ {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReqPq {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        return new ReqPq(args);
    }
}