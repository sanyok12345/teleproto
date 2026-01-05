import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class StoryFwdHeader extends TLObject {
    static CONSTRUCTOR_ID = 3089555792;
    static SUBCLASS_OF_ID = 2863706412;
    static className = "StoryFwdHeader";
    static classType = "constructor";

    flags!: number;
    modified?: boolean;
    from?: TypePeer;
    fromName?: string;
    storyId?: number;

    constructor(args: { flags?: number, modified?: boolean, from?: TypePeer, fromName?: string, storyId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.modified = args.modified;
        this.from = args.from;
        this.fromName = args.fromName;
        this.storyId = args.storyId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3089555792, false);
        let flags = 0;
        if (this.modified) { flags |= 1 << 3; }
        if (this.from !== undefined && this.from !== null) { flags |= 1 << 0; }
        if (this.fromName !== undefined && this.fromName !== null) { flags |= 1 << 1; }
        if (this.storyId !== undefined && this.storyId !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.modified !== undefined && this.modified !== null) {
        }
        if (this.from !== undefined && this.from !== null) {
            writer.write(this.from.getBytes());
        }
        if (this.fromName !== undefined && this.fromName !== null) {
            writer.tgWriteString(this.fromName);
        }
        if (this.storyId !== undefined && this.storyId !== null) {
            writer.writeInt(this.storyId);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryFwdHeader {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _modified = true;
            args.modified = _modified;
        } else {
            args.modified = false;
        }
        if (args.flags & (1 << 0)) {
            const _from = reader.tgReadObject();
            args.from = _from;
        } else {
            args.from = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _fromName = reader.tgReadString();
            args.fromName = _fromName;
        } else {
            args.fromName = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _storyId = reader.readInt();
            args.storyId = _storyId;
        } else {
            args.storyId = undefined;
        }
        return new StoryFwdHeader(args);
    }
}