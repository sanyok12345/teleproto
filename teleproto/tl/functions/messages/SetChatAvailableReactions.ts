import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChatReactions } from "../../types/TypeChatReactions";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SetChatAvailableReactions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2253071745;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SetChatAvailableReactions";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    availableReactions!: TypeChatReactions;
    reactionsLimit?: number;
    paidEnabled?: boolean;

    constructor(args: { flags?: number, peer?: EntityLike, availableReactions?: TypeChatReactions, reactionsLimit?: number, paidEnabled?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.availableReactions = args.availableReactions!;
        this.reactionsLimit = args.reactionsLimit;
        this.paidEnabled = args.paidEnabled;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2253071745, false);
        let flags = 0;
        if (this.reactionsLimit !== undefined && this.reactionsLimit !== null) { flags |= 1 << 0; }
        if (this.paidEnabled !== undefined && this.paidEnabled !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.write(this.availableReactions.getBytes());
        if (this.reactionsLimit !== undefined && this.reactionsLimit !== null) {
            writer.writeInt(this.reactionsLimit);
        }
        if (this.paidEnabled !== undefined && this.paidEnabled !== null) {
            writer.tgWriteBool(this.paidEnabled);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetChatAvailableReactions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _availableReactions = reader.tgReadObject();
        args.availableReactions = _availableReactions;
        if (args.flags & (1 << 0)) {
            const _reactionsLimit = reader.readInt();
            args.reactionsLimit = _reactionsLimit;
        } else {
            args.reactionsLimit = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _paidEnabled = reader.tgReadBool();
            args.paidEnabled = _paidEnabled;
        } else {
            args.paidEnabled = undefined;
        }
        return new SetChatAvailableReactions(args);
    }
}