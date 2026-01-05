import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputClientProxy extends TLObject {
    static CONSTRUCTOR_ID = 1968737087;
    static SUBCLASS_OF_ID = 152716102;
    static className = "InputClientProxy";
    static classType = "constructor";

    address!: string;
    port!: number;

    constructor(args: { address?: string, port?: number } = {}) {
        super();
        this.address = args.address!;
        this.port = args.port!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1968737087, false);
        writer.tgWriteString(this.address);
        writer.writeInt(this.port);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputClientProxy {
        const args: any = {};
        const _address = reader.tgReadString();
        args.address = _address;
        const _port = reader.readInt();
        args.port = _port;
        return new InputClientProxy(args);
    }
}