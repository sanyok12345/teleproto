import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditGroupCallParticipant extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2770811583;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.EditGroupCallParticipant";
    static classType = "request";

    flags?: number;
    call!: TypeInputGroupCall;
    participant!: EntityLike;
    muted?: boolean;
    volume?: number;
    raiseHand?: boolean;
    videoStopped?: boolean;
    videoPaused?: boolean;
    presentationPaused?: boolean;

    constructor(args: { flags?: number, call?: TypeInputGroupCall, participant?: EntityLike, muted?: boolean, volume?: number, raiseHand?: boolean, videoStopped?: boolean, videoPaused?: boolean, presentationPaused?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.call = args.call!;
        this.participant = args.participant!;
        this.muted = args.muted;
        this.volume = args.volume;
        this.raiseHand = args.raiseHand;
        this.videoStopped = args.videoStopped;
        this.videoPaused = args.videoPaused;
        this.presentationPaused = args.presentationPaused;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2770811583, false);
        let flags = 0;
        if (this.muted !== undefined && this.muted !== null) { flags |= 1 << 0; }
        if (this.volume !== undefined && this.volume !== null) { flags |= 1 << 1; }
        if (this.raiseHand !== undefined && this.raiseHand !== null) { flags |= 1 << 2; }
        if (this.videoStopped !== undefined && this.videoStopped !== null) { flags |= 1 << 3; }
        if (this.videoPaused !== undefined && this.videoPaused !== null) { flags |= 1 << 4; }
        if (this.presentationPaused !== undefined && this.presentationPaused !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        writer.write(this.call.getBytes());
        writer.write((this.participant as any).getBytes());
        if (this.muted !== undefined && this.muted !== null) {
            writer.tgWriteBool(this.muted);
        }
        if (this.volume !== undefined && this.volume !== null) {
            writer.writeInt(this.volume);
        }
        if (this.raiseHand !== undefined && this.raiseHand !== null) {
            writer.tgWriteBool(this.raiseHand);
        }
        if (this.videoStopped !== undefined && this.videoStopped !== null) {
            writer.tgWriteBool(this.videoStopped);
        }
        if (this.videoPaused !== undefined && this.videoPaused !== null) {
            writer.tgWriteBool(this.videoPaused);
        }
        if (this.presentationPaused !== undefined && this.presentationPaused !== null) {
            writer.tgWriteBool(this.presentationPaused);
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

    static fromReader(reader: BinaryReader): EditGroupCallParticipant {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _call = reader.tgReadObject();
        args.call = _call;
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        if (args.flags & (1 << 0)) {
            const _muted = reader.tgReadBool();
            args.muted = _muted;
        } else {
            args.muted = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _volume = reader.readInt();
            args.volume = _volume;
        } else {
            args.volume = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _raiseHand = reader.tgReadBool();
            args.raiseHand = _raiseHand;
        } else {
            args.raiseHand = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _videoStopped = reader.tgReadBool();
            args.videoStopped = _videoStopped;
        } else {
            args.videoStopped = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _videoPaused = reader.tgReadBool();
            args.videoPaused = _videoPaused;
        } else {
            args.videoPaused = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _presentationPaused = reader.tgReadBool();
            args.presentationPaused = _presentationPaused;
        } else {
            args.presentationPaused = undefined;
        }
        return new EditGroupCallParticipant(args);
    }
}