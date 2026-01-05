import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeWallPaper } from "./TypeWallPaper";

export class UpdatePeerWallpaper extends TLObject {
    static CONSTRUCTOR_ID = 2923368477;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePeerWallpaper";
    static classType = "constructor";

    flags!: number;
    wallpaperOverridden?: boolean;
    peer!: TypePeer;
    wallpaper?: TypeWallPaper;

    constructor(args: { flags?: number, wallpaperOverridden?: boolean, peer?: TypePeer, wallpaper?: TypeWallPaper } = {}) {
        super();
        this.flags = args.flags!;
        this.wallpaperOverridden = args.wallpaperOverridden;
        this.peer = args.peer!;
        this.wallpaper = args.wallpaper;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2923368477, false);
        let flags = 0;
        if (this.wallpaperOverridden) { flags |= 1 << 1; }
        if (this.wallpaper !== undefined && this.wallpaper !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.wallpaperOverridden !== undefined && this.wallpaperOverridden !== null) {
        }
        writer.write(this.peer.getBytes());
        if (this.wallpaper !== undefined && this.wallpaper !== null) {
            writer.write(this.wallpaper.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePeerWallpaper {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _wallpaperOverridden = true;
            args.wallpaperOverridden = _wallpaperOverridden;
        } else {
            args.wallpaperOverridden = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _wallpaper = reader.tgReadObject();
            args.wallpaper = _wallpaper;
        } else {
            args.wallpaper = undefined;
        }
        return new UpdatePeerWallpaper(args);
    }
}