import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";
import { TypeReaction } from "./TypeReaction";

export class MediaAreaSuggestedReaction extends TLObject {
    static CONSTRUCTOR_ID = 340088945;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "MediaAreaSuggestedReaction";
    static classType = "constructor";

    flags!: number;
    dark?: boolean;
    flipped?: boolean;
    coordinates!: TypeMediaAreaCoordinates;
    reaction!: TypeReaction;

    constructor(args: { flags?: number, dark?: boolean, flipped?: boolean, coordinates?: TypeMediaAreaCoordinates, reaction?: TypeReaction } = {}) {
        super();
        this.flags = args.flags!;
        this.dark = args.dark;
        this.flipped = args.flipped;
        this.coordinates = args.coordinates!;
        this.reaction = args.reaction!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(340088945, false);
        let flags = 0;
        if (this.dark) { flags |= 1 << 0; }
        if (this.flipped) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.dark !== undefined && this.dark !== null) {
        }
        if (this.flipped !== undefined && this.flipped !== null) {
        }
        writer.write(this.coordinates.getBytes());
        writer.write(this.reaction.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MediaAreaSuggestedReaction {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _dark = true;
            args.dark = _dark;
        } else {
            args.dark = false;
        }
        if (args.flags & (1 << 1)) {
            const _flipped = true;
            args.flipped = _flipped;
        } else {
            args.flipped = false;
        }
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        return new MediaAreaSuggestedReaction(args);
    }
}