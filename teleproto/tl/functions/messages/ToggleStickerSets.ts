import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStickerSet } from "../../types/TypeInputStickerSet";

export class ToggleStickerSets extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3037016042;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ToggleStickerSets";
    static classType = "request";

    flags?: number;
    uninstall?: boolean;
    archive?: boolean;
    unarchive?: boolean;
    stickersets!: TypeInputStickerSet[];

    constructor(args: { flags?: number, uninstall?: boolean, archive?: boolean, unarchive?: boolean, stickersets?: TypeInputStickerSet[] } = {}) {
        super();
        this.flags = args.flags;
        this.uninstall = args.uninstall;
        this.archive = args.archive;
        this.unarchive = args.unarchive;
        this.stickersets = args.stickersets!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3037016042, false);
        let flags = 0;
        if (this.uninstall) { flags |= 1 << 0; }
        if (this.archive) { flags |= 1 << 1; }
        if (this.unarchive) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.uninstall !== undefined && this.uninstall !== null) {
        }
        if (this.archive !== undefined && this.archive !== null) {
        }
        if (this.unarchive !== undefined && this.unarchive !== null) {
        }
        writer.writeVector(this.stickersets, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleStickerSets {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _uninstall = true;
            args.uninstall = _uninstall;
        } else {
            args.uninstall = false;
        }
        if (args.flags & (1 << 1)) {
            const _archive = true;
            args.archive = _archive;
        } else {
            args.archive = false;
        }
        if (args.flags & (1 << 2)) {
            const _unarchive = true;
            args.unarchive = _unarchive;
        } else {
            args.unarchive = false;
        }
        const _stickersets = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stickersets = _stickersets;
        return new ToggleStickerSets(args);
    }
}