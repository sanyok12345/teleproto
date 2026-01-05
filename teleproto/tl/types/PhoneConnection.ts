import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneConnection extends TLObject {
    static CONSTRUCTOR_ID = 2629903303;
    static SUBCLASS_OF_ID = 2861425677;
    static className = "PhoneConnection";
    static classType = "constructor";

    flags!: number;
    tcp?: boolean;
    id!: bigint;
    ip!: string;
    ipv6!: string;
    port!: number;
    peerTag!: Buffer;

    constructor(args: { flags?: number, tcp?: boolean, id?: bigint, ip?: string, ipv6?: string, port?: number, peerTag?: Buffer } = {}) {
        super();
        this.flags = args.flags!;
        this.tcp = args.tcp;
        this.id = args.id!;
        this.ip = args.ip!;
        this.ipv6 = args.ipv6!;
        this.port = args.port!;
        this.peerTag = args.peerTag!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2629903303, false);
        let flags = 0;
        if (this.tcp) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.tcp !== undefined && this.tcp !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteString(this.ip);
        writer.tgWriteString(this.ipv6);
        writer.writeInt(this.port);
        writer.tgWriteBytes(this.peerTag);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneConnection {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _tcp = true;
            args.tcp = _tcp;
        } else {
            args.tcp = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _ip = reader.tgReadString();
        args.ip = _ip;
        const _ipv6 = reader.tgReadString();
        args.ipv6 = _ipv6;
        const _port = reader.readInt();
        args.port = _port;
        const _peerTag = reader.tgReadBytes();
        args.peerTag = _peerTag;
        return new PhoneConnection(args);
    }
}