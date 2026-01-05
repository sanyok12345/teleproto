import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatParticipants } from "./TypeChatParticipants";

export class UpdateChatParticipants extends TLObject {
    static CONSTRUCTOR_ID = 125178264;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChatParticipants";
    static classType = "constructor";

    participants!: TypeChatParticipants;

    constructor(args: { participants?: TypeChatParticipants } = {}) {
        super();
        this.participants = args.participants!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(125178264, false);
        writer.write(this.participants.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChatParticipants {
        const args: any = {};
        const _participants = reader.tgReadObject();
        args.participants = _participants;
        return new UpdateChatParticipants(args);
    }
}