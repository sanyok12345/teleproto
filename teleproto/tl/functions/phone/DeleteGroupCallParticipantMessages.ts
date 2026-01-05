import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DeleteGroupCallParticipantMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 499117216;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.DeleteGroupCallParticipantMessages";
    static classType = "request";

    flags?: number;
    reportSpam?: boolean;
    call!: TypeInputGroupCall;
    participant!: EntityLike;

    constructor(args: { flags?: number, reportSpam?: boolean, call?: TypeInputGroupCall, participant?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.reportSpam = args.reportSpam;
        this.call = args.call!;
        this.participant = args.participant!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(499117216, false);
        let flags = 0;
        if (this.reportSpam) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.reportSpam !== undefined && this.reportSpam !== null) {
        }
        writer.write(this.call.getBytes());
        writer.write((this.participant as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteGroupCallParticipantMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _reportSpam = true;
            args.reportSpam = _reportSpam;
        } else {
            args.reportSpam = false;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        return new DeleteGroupCallParticipantMessages(args);
    }
}