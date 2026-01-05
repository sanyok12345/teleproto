import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeUserStatus } from "./TypeUserStatus";

export class ContactStatus extends TLObject {
    static CONSTRUCTOR_ID = 383348795;
    static SUBCLASS_OF_ID = 1757468492;
    static className = "ContactStatus";
    static classType = "constructor";

    userId!: bigint;
    status!: TypeUserStatus;

    constructor(args: { userId?: bigint, status?: TypeUserStatus } = {}) {
        super();
        this.userId = args.userId!;
        this.status = args.status!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(383348795, false);
        writer.writeLargeInt(this.userId, 64);
        writer.write(this.status.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ContactStatus {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _status = reader.tgReadObject();
        args.status = _status;
        return new ContactStatus(args);
    }
}