import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDifference } from "../../types/updates/TypeDifference";

export class GetDifference extends MTProtoRequest {
    static CONSTRUCTOR_ID = 432207715;
    static SUBCLASS_OF_ID = 541599860;
    static className = "updates.GetDifference";
    static classType = "request";

    flags?: number;
    pts!: number;
    ptsLimit?: number;
    ptsTotalLimit?: number;
    date!: number;
    qts!: number;
    qtsLimit?: number;

    constructor(args: { flags?: number, pts?: number, ptsLimit?: number, ptsTotalLimit?: number, date?: number, qts?: number, qtsLimit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.pts = args.pts!;
        this.ptsLimit = args.ptsLimit;
        this.ptsTotalLimit = args.ptsTotalLimit;
        this.date = args.date!;
        this.qts = args.qts!;
        this.qtsLimit = args.qtsLimit;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(432207715, false);
        let flags = 0;
        if (this.ptsLimit !== undefined && this.ptsLimit !== null) { flags |= 1 << 1; }
        if (this.ptsTotalLimit !== undefined && this.ptsTotalLimit !== null) { flags |= 1 << 0; }
        if (this.qtsLimit !== undefined && this.qtsLimit !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeInt(this.pts);
        if (this.ptsLimit !== undefined && this.ptsLimit !== null) {
            writer.writeInt(this.ptsLimit);
        }
        if (this.ptsTotalLimit !== undefined && this.ptsTotalLimit !== null) {
            writer.writeInt(this.ptsTotalLimit);
        }
        writer.writeInt(this.date);
        writer.writeInt(this.qts);
        if (this.qtsLimit !== undefined && this.qtsLimit !== null) {
            writer.writeInt(this.qtsLimit);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDifference {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDifference {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _pts = reader.readInt();
        args.pts = _pts;
        if (args.flags & (1 << 1)) {
            const _ptsLimit = reader.readInt();
            args.ptsLimit = _ptsLimit;
        } else {
            args.ptsLimit = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _ptsTotalLimit = reader.readInt();
            args.ptsTotalLimit = _ptsTotalLimit;
        } else {
            args.ptsTotalLimit = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        const _qts = reader.readInt();
        args.qts = _qts;
        if (args.flags & (1 << 2)) {
            const _qtsLimit = reader.readInt();
            args.qtsLimit = _qtsLimit;
        } else {
            args.qtsLimit = undefined;
        }
        return new GetDifference(args);
    }
}