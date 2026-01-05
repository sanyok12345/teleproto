import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeDialogPeer } from "../../types/TypeDialogPeer";

export class GetDialogUnreadMarks extends MTProtoRequest {
    static CONSTRUCTOR_ID = 555754018;
    static SUBCLASS_OF_ID = 3200666329;
    static className = "messages.GetDialogUnreadMarks";
    static classType = "request";

    flags?: number;
    parentPeer?: EntityLike;

    constructor(args: { flags?: number, parentPeer?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.parentPeer = args.parentPeer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(555754018, false);
        let flags = 0;
        if (this.parentPeer !== undefined && this.parentPeer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.parentPeer !== undefined && this.parentPeer !== null) {
            writer.write((this.parentPeer as any).getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDialogPeer[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDialogUnreadMarks {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _parentPeer = reader.tgReadObject();
            args.parentPeer = _parentPeer;
        } else {
            args.parentPeer = undefined;
        }
        return new GetDialogUnreadMarks(args);
    }
}