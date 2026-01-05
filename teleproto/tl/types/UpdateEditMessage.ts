import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class UpdateEditMessage extends TLObject {
    static CONSTRUCTOR_ID = 3825430691;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateEditMessage";
    static classType = "constructor";

    message!: TypeMessage;
    pts!: number;
    ptsCount!: number;

    constructor(args: { message?: TypeMessage, pts?: number, ptsCount?: number } = {}) {
        super();
        this.message = args.message!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3825430691, false);
        writer.write(this.message.getBytes());
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateEditMessage {
        const args: any = {};
        const _message = reader.tgReadObject();
        args.message = _message;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new UpdateEditMessage(args);
    }
}