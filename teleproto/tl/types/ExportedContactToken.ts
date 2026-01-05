import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ExportedContactToken extends TLObject {
    static CONSTRUCTOR_ID = 1103040667;
    static SUBCLASS_OF_ID = 2262679249;
    static className = "ExportedContactToken";
    static classType = "constructor";

    url!: string;
    expires!: number;

    constructor(args: { url?: string, expires?: number } = {}) {
        super();
        this.url = args.url!;
        this.expires = args.expires!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1103040667, false);
        writer.tgWriteString(this.url);
        writer.writeInt(this.expires);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedContactToken {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _expires = reader.readInt();
        args.expires = _expires;
        return new ExportedContactToken(args);
    }
}