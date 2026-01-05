import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class SponsoredPeer extends TLObject {
    static CONSTRUCTOR_ID = 3331786963;
    static SUBCLASS_OF_ID = 1064665102;
    static className = "SponsoredPeer";
    static classType = "constructor";

    flags!: number;
    randomId!: Buffer;
    peer!: TypePeer;
    sponsorInfo?: string;
    additionalInfo?: string;

    constructor(args: { flags?: number, randomId?: Buffer, peer?: TypePeer, sponsorInfo?: string, additionalInfo?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.randomId = args.randomId!;
        this.peer = args.peer!;
        this.sponsorInfo = args.sponsorInfo;
        this.additionalInfo = args.additionalInfo;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3331786963, false);
        let flags = 0;
        if (this.sponsorInfo !== undefined && this.sponsorInfo !== null) { flags |= 1 << 0; }
        if (this.additionalInfo !== undefined && this.additionalInfo !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteBytes(this.randomId);
        writer.write(this.peer.getBytes());
        if (this.sponsorInfo !== undefined && this.sponsorInfo !== null) {
            writer.tgWriteString(this.sponsorInfo);
        }
        if (this.additionalInfo !== undefined && this.additionalInfo !== null) {
            writer.tgWriteString(this.additionalInfo);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SponsoredPeer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _randomId = reader.tgReadBytes();
        args.randomId = _randomId;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _sponsorInfo = reader.tgReadString();
            args.sponsorInfo = _sponsorInfo;
        } else {
            args.sponsorInfo = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _additionalInfo = reader.tgReadString();
            args.additionalInfo = _additionalInfo;
        } else {
            args.additionalInfo = undefined;
        }
        return new SponsoredPeer(args);
    }
}