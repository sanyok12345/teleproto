import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageCaption } from "./TypePageCaption";

export class PageBlockAudio extends TLObject {
    static CONSTRUCTOR_ID = 2151899626;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockAudio";
    static classType = "constructor";

    audioId!: bigint;
    caption!: TypePageCaption;

    constructor(args: { audioId?: bigint, caption?: TypePageCaption } = {}) {
        super();
        this.audioId = args.audioId!;
        this.caption = args.caption!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2151899626, false);
        writer.writeLargeInt(this.audioId, 64);
        writer.write(this.caption.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockAudio {
        const args: any = {};
        const _audioId = reader.readLargeInt(64);
        args.audioId = _audioId;
        const _caption = reader.tgReadObject();
        args.caption = _caption;
        return new PageBlockAudio(args);
    }
}