import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeUserStatus } from "./TypeUserStatus";

export class UpdateUserStatus extends TLObject {
    static CONSTRUCTOR_ID = 3854432478;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateUserStatus";
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
        writer.writeInt(3854432478, false);
        writer.writeLargeInt(this.userId, 64);
        writer.write(this.status.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateUserStatus {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _status = reader.tgReadObject();
        args.status = _status;
        return new UpdateUserStatus(args);
    }
}