import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputDialogPeer } from "../../types/TypeInputDialogPeer";

export class MarkDialogUnread extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2354054904;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.MarkDialogUnread";
    static classType = "request";

    flags?: number;
    unread?: boolean;
    parentPeer?: EntityLike;
    peer?: TypeInputDialogPeer;

    constructor(args: { flags?: number, unread?: boolean, parentPeer?: EntityLike, peer?: TypeInputDialogPeer } = {}) {
        super();
        this.flags = args.flags;
        this.unread = args.unread;
        this.parentPeer = args.parentPeer;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2354054904, false);
        let flags = 0;
        if (this.unread) { flags |= 1 << 0; }
        if (this.parentPeer !== undefined && this.parentPeer !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.unread !== undefined && this.unread !== null) {
        }
        if (this.parentPeer !== undefined && this.parentPeer !== null) {
            writer.write((this.parentPeer as any).getBytes());
        }
        writer.write(this.peer!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): MarkDialogUnread {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _unread = true;
            args.unread = _unread;
        } else {
            args.unread = false;
        }
        if (args.flags & (1 << 1)) {
            const _parentPeer = reader.tgReadObject();
            args.parentPeer = _parentPeer;
        } else {
            args.parentPeer = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new MarkDialogUnread(args);
    }
}