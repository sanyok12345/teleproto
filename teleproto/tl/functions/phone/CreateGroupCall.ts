import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class CreateGroupCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1221445336;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.CreateGroupCall";
    static classType = "request";

    flags?: number;
    rtmpStream?: boolean;
    peer?: EntityLike;
    randomId!: number;
    title?: string;
    scheduleDate?: number;

    constructor(args: { flags?: number, rtmpStream?: boolean, peer?: EntityLike, randomId?: number, title?: string, scheduleDate?: number } = {}) {
        super();
        this.flags = args.flags;
        this.rtmpStream = args.rtmpStream;
        this.peer = args.peer;
        this.randomId = args.randomId!;
        this.title = args.title;
        this.scheduleDate = args.scheduleDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1221445336, false);
        let flags = 0;
        if (this.rtmpStream) { flags |= 1 << 2; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.rtmpStream !== undefined && this.rtmpStream !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.randomId);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
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

    static fromReader(reader: BinaryReader): CreateGroupCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _rtmpStream = true;
            args.rtmpStream = _rtmpStream;
        } else {
            args.rtmpStream = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _randomId = reader.readInt();
        args.randomId = _randomId;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _scheduleDate = reader.readInt();
            args.scheduleDate = _scheduleDate;
        } else {
            args.scheduleDate = undefined;
        }
        return new CreateGroupCall(args);
    }
}