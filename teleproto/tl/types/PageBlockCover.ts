import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageBlock } from "./TypePageBlock";

export class PageBlockCover extends TLObject {
    static CONSTRUCTOR_ID = 972174080;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockCover";
    static classType = "constructor";

    cover!: TypePageBlock;

    constructor(args: { cover?: TypePageBlock } = {}) {
        super();
        this.cover = args.cover!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(972174080, false);
        writer.write(this.cover.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockCover {
        const args: any = {};
        const _cover = reader.tgReadObject();
        args.cover = _cover;
        return new PageBlockCover(args);
    }
}