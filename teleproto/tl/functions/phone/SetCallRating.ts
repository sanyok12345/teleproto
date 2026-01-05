import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoneCall } from "../../types/TypeInputPhoneCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SetCallRating extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1508562471;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.SetCallRating";
    static classType = "request";

    flags?: number;
    userInitiative?: boolean;
    peer?: TypeInputPhoneCall;
    rating!: number;
    comment!: string;

    constructor(args: { flags?: number, userInitiative?: boolean, peer?: TypeInputPhoneCall, rating?: number, comment?: string } = {}) {
        super();
        this.flags = args.flags;
        this.userInitiative = args.userInitiative;
        this.peer = args.peer;
        this.rating = args.rating!;
        this.comment = args.comment!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1508562471, false);
        let flags = 0;
        if (this.userInitiative) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.userInitiative !== undefined && this.userInitiative !== null) {
        }
        writer.write(this.peer!.getBytes());
        writer.writeInt(this.rating);
        writer.tgWriteString(this.comment);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetCallRating {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _userInitiative = true;
            args.userInitiative = _userInitiative;
        } else {
            args.userInitiative = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _rating = reader.readInt();
        args.rating = _rating;
        const _comment = reader.tgReadString();
        args.comment = _comment;
        return new SetCallRating(args);
    }
}