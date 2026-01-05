import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class UpdatePinnedMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3534419948;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.UpdatePinnedMessage";
    static classType = "request";

    flags?: number;
    silent?: boolean;
    unpin?: boolean;
    pmOneside?: boolean;
    peer?: EntityLike;
    id?: number;

    constructor(args: { flags?: number, silent?: boolean, unpin?: boolean, pmOneside?: boolean, peer?: EntityLike, id?: number } = {}) {
        super();
        this.flags = args.flags;
        this.silent = args.silent;
        this.unpin = args.unpin;
        this.pmOneside = args.pmOneside;
        this.peer = args.peer;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3534419948, false);
        let flags = 0;
        if (this.silent) { flags |= 1 << 0; }
        if (this.unpin) { flags |= 1 << 1; }
        if (this.pmOneside) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.silent !== undefined && this.silent !== null) {
        }
        if (this.unpin !== undefined && this.unpin !== null) {
        }
        if (this.pmOneside !== undefined && this.pmOneside !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdatePinnedMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        if (args.flags & (1 << 1)) {
            const _unpin = true;
            args.unpin = _unpin;
        } else {
            args.unpin = false;
        }
        if (args.flags & (1 << 2)) {
            const _pmOneside = true;
            args.pmOneside = _pmOneside;
        } else {
            args.pmOneside = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        return new UpdatePinnedMessage(args);
    }
}