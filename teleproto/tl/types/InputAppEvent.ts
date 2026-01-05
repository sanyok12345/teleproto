import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeJSONValue } from "./TypeJSONValue";

export class InputAppEvent extends TLObject {
    static CONSTRUCTOR_ID = 488313413;
    static SUBCLASS_OF_ID = 2301763846;
    static className = "InputAppEvent";
    static classType = "constructor";

    time!: number;
    type!: string;
    peer!: bigint;
    data!: TypeJSONValue;

    constructor(args: { time?: number, type?: string, peer?: bigint, data?: TypeJSONValue } = {}) {
        super();
        this.time = args.time!;
        this.type = args.type!;
        this.peer = args.peer!;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(488313413, false);
        writer.writeDouble(this.time);
        writer.tgWriteString(this.type);
        writer.writeLargeInt(this.peer, 64);
        writer.write(this.data.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputAppEvent {
        const args: any = {};
        const _time = reader.readDouble();
        args.time = _time;
        const _type = reader.tgReadString();
        args.type = _type;
        const _peer = reader.readLargeInt(64);
        args.peer = _peer;
        const _data = reader.tgReadObject();
        args.data = _data;
        return new InputAppEvent(args);
    }
}