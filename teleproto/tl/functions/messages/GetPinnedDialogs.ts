import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePeerDialogs } from "../../types/messages/TypePeerDialogs";

export class GetPinnedDialogs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3602468338;
    static SUBCLASS_OF_ID = 986120498;
    static className = "messages.GetPinnedDialogs";
    static classType = "request";

    folderId!: number;

    constructor(args: { folderId?: number } = {}) {
        super();
        this.folderId = args.folderId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3602468338, false);
        writer.writeInt(this.folderId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePeerDialogs {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPinnedDialogs {
        const args: any = {};
        const _folderId = reader.readInt();
        args.folderId = _folderId;
        return new GetPinnedDialogs(args);
    }
}