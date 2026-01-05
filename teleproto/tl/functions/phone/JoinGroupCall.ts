import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { EntityLike } from "../../types/../../define";
import { TypeDataJSON } from "../../types/TypeDataJSON";
import { TypeUpdates } from "../../types/TypeUpdates";

export class JoinGroupCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2411016279;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.JoinGroupCall";
    static classType = "request";

    flags?: number;
    muted?: boolean;
    videoStopped?: boolean;
    call!: TypeInputGroupCall;
    joinAs!: EntityLike;
    inviteHash?: string;
    publicKey?: bigint;
    block?: Buffer;
    params!: TypeDataJSON;

    constructor(args: { flags?: number, muted?: boolean, videoStopped?: boolean, call?: TypeInputGroupCall, joinAs?: EntityLike, inviteHash?: string, publicKey?: bigint, block?: Buffer, params?: TypeDataJSON } = {}) {
        super();
        this.flags = args.flags;
        this.muted = args.muted;
        this.videoStopped = args.videoStopped;
        this.call = args.call!;
        this.joinAs = args.joinAs!;
        this.inviteHash = args.inviteHash;
        this.publicKey = args.publicKey;
        this.block = args.block;
        this.params = args.params!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2411016279, false);
        let flags = 0;
        if (this.muted) { flags |= 1 << 0; }
        if (this.videoStopped) { flags |= 1 << 2; }
        if (this.inviteHash !== undefined && this.inviteHash !== null) { flags |= 1 << 1; }
        if (this.publicKey !== undefined && this.publicKey !== null) { flags |= 1 << 3; }
        if (this.block !== undefined && this.block !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.muted !== undefined && this.muted !== null) {
        }
        if (this.videoStopped !== undefined && this.videoStopped !== null) {
        }
        writer.write(this.call.getBytes());
        writer.write((this.joinAs as any).getBytes());
        if (this.inviteHash !== undefined && this.inviteHash !== null) {
            writer.tgWriteString(this.inviteHash);
        }
        if (this.publicKey !== undefined && this.publicKey !== null) {
            writer.writeLargeInt(this.publicKey, 256);
        }
        if (this.block !== undefined && this.block !== null) {
            writer.tgWriteBytes(this.block);
        }
        writer.write(this.params.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): JoinGroupCall {
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
        const _call = reader.tgReadObject();
        args.call = _call;
        const _joinAs = reader.tgReadObject();
        args.joinAs = _joinAs;
        if (args.flags & (1 << 1)) {
            const _inviteHash = reader.tgReadString();
            args.inviteHash = _inviteHash;
        } else {
            args.inviteHash = undefined;
        }
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
        const _params = reader.tgReadObject();
        args.params = _params;
        return new JoinGroupCall(args);
    }
}