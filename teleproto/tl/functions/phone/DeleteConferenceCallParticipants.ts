import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DeleteConferenceCallParticipants extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2359690533;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.DeleteConferenceCallParticipants";
    static classType = "request";

    flags?: number;
    onlyLeft?: boolean;
    kick?: boolean;
    call!: TypeInputGroupCall;
    ids!: bigint[];
    block!: Buffer;

    constructor(args: { flags?: number, onlyLeft?: boolean, kick?: boolean, call?: TypeInputGroupCall, ids?: bigint[], block?: Buffer } = {}) {
        super();
        this.flags = args.flags;
        this.onlyLeft = args.onlyLeft;
        this.kick = args.kick;
        this.call = args.call!;
        this.ids = args.ids!;
        this.block = args.block!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2359690533, false);
        let flags = 0;
        if (this.onlyLeft) { flags |= 1 << 0; }
        if (this.kick) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.onlyLeft !== undefined && this.onlyLeft !== null) {
        }
        if (this.kick !== undefined && this.kick !== null) {
        }
        writer.write(this.call.getBytes());
        writer.writeVector(this.ids, (item) => {
            writer.writeLargeInt(item, 64);
        });
        writer.tgWriteBytes(this.block);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteConferenceCallParticipants {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _onlyLeft = true;
            args.onlyLeft = _onlyLeft;
        } else {
            args.onlyLeft = false;
        }
        if (args.flags & (1 << 1)) {
            const _kick = true;
            args.kick = _kick;
        } else {
            args.kick = false;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        const _ids = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.ids = _ids;
        const _block = reader.tgReadBytes();
        args.block = _block;
        return new DeleteConferenceCallParticipants(args);
    }
}