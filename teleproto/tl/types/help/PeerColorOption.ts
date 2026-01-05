import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeerColorSet } from "../help/TypePeerColorSet";

export class PeerColorOption extends TLObject {
    static CONSTRUCTOR_ID = 2917953214;
    static SUBCLASS_OF_ID = 1454943896;
    static className = "help.PeerColorOption";
    static classType = "constructor";

    flags!: number;
    hidden?: boolean;
    colorId!: number;
    colors?: TypePeerColorSet;
    darkColors?: TypePeerColorSet;
    channelMinLevel?: number;
    groupMinLevel?: number;

    constructor(args: { flags?: number, hidden?: boolean, colorId?: number, colors?: TypePeerColorSet, darkColors?: TypePeerColorSet, channelMinLevel?: number, groupMinLevel?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.hidden = args.hidden;
        this.colorId = args.colorId!;
        this.colors = args.colors;
        this.darkColors = args.darkColors;
        this.channelMinLevel = args.channelMinLevel;
        this.groupMinLevel = args.groupMinLevel;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2917953214, false);
        let flags = 0;
        if (this.hidden) { flags |= 1 << 0; }
        if (this.colors !== undefined && this.colors !== null) { flags |= 1 << 1; }
        if (this.darkColors !== undefined && this.darkColors !== null) { flags |= 1 << 2; }
        if (this.channelMinLevel !== undefined && this.channelMinLevel !== null) { flags |= 1 << 3; }
        if (this.groupMinLevel !== undefined && this.groupMinLevel !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.hidden !== undefined && this.hidden !== null) {
        }
        writer.writeInt(this.colorId);
        if (this.colors !== undefined && this.colors !== null) {
            writer.write(this.colors.getBytes());
        }
        if (this.darkColors !== undefined && this.darkColors !== null) {
            writer.write(this.darkColors.getBytes());
        }
        if (this.channelMinLevel !== undefined && this.channelMinLevel !== null) {
            writer.writeInt(this.channelMinLevel);
        }
        if (this.groupMinLevel !== undefined && this.groupMinLevel !== null) {
            writer.writeInt(this.groupMinLevel);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerColorOption {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _hidden = true;
            args.hidden = _hidden;
        } else {
            args.hidden = false;
        }
        const _colorId = reader.readInt();
        args.colorId = _colorId;
        if (args.flags & (1 << 1)) {
            const _colors = reader.tgReadObject();
            args.colors = _colors;
        } else {
            args.colors = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _darkColors = reader.tgReadObject();
            args.darkColors = _darkColors;
        } else {
            args.darkColors = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _channelMinLevel = reader.readInt();
            args.channelMinLevel = _channelMinLevel;
        } else {
            args.channelMinLevel = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _groupMinLevel = reader.readInt();
            args.groupMinLevel = _groupMinLevel;
        } else {
            args.groupMinLevel = undefined;
        }
        return new PeerColorOption(args);
    }
}