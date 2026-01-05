import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePeerColors } from "../../types/help/TypePeerColors";

export class GetPeerColors extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3665884207;
    static SUBCLASS_OF_ID = 239036211;
    static className = "help.GetPeerColors";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3665884207, false);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePeerColors {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPeerColors {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetPeerColors(args);
    }
}