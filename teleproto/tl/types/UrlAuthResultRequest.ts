import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeUser } from "./TypeUser";

export class UrlAuthResultRequest extends TLObject {
    static CONSTRUCTOR_ID = 2463316494;
    static SUBCLASS_OF_ID = 2003159838;
    static className = "UrlAuthResultRequest";
    static classType = "constructor";

    flags!: number;
    requestWriteAccess?: boolean;
    bot!: TypeUser;
    domain!: string;

    constructor(args: { flags?: number, requestWriteAccess?: boolean, bot?: TypeUser, domain?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.requestWriteAccess = args.requestWriteAccess;
        this.bot = args.bot!;
        this.domain = args.domain!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2463316494, false);
        let flags = 0;
        if (this.requestWriteAccess) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.requestWriteAccess !== undefined && this.requestWriteAccess !== null) {
        }
        writer.write(this.bot.getBytes());
        writer.tgWriteString(this.domain);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UrlAuthResultRequest {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _requestWriteAccess = true;
            args.requestWriteAccess = _requestWriteAccess;
        } else {
            args.requestWriteAccess = false;
        }
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _domain = reader.tgReadString();
        args.domain = _domain;
        return new UrlAuthResultRequest(args);
    }
}