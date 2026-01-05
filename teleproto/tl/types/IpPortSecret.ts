import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class IpPortSecret extends TLObject {
    static CONSTRUCTOR_ID = 932718150;
    static SUBCLASS_OF_ID = 2728408870;
    static className = "IpPortSecret";
    static classType = "constructor";

    ipv4!: number;
    port!: number;
    secret!: Buffer;

    constructor(args: { ipv4?: number, port?: number, secret?: Buffer } = {}) {
        super();
        this.ipv4 = args.ipv4!;
        this.port = args.port!;
        this.secret = args.secret!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(932718150, false);
        writer.writeInt(this.ipv4);
        writer.writeInt(this.port);
        writer.tgWriteBytes(this.secret);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): IpPortSecret {
        const args: any = {};
        const _ipv4 = reader.readInt();
        args.ipv4 = _ipv4;
        const _port = reader.readInt();
        args.port = _port;
        const _secret = reader.tgReadBytes();
        args.secret = _secret;
        return new IpPortSecret(args);
    }
}