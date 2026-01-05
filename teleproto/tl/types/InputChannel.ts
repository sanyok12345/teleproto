import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputChannel extends TLObject {
    static CONSTRUCTOR_ID = 4082822184;
    static SUBCLASS_OF_ID = 1089602301;
    static className = "InputChannel";
    static classType = "constructor";

    channelId!: bigint;
    accessHash!: bigint;

    constructor(args: { channelId?: bigint, accessHash?: bigint } = {}) {
        super();
        this.channelId = args.channelId!;
        this.accessHash = args.accessHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4082822184, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.writeLargeInt(this.accessHash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputChannel {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        return new InputChannel(args);
    }
}