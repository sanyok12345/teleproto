import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeFutureSalt } from "./TypeFutureSalt";

export class FutureSalts extends TLObject {
    static CONSTRUCTOR_ID = 2924480661;
    static SUBCLASS_OF_ID = 277935383;
    static className = "FutureSalts";
    static classType = "constructor";

    reqMsgId!: bigint;
    now!: number;
    salts!: TypeFutureSalt[];

    constructor(args: { reqMsgId?: bigint, now?: number, salts?: TypeFutureSalt[] } = {}) {
        super();
        this.reqMsgId = args.reqMsgId!;
        this.now = args.now!;
        this.salts = args.salts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2924480661, false);
        writer.writeLargeInt(this.reqMsgId, 64);
        writer.writeInt(this.now);
        writer.writeVector(this.salts, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FutureSalts {
        const args: any = {};
        const _reqMsgId = reader.readLargeInt(64);
        args.reqMsgId = _reqMsgId;
        const _now = reader.readInt();
        args.now = _now;
        const _salts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.salts = _salts;
        return new FutureSalts(args);
    }
}