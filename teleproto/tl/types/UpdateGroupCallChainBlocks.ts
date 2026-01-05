import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class UpdateGroupCallChainBlocks extends TLObject {
    static CONSTRUCTOR_ID = 2759272591;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateGroupCallChainBlocks";
    static classType = "constructor";

    call!: TypeInputGroupCall;
    subChainId!: number;
    blocks!: Buffer[];
    nextOffset!: number;

    constructor(args: { call?: TypeInputGroupCall, subChainId?: number, blocks?: Buffer[], nextOffset?: number } = {}) {
        super();
        this.call = args.call!;
        this.subChainId = args.subChainId!;
        this.blocks = args.blocks!;
        this.nextOffset = args.nextOffset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2759272591, false);
        writer.write(this.call.getBytes());
        writer.writeInt(this.subChainId);
        writer.writeVector(this.blocks, (item) => {
            writer.tgWriteBytes(item);
        });
        writer.writeInt(this.nextOffset);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateGroupCallChainBlocks {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _subChainId = reader.readInt();
        args.subChainId = _subChainId;
        const _blocks = reader.readVector((reader) => {
            const item = reader.tgReadBytes();
            return item;
        });
        args.blocks = _blocks;
        const _nextOffset = reader.readInt();
        args.nextOffset = _nextOffset;
        return new UpdateGroupCallChainBlocks(args);
    }
}