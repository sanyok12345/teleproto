import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStoriesStealthMode } from "../TypeStoriesStealthMode";

export class AllStoriesNotModified extends TLObject {
    static CONSTRUCTOR_ID = 291044926;
    static SUBCLASS_OF_ID = 2120274125;
    static className = "stories.AllStoriesNotModified";
    static classType = "constructor";

    flags!: number;
    state!: string;
    stealthMode!: TypeStoriesStealthMode;

    constructor(args: { flags?: number, state?: string, stealthMode?: TypeStoriesStealthMode } = {}) {
        super();
        this.flags = args.flags!;
        this.state = args.state!;
        this.stealthMode = args.stealthMode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(291044926, false);
        let flags = 0;
        writer.writeInt(flags, false);
        writer.tgWriteString(this.state);
        writer.write(this.stealthMode.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AllStoriesNotModified {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _state = reader.tgReadString();
        args.state = _state;
        const _stealthMode = reader.tgReadObject();
        args.stealthMode = _stealthMode;
        return new AllStoriesNotModified(args);
    }
}