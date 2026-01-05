import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class InviteConferenceCallParticipant extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3169986181;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.InviteConferenceCallParticipant";
    static classType = "request";

    flags?: number;
    video?: boolean;
    call!: TypeInputGroupCall;
    userId!: EntityLike;

    constructor(args: { flags?: number, video?: boolean, call?: TypeInputGroupCall, userId?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.video = args.video;
        this.call = args.call!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3169986181, false);
        let flags = 0;
        if (this.video) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.video !== undefined && this.video !== null) {
        }
        writer.write(this.call.getBytes());
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InviteConferenceCallParticipant {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new InviteConferenceCallParticipant(args);
    }
}