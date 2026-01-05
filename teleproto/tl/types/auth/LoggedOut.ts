import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class LoggedOut extends TLObject {
    static CONSTRUCTOR_ID = 3282207583;
    static SUBCLASS_OF_ID = 176177941;
    static className = "auth.LoggedOut";
    static classType = "constructor";

    flags!: number;
    futureAuthToken?: Buffer;

    constructor(args: { flags?: number, futureAuthToken?: Buffer } = {}) {
        super();
        this.flags = args.flags!;
        this.futureAuthToken = args.futureAuthToken;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3282207583, false);
        let flags = 0;
        if (this.futureAuthToken !== undefined && this.futureAuthToken !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.futureAuthToken !== undefined && this.futureAuthToken !== null) {
            writer.tgWriteBytes(this.futureAuthToken);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LoggedOut {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _futureAuthToken = reader.tgReadBytes();
            args.futureAuthToken = _futureAuthToken;
        } else {
            args.futureAuthToken = undefined;
        }
        return new LoggedOut(args);
    }
}