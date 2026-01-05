import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class HistoryImportParsed extends TLObject {
    static CONSTRUCTOR_ID = 1578088377;
    static SUBCLASS_OF_ID = 1538421259;
    static className = "messages.HistoryImportParsed";
    static classType = "constructor";

    flags!: number;
    pm?: boolean;
    group?: boolean;
    title?: string;

    constructor(args: { flags?: number, pm?: boolean, group?: boolean, title?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.pm = args.pm;
        this.group = args.group;
        this.title = args.title;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1578088377, false);
        let flags = 0;
        if (this.pm) { flags |= 1 << 0; }
        if (this.group) { flags |= 1 << 1; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.pm !== undefined && this.pm !== null) {
        }
        if (this.group !== undefined && this.group !== null) {
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): HistoryImportParsed {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _pm = true;
            args.pm = _pm;
        } else {
            args.pm = false;
        }
        if (args.flags & (1 << 1)) {
            const _group = true;
            args.group = _group;
        } else {
            args.group = false;
        }
        if (args.flags & (1 << 2)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        return new HistoryImportParsed(args);
    }
}