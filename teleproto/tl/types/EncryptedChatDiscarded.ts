import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EncryptedChatDiscarded extends TLObject {
    static CONSTRUCTOR_ID = 505183301;
    static SUBCLASS_OF_ID = 1831379834;
    static className = "EncryptedChatDiscarded";
    static classType = "constructor";

    flags!: number;
    historyDeleted?: boolean;
    id!: number;

    constructor(args: { flags?: number, historyDeleted?: boolean, id?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.historyDeleted = args.historyDeleted;
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(505183301, false);
        let flags = 0;
        if (this.historyDeleted) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.historyDeleted !== undefined && this.historyDeleted !== null) {
        }
        writer.writeInt(this.id);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EncryptedChatDiscarded {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _historyDeleted = true;
            args.historyDeleted = _historyDeleted;
        } else {
            args.historyDeleted = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        return new EncryptedChatDiscarded(args);
    }
}