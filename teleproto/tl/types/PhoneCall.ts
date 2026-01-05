import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoneCallProtocol } from "./TypePhoneCallProtocol";
import { TypePhoneConnection } from "./TypePhoneConnection";
import { TypeDataJSON } from "./TypeDataJSON";

export class PhoneCall extends TLObject {
    static CONSTRUCTOR_ID = 810769141;
    static SUBCLASS_OF_ID = 3296664529;
    static className = "PhoneCall";
    static classType = "constructor";

    flags!: number;
    p2pAllowed?: boolean;
    video?: boolean;
    conferenceSupported?: boolean;
    id!: bigint;
    accessHash!: bigint;
    date!: number;
    adminId!: bigint;
    participantId!: bigint;
    gAOrB!: Buffer;
    keyFingerprint!: bigint;
    protocol!: TypePhoneCallProtocol;
    connections!: TypePhoneConnection[];
    startDate!: number;
    customParameters?: TypeDataJSON;

    constructor(args: { flags?: number, p2pAllowed?: boolean, video?: boolean, conferenceSupported?: boolean, id?: bigint, accessHash?: bigint, date?: number, adminId?: bigint, participantId?: bigint, gAOrB?: Buffer, keyFingerprint?: bigint, protocol?: TypePhoneCallProtocol, connections?: TypePhoneConnection[], startDate?: number, customParameters?: TypeDataJSON } = {}) {
        super();
        this.flags = args.flags!;
        this.p2pAllowed = args.p2pAllowed;
        this.video = args.video;
        this.conferenceSupported = args.conferenceSupported;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.date = args.date!;
        this.adminId = args.adminId!;
        this.participantId = args.participantId!;
        this.gAOrB = args.gAOrB!;
        this.keyFingerprint = args.keyFingerprint!;
        this.protocol = args.protocol!;
        this.connections = args.connections!;
        this.startDate = args.startDate!;
        this.customParameters = args.customParameters;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(810769141, false);
        let flags = 0;
        if (this.p2pAllowed) { flags |= 1 << 5; }
        if (this.video) { flags |= 1 << 6; }
        if (this.conferenceSupported) { flags |= 1 << 8; }
        if (this.customParameters !== undefined && this.customParameters !== null) { flags |= 1 << 7; }
        writer.writeInt(flags, false);
        if (this.p2pAllowed !== undefined && this.p2pAllowed !== null) {
        }
        if (this.video !== undefined && this.video !== null) {
        }
        if (this.conferenceSupported !== undefined && this.conferenceSupported !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.adminId, 64);
        writer.writeLargeInt(this.participantId, 64);
        writer.tgWriteBytes(this.gAOrB);
        writer.writeLargeInt(this.keyFingerprint, 64);
        writer.write(this.protocol.getBytes());
        writer.writeVector(this.connections, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.startDate);
        if (this.customParameters !== undefined && this.customParameters !== null) {
            writer.write(this.customParameters.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 5)) {
            const _p2pAllowed = true;
            args.p2pAllowed = _p2pAllowed;
        } else {
            args.p2pAllowed = false;
        }
        if (args.flags & (1 << 6)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        if (args.flags & (1 << 8)) {
            const _conferenceSupported = true;
            args.conferenceSupported = _conferenceSupported;
        } else {
            args.conferenceSupported = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _date = reader.readInt();
        args.date = _date;
        const _adminId = reader.readLargeInt(64);
        args.adminId = _adminId;
        const _participantId = reader.readLargeInt(64);
        args.participantId = _participantId;
        const _gAOrB = reader.tgReadBytes();
        args.gAOrB = _gAOrB;
        const _keyFingerprint = reader.readLargeInt(64);
        args.keyFingerprint = _keyFingerprint;
        const _protocol = reader.tgReadObject();
        args.protocol = _protocol;
        const _connections = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.connections = _connections;
        const _startDate = reader.readInt();
        args.startDate = _startDate;
        if (args.flags & (1 << 7)) {
            const _customParameters = reader.tgReadObject();
            args.customParameters = _customParameters;
        } else {
            args.customParameters = undefined;
        }
        return new PhoneCall(args);
    }
}