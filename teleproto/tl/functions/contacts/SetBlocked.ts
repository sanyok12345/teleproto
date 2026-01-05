import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class SetBlocked extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2496027766;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "contacts.SetBlocked";
    static classType = "request";

    flags?: number;
    myStoriesFrom?: boolean;
    id?: EntityLike[];
    limit!: number;

    constructor(args: { flags?: number, myStoriesFrom?: boolean, id?: EntityLike[], limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.myStoriesFrom = args.myStoriesFrom;
        this.id = args.id;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2496027766, false);
        let flags = 0;
        if (this.myStoriesFrom) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.myStoriesFrom !== undefined && this.myStoriesFrom !== null) {
        }
        writer.writeVector(this.id!, (item) => {
            writer.write((item as any).getBytes());
        });
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBlocked {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _myStoriesFrom = true;
            args.myStoriesFrom = _myStoriesFrom;
        } else {
            args.myStoriesFrom = false;
        }
        const _id = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.id = _id;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new SetBlocked(args);
    }
}