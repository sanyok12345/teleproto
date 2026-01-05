import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ToggleNoPaidMessagesException extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4264483446;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ToggleNoPaidMessagesException";
    static classType = "request";

    flags?: number;
    refundCharged?: boolean;
    requirePayment?: boolean;
    parentPeer?: EntityLike;
    userId!: EntityLike;

    constructor(args: { flags?: number, refundCharged?: boolean, requirePayment?: boolean, parentPeer?: EntityLike, userId?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.refundCharged = args.refundCharged;
        this.requirePayment = args.requirePayment;
        this.parentPeer = args.parentPeer;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4264483446, false);
        let flags = 0;
        if (this.refundCharged) { flags |= 1 << 0; }
        if (this.requirePayment) { flags |= 1 << 2; }
        if (this.parentPeer !== undefined && this.parentPeer !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.refundCharged !== undefined && this.refundCharged !== null) {
        }
        if (this.requirePayment !== undefined && this.requirePayment !== null) {
        }
        if (this.parentPeer !== undefined && this.parentPeer !== null) {
            writer.write((this.parentPeer as any).getBytes());
        }
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleNoPaidMessagesException {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _refundCharged = true;
            args.refundCharged = _refundCharged;
        } else {
            args.refundCharged = false;
        }
        if (args.flags & (1 << 2)) {
            const _requirePayment = true;
            args.requirePayment = _requirePayment;
        } else {
            args.requirePayment = false;
        }
        if (args.flags & (1 << 1)) {
            const _parentPeer = reader.tgReadObject();
            args.parentPeer = _parentPeer;
        } else {
            args.parentPeer = undefined;
        }
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new ToggleNoPaidMessagesException(args);
    }
}