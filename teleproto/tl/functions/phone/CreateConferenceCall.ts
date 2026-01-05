import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDataJSON } from "../../types/TypeDataJSON";
import { TypeUpdates } from "../../types/TypeUpdates";

export class CreateConferenceCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2097431739;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.CreateConferenceCall";
    static classType = "request";

    flags?: number;
    muted?: boolean;
    videoStopped?: boolean;
    join?: boolean;
    randomId!: number;
    publicKey?: bigint;
    block?: Buffer;
    params?: TypeDataJSON;

    constructor(args: { flags?: number, muted?: boolean, videoStopped?: boolean, join?: boolean, randomId?: number, publicKey?: bigint, block?: Buffer, params?: TypeDataJSON } = {}) {
        super();
        this.flags = args.flags;
        this.muted = args.muted;
        this.videoStopped = args.videoStopped;
        this.join = args.join;
        this.randomId = args.randomId!;
        this.publicKey = args.publicKey;
        this.block = args.block;
        this.params = args.params;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2097431739, false);
        let flags = 0;
        if (this.muted) { flags |= 1 << 0; }
        if (this.videoStopped) { flags |= 1 << 2; }
        if (this.join) { flags |= 1 << 3; }
        if (this.publicKey !== undefined && this.publicKey !== null) { flags |= 1 << 3; }
        if (this.block !== undefined && this.block !== null) { flags |= 1 << 3; }
        if (this.params !== undefined && this.params !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.muted !== undefined && this.muted !== null) {
        }
        if (this.videoStopped !== undefined && this.videoStopped !== null) {
        }
        if (this.join !== undefined && this.join !== null) {
        }
        writer.writeInt(this.randomId);
        if (this.publicKey !== undefined && this.publicKey !== null) {
            writer.writeLargeInt(this.publicKey, 256);
        }
        if (this.block !== undefined && this.block !== null) {
            writer.tgWriteBytes(this.block);
        }
        if (this.params !== undefined && this.params !== null) {
            writer.write(this.params.getBytes());
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

    static fromReader(reader: BinaryReader): CreateConferenceCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _muted = true;
            args.muted = _muted;
        } else {
            args.muted = false;
        }
        if (args.flags & (1 << 2)) {
            const _videoStopped = true;
            args.videoStopped = _videoStopped;
        } else {
            args.videoStopped = false;
        }
        if (args.flags & (1 << 3)) {
            const _join = true;
            args.join = _join;
        } else {
            args.join = false;
        }
        const _randomId = reader.readInt();
        args.randomId = _randomId;
        if (args.flags & (1 << 3)) {
            const _publicKey = reader.readLargeInt(256);
            args.publicKey = _publicKey;
        } else {
            args.publicKey = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _block = reader.tgReadBytes();
            args.block = _block;
        } else {
            args.block = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _params = reader.tgReadObject();
            args.params = _params;
        } else {
            args.params = undefined;
        }
        return new CreateConferenceCall(args);
    }
}