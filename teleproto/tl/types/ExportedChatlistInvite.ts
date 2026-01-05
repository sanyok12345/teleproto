import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class ExportedChatlistInvite extends TLObject {
    static CONSTRUCTOR_ID = 206668204;
    static SUBCLASS_OF_ID = 1997666559;
    static className = "ExportedChatlistInvite";
    static classType = "constructor";

    flags!: number;
    title!: string;
    url!: string;
    peers!: TypePeer[];

    constructor(args: { flags?: number, title?: string, url?: string, peers?: TypePeer[] } = {}) {
        super();
        this.flags = args.flags!;
        this.title = args.title!;
        this.url = args.url!;
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(206668204, false);
        let flags = 0;
        writer.writeInt(flags, false);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.url);
        writer.writeVector(this.peers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedChatlistInvite {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _title = reader.tgReadString();
        args.title = _title;
        const _url = reader.tgReadString();
        args.url = _url;
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new ExportedChatlistInvite(args);
    }
}