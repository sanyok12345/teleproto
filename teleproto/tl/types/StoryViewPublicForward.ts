import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class StoryViewPublicForward extends TLObject {
    static CONSTRUCTOR_ID = 2424530699;
    static SUBCLASS_OF_ID = 898711459;
    static className = "StoryViewPublicForward";
    static classType = "constructor";

    flags!: number;
    blocked?: boolean;
    blockedMyStoriesFrom?: boolean;
    message!: TypeMessage;

    constructor(args: { flags?: number, blocked?: boolean, blockedMyStoriesFrom?: boolean, message?: TypeMessage } = {}) {
        super();
        this.flags = args.flags!;
        this.blocked = args.blocked;
        this.blockedMyStoriesFrom = args.blockedMyStoriesFrom;
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2424530699, false);
        let flags = 0;
        if (this.blocked) { flags |= 1 << 0; }
        if (this.blockedMyStoriesFrom) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.blocked !== undefined && this.blocked !== null) {
        }
        if (this.blockedMyStoriesFrom !== undefined && this.blockedMyStoriesFrom !== null) {
        }
        writer.write(this.message.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryViewPublicForward {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _blocked = true;
            args.blocked = _blocked;
        } else {
            args.blocked = false;
        }
        if (args.flags & (1 << 1)) {
            const _blockedMyStoriesFrom = true;
            args.blockedMyStoriesFrom = _blockedMyStoriesFrom;
        } else {
            args.blockedMyStoriesFrom = false;
        }
        const _message = reader.tgReadObject();
        args.message = _message;
        return new StoryViewPublicForward(args);
    }
}