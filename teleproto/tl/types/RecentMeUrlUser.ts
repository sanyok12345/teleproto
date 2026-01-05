import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RecentMeUrlUser extends TLObject {
    static CONSTRUCTOR_ID = 3106671074;
    static SUBCLASS_OF_ID = 1436889209;
    static className = "RecentMeUrlUser";
    static classType = "constructor";

    url!: string;
    userId!: bigint;

    constructor(args: { url?: string, userId?: bigint } = {}) {
        super();
        this.url = args.url!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3106671074, false);
        writer.tgWriteString(this.url);
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RecentMeUrlUser {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new RecentMeUrlUser(args);
    }
}