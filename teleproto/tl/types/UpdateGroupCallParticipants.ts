import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";
import { TypeGroupCallParticipant } from "./TypeGroupCallParticipant";

export class UpdateGroupCallParticipants extends TLObject {
    static CONSTRUCTOR_ID = 4075543374;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateGroupCallParticipants";
    static classType = "constructor";

    call!: TypeInputGroupCall;
    participants!: TypeGroupCallParticipant[];
    version!: number;

    constructor(args: { call?: TypeInputGroupCall, participants?: TypeGroupCallParticipant[], version?: number } = {}) {
        super();
        this.call = args.call!;
        this.participants = args.participants!;
        this.version = args.version!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4075543374, false);
        writer.write(this.call.getBytes());
        writer.writeVector(this.participants, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.version);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateGroupCallParticipants {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _participants = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.participants = _participants;
        const _version = reader.readInt();
        args.version = _version;
        return new UpdateGroupCallParticipants(args);
    }
}