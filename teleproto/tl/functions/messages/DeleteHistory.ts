import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAffectedHistory } from "../../types/messages/TypeAffectedHistory";

export class DeleteHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2962199082;
    static SUBCLASS_OF_ID = 743031062;
    static className = "messages.DeleteHistory";
    static classType = "request";

    flags?: number;
    justClear?: boolean;
    revoke?: boolean;
    peer?: EntityLike;
    maxId?: number;
    minDate?: number;
    maxDate?: number;

    constructor(args: { flags?: number, justClear?: boolean, revoke?: boolean, peer?: EntityLike, maxId?: number, minDate?: number, maxDate?: number } = {}) {
        super();
        this.flags = args.flags;
        this.justClear = args.justClear;
        this.revoke = args.revoke;
        this.peer = args.peer;
        this.maxId = args.maxId;
        this.minDate = args.minDate;
        this.maxDate = args.maxDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2962199082, false);
        let flags = 0;
        if (this.justClear) { flags |= 1 << 0; }
        if (this.revoke) { flags |= 1 << 1; }
        if (this.minDate !== undefined && this.minDate !== null) { flags |= 1 << 2; }
        if (this.maxDate !== undefined && this.maxDate !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.justClear !== undefined && this.justClear !== null) {
        }
        if (this.revoke !== undefined && this.revoke !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.maxId!);
        if (this.minDate !== undefined && this.minDate !== null) {
            writer.writeInt(this.minDate);
        }
        if (this.maxDate !== undefined && this.maxDate !== null) {
            writer.writeInt(this.maxDate);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAffectedHistory {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteHistory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _justClear = true;
            args.justClear = _justClear;
        } else {
            args.justClear = false;
        }
        if (args.flags & (1 << 1)) {
            const _revoke = true;
            args.revoke = _revoke;
        } else {
            args.revoke = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        if (args.flags & (1 << 2)) {
            const _minDate = reader.readInt();
            args.minDate = _minDate;
        } else {
            args.minDate = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _maxDate = reader.readInt();
            args.maxDate = _maxDate;
        } else {
            args.maxDate = undefined;
        }
        return new DeleteHistory(args);
    }
}