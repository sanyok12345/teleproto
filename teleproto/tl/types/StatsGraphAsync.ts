import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsGraphAsync extends TLObject {
    static CONSTRUCTOR_ID = 1244130093;
    static SUBCLASS_OF_ID = 2609918291;
    static className = "StatsGraphAsync";
    static classType = "constructor";

    token!: string;

    constructor(args: { token?: string } = {}) {
        super();
        this.token = args.token!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1244130093, false);
        writer.tgWriteString(this.token);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsGraphAsync {
        const args: any = {};
        const _token = reader.tgReadString();
        args.token = _token;
        return new StatsGraphAsync(args);
    }
}