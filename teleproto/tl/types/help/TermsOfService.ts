import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDataJSON } from "../TypeDataJSON";
import { TypeMessageEntity } from "../TypeMessageEntity";

export class TermsOfService extends TLObject {
    static CONSTRUCTOR_ID = 2013922064;
    static SUBCLASS_OF_ID = 552502034;
    static className = "help.TermsOfService";
    static classType = "constructor";

    flags!: number;
    popup?: boolean;
    id!: TypeDataJSON;
    text!: string;
    entities!: TypeMessageEntity[];
    minAgeConfirm?: number;

    constructor(args: { flags?: number, popup?: boolean, id?: TypeDataJSON, text?: string, entities?: TypeMessageEntity[], minAgeConfirm?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.popup = args.popup;
        this.id = args.id!;
        this.text = args.text!;
        this.entities = args.entities!;
        this.minAgeConfirm = args.minAgeConfirm;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2013922064, false);
        let flags = 0;
        if (this.popup) { flags |= 1 << 0; }
        if (this.minAgeConfirm !== undefined && this.minAgeConfirm !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.popup !== undefined && this.popup !== null) {
        }
        writer.write(this.id.getBytes());
        writer.tgWriteString(this.text);
        writer.writeVector(this.entities, (item) => {
            writer.write(item.getBytes());
        });
        if (this.minAgeConfirm !== undefined && this.minAgeConfirm !== null) {
            writer.writeInt(this.minAgeConfirm);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TermsOfService {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _popup = true;
            args.popup = _popup;
        } else {
            args.popup = false;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        const _text = reader.tgReadString();
        args.text = _text;
        const _entities = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.entities = _entities;
        if (args.flags & (1 << 1)) {
            const _minAgeConfirm = reader.readInt();
            args.minAgeConfirm = _minAgeConfirm;
        } else {
            args.minAgeConfirm = undefined;
        }
        return new TermsOfService(args);
    }
}