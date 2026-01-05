import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class SaveDefaultGroupCallJoinAs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1465786252;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "phone.SaveDefaultGroupCallJoinAs";
    static classType = "request";

    peer?: EntityLike;
    joinAs!: EntityLike;

    constructor(args: { peer?: EntityLike, joinAs?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
        this.joinAs = args.joinAs!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1465786252, false);
        writer.write((this.peer! as any).getBytes());
        writer.write((this.joinAs as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveDefaultGroupCallJoinAs {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _joinAs = reader.tgReadObject();
        args.joinAs = _joinAs;
        return new SaveDefaultGroupCallJoinAs(args);
    }
}