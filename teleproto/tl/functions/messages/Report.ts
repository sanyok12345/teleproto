import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeReportResult } from "../../types/TypeReportResult";

export class Report extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4235767707;
    static SUBCLASS_OF_ID = 2899571768;
    static className = "messages.Report";
    static classType = "request";

    peer?: EntityLike;
    id?: number[];
    option!: Buffer;
    message!: string;

    constructor(args: { peer?: EntityLike, id?: number[], option?: Buffer, message?: string } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
        this.option = args.option!;
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4235767707, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        writer.tgWriteBytes(this.option);
        writer.tgWriteString(this.message);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeReportResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): Report {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        const _option = reader.tgReadBytes();
        args.option = _option;
        const _message = reader.tgReadString();
        args.message = _message;
        return new Report(args);
    }
}