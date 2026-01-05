import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneCallProtocol extends TLObject {
    static CONSTRUCTOR_ID = 4236742600;
    static SUBCLASS_OF_ID = 2017038755;
    static className = "PhoneCallProtocol";
    static classType = "constructor";

    flags!: number;
    udpP2p?: boolean;
    udpReflector?: boolean;
    minLayer!: number;
    maxLayer!: number;
    libraryVersions!: string[];

    constructor(args: { flags?: number, udpP2p?: boolean, udpReflector?: boolean, minLayer?: number, maxLayer?: number, libraryVersions?: string[] } = {}) {
        super();
        this.flags = args.flags!;
        this.udpP2p = args.udpP2p;
        this.udpReflector = args.udpReflector;
        this.minLayer = args.minLayer!;
        this.maxLayer = args.maxLayer!;
        this.libraryVersions = args.libraryVersions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4236742600, false);
        let flags = 0;
        if (this.udpP2p) { flags |= 1 << 0; }
        if (this.udpReflector) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.udpP2p !== undefined && this.udpP2p !== null) {
        }
        if (this.udpReflector !== undefined && this.udpReflector !== null) {
        }
        writer.writeInt(this.minLayer);
        writer.writeInt(this.maxLayer);
        writer.writeVector(this.libraryVersions, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallProtocol {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _udpP2p = true;
            args.udpP2p = _udpP2p;
        } else {
            args.udpP2p = false;
        }
        if (args.flags & (1 << 1)) {
            const _udpReflector = true;
            args.udpReflector = _udpReflector;
        } else {
            args.udpReflector = false;
        }
        const _minLayer = reader.readInt();
        args.minLayer = _minLayer;
        const _maxLayer = reader.readInt();
        args.maxLayer = _maxLayer;
        const _libraryVersions = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.libraryVersions = _libraryVersions;
        return new PhoneCallProtocol(args);
    }
}