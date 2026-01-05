import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeWebPage } from "./TypeWebPage";

export class UpdateWebPage extends TLObject {
    static CONSTRUCTOR_ID = 2139689491;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateWebPage";
    static classType = "constructor";

    webpage!: TypeWebPage;
    pts!: number;
    ptsCount!: number;

    constructor(args: { webpage?: TypeWebPage, pts?: number, ptsCount?: number } = {}) {
        super();
        this.webpage = args.webpage!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2139689491, false);
        writer.write(this.webpage.getBytes());
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateWebPage {
        const args: any = {};
        const _webpage = reader.tgReadObject();
        args.webpage = _webpage;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new UpdateWebPage(args);
    }
}