import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PeerSelfLocated extends TLObject {
    static CONSTRUCTOR_ID = 4176226379;
    static SUBCLASS_OF_ID = 4208604332;
    static className = "PeerSelfLocated";
    static classType = "constructor";

    expires!: number;

    constructor(args: { expires?: number } = {}) {
        super();
        this.expires = args.expires!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4176226379, false);
        writer.writeInt(this.expires);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerSelfLocated {
        const args: any = {};
        const _expires = reader.readInt();
        args.expires = _expires;
        return new PeerSelfLocated(args);
    }
}