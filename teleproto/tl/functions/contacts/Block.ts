import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class Block extends MTProtoRequest {
    static CONSTRUCTOR_ID = 774801204;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "contacts.Block";
    static classType = "request";

    flags?: number;
    myStoriesFrom?: boolean;
    id?: EntityLike;

    constructor(args: { flags?: number, myStoriesFrom?: boolean, id?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.myStoriesFrom = args.myStoriesFrom;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(774801204, false);
        let flags = 0;
        if (this.myStoriesFrom) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.myStoriesFrom !== undefined && this.myStoriesFrom !== null) {
        }
        writer.write((this.id! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): Block {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _myStoriesFrom = true;
            args.myStoriesFrom = _myStoriesFrom;
        } else {
            args.myStoriesFrom = false;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        return new Block(args);
    }
}