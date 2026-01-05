import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeSavedDialogs } from "../../types/messages/TypeSavedDialogs";

export class GetSavedDialogsByID extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1869585558;
    static SUBCLASS_OF_ID = 1632352382;
    static className = "messages.GetSavedDialogsByID";
    static classType = "request";

    flags?: number;
    parentPeer?: EntityLike;
    ids!: EntityLike[];

    constructor(args: { flags?: number, parentPeer?: EntityLike, ids?: EntityLike[] } = {}) {
        super();
        this.flags = args.flags;
        this.parentPeer = args.parentPeer;
        this.ids = args.ids!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1869585558, false);
        let flags = 0;
        if (this.parentPeer !== undefined && this.parentPeer !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.parentPeer !== undefined && this.parentPeer !== null) {
            writer.write((this.parentPeer as any).getBytes());
        }
        writer.writeVector(this.ids, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedDialogs {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSavedDialogsByID {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _parentPeer = reader.tgReadObject();
            args.parentPeer = _parentPeer;
        } else {
            args.parentPeer = undefined;
        }
        const _ids = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.ids = _ids;
        return new GetSavedDialogsByID(args);
    }
}