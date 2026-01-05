import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneConnectionWebrtc extends TLObject {
    static CONSTRUCTOR_ID = 1667228533;
    static SUBCLASS_OF_ID = 2861425677;
    static className = "PhoneConnectionWebrtc";
    static classType = "constructor";

    flags!: number;
    turn?: boolean;
    stun?: boolean;
    id!: bigint;
    ip!: string;
    ipv6!: string;
    port!: number;
    username!: string;
    password!: string;

    constructor(args: { flags?: number, turn?: boolean, stun?: boolean, id?: bigint, ip?: string, ipv6?: string, port?: number, username?: string, password?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.turn = args.turn;
        this.stun = args.stun;
        this.id = args.id!;
        this.ip = args.ip!;
        this.ipv6 = args.ipv6!;
        this.port = args.port!;
        this.username = args.username!;
        this.password = args.password!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1667228533, false);
        let flags = 0;
        if (this.turn) { flags |= 1 << 0; }
        if (this.stun) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.turn !== undefined && this.turn !== null) {
        }
        if (this.stun !== undefined && this.stun !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteString(this.ip);
        writer.tgWriteString(this.ipv6);
        writer.writeInt(this.port);
        writer.tgWriteString(this.username);
        writer.tgWriteString(this.password);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneConnectionWebrtc {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _turn = true;
            args.turn = _turn;
        } else {
            args.turn = false;
        }
        if (args.flags & (1 << 1)) {
            const _stun = true;
            args.stun = _stun;
        } else {
            args.stun = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _ip = reader.tgReadString();
        args.ip = _ip;
        const _ipv6 = reader.tgReadString();
        args.ipv6 = _ipv6;
        const _port = reader.readInt();
        args.port = _port;
        const _username = reader.tgReadString();
        args.username = _username;
        const _password = reader.tgReadString();
        args.password = _password;
        return new PhoneConnectionWebrtc(args);
    }
}