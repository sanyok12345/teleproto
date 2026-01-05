import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MyBoost extends TLObject {
    static CONSTRUCTOR_ID = 3293069660;
    static SUBCLASS_OF_ID = 3306842303;
    static className = "MyBoost";
    static classType = "constructor";

    flags!: number;
    slot!: number;
    peer?: TypePeer;
    date!: number;
    expires!: number;
    cooldownUntilDate?: number;

    constructor(args: { flags?: number, slot?: number, peer?: TypePeer, date?: number, expires?: number, cooldownUntilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.slot = args.slot!;
        this.peer = args.peer;
        this.date = args.date!;
        this.expires = args.expires!;
        this.cooldownUntilDate = args.cooldownUntilDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3293069660, false);
        let flags = 0;
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 0; }
        if (this.cooldownUntilDate !== undefined && this.cooldownUntilDate !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeInt(this.slot);
        if (this.peer !== undefined && this.peer !== null) {
            writer.write(this.peer.getBytes());
        }
        writer.writeInt(this.date);
        writer.writeInt(this.expires);
        if (this.cooldownUntilDate !== undefined && this.cooldownUntilDate !== null) {
            writer.writeInt(this.cooldownUntilDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MyBoost {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _slot = reader.readInt();
        args.slot = _slot;
        if (args.flags & (1 << 0)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        const _expires = reader.readInt();
        args.expires = _expires;
        if (args.flags & (1 << 1)) {
            const _cooldownUntilDate = reader.readInt();
            args.cooldownUntilDate = _cooldownUntilDate;
        } else {
            args.cooldownUntilDate = undefined;
        }
        return new MyBoost(args);
    }
}