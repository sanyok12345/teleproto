import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class HidePromoData extends MTProtoRequest {
    static CONSTRUCTOR_ID = 505748629;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "help.HidePromoData";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(505748629, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): HidePromoData {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new HidePromoData(args);
    }
}