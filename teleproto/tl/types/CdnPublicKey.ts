import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class CdnPublicKey extends TLObject {
    static CONSTRUCTOR_ID = 3380800186;
    static SUBCLASS_OF_ID = 383469555;
    static className = "CdnPublicKey";
    static classType = "constructor";

    dcId!: number;
    publicKey!: string;

    constructor(args: { dcId?: number, publicKey?: string } = {}) {
        super();
        this.dcId = args.dcId!;
        this.publicKey = args.publicKey!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3380800186, false);
        writer.writeInt(this.dcId);
        writer.tgWriteString(this.publicKey);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CdnPublicKey {
        const args: any = {};
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _publicKey = reader.tgReadString();
        args.publicKey = _publicKey;
        return new CdnPublicKey(args);
    }
}