import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleGroupCallRecord extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4045981448;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.ToggleGroupCallRecord";
    static classType = "request";

    flags?: number;
    start?: boolean;
    video?: boolean;
    call!: TypeInputGroupCall;
    title?: string;
    videoPortrait?: boolean;

    constructor(args: { flags?: number, start?: boolean, video?: boolean, call?: TypeInputGroupCall, title?: string, videoPortrait?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.start = args.start;
        this.video = args.video;
        this.call = args.call!;
        this.title = args.title;
        this.videoPortrait = args.videoPortrait;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4045981448, false);
        let flags = 0;
        if (this.start) { flags |= 1 << 0; }
        if (this.video) { flags |= 1 << 2; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 1; }
        if (this.videoPortrait !== undefined && this.videoPortrait !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.start !== undefined && this.start !== null) {
        }
        if (this.video !== undefined && this.video !== null) {
        }
        writer.write(this.call.getBytes());
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.videoPortrait !== undefined && this.videoPortrait !== null) {
            writer.tgWriteBool(this.videoPortrait);
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

    static fromReader(reader: BinaryReader): ToggleGroupCallRecord {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _start = true;
            args.start = _start;
        } else {
            args.start = false;
        }
        if (args.flags & (1 << 2)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        if (args.flags & (1 << 1)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _videoPortrait = reader.tgReadBool();
            args.videoPortrait = _videoPortrait;
        } else {
            args.videoPortrait = undefined;
        }
        return new ToggleGroupCallRecord(args);
    }
}