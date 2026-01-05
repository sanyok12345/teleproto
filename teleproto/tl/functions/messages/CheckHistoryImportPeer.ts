import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeCheckedHistoryImportPeer } from "../../types/messages/TypeCheckedHistoryImportPeer";

export class CheckHistoryImportPeer extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1573261059;
    static SUBCLASS_OF_ID = 3091968823;
    static className = "messages.CheckHistoryImportPeer";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1573261059, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeCheckedHistoryImportPeer {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckHistoryImportPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new CheckHistoryImportPeer(args);
    }
}