import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class IpPort extends TLObject {
    static CONSTRUCTOR_ID = 3560156531;
    static SUBCLASS_OF_ID = 2728408870;
    static className = "IpPort";
    static classType = "constructor";

    ipv4!: number;
    port!: number;

    constructor(args: { ipv4?: number, port?: number } = {}) {
        super();
        this.ipv4 = args.ipv4!;
        this.port = args.port!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3560156531, false);
        writer.writeInt(this.ipv4);
        writer.writeInt(this.port);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): IpPort {
        const args: any = {};
        const _ipv4 = reader.readInt();
        args.ipv4 = _ipv4;
        const _port = reader.readInt();
        args.port = _port;
        return new IpPort(args);
    }
}