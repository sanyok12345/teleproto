import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInlineQueryPeerType } from "./TypeInlineQueryPeerType";

export class KeyboardButtonSwitchInline extends TLObject {
    static CONSTRUCTOR_ID = 2478439349;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonSwitchInline";
    static classType = "constructor";

    flags!: number;
    samePeer?: boolean;
    text!: string;
    query!: string;
    peerTypes?: TypeInlineQueryPeerType[];

    constructor(args: { flags?: number, samePeer?: boolean, text?: string, query?: string, peerTypes?: TypeInlineQueryPeerType[] } = {}) {
        super();
        this.flags = args.flags!;
        this.samePeer = args.samePeer;
        this.text = args.text!;
        this.query = args.query!;
        this.peerTypes = args.peerTypes;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2478439349, false);
        let flags = 0;
        if (this.samePeer) { flags |= 1 << 0; }
        if (this.peerTypes !== undefined && this.peerTypes !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.samePeer !== undefined && this.samePeer !== null) {
        }
        writer.tgWriteString(this.text);
        writer.tgWriteString(this.query);
        if (this.peerTypes !== undefined && this.peerTypes !== null) {
            writer.writeVector(this.peerTypes, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonSwitchInline {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _samePeer = true;
            args.samePeer = _samePeer;
        } else {
            args.samePeer = false;
        }
        const _text = reader.tgReadString();
        args.text = _text;
        const _query = reader.tgReadString();
        args.query = _query;
        if (args.flags & (1 << 1)) {
            const _peerTypes = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.peerTypes = _peerTypes;
        } else {
            args.peerTypes = undefined;
        }
        return new KeyboardButtonSwitchInline(args);
    }
}