import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class StatsGraph extends TLObject {
    static CONSTRUCTOR_ID = 2393138358;
    static SUBCLASS_OF_ID = 2609918291;
    static className = "StatsGraph";
    static classType = "constructor";

    flags!: number;
    json!: TypeDataJSON;
    zoomToken?: string;

    constructor(args: { flags?: number, json?: TypeDataJSON, zoomToken?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.json = args.json!;
        this.zoomToken = args.zoomToken;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2393138358, false);
        let flags = 0;
        if (this.zoomToken !== undefined && this.zoomToken !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.json.getBytes());
        if (this.zoomToken !== undefined && this.zoomToken !== null) {
            writer.tgWriteString(this.zoomToken);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsGraph {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _json = reader.tgReadObject();
        args.json = _json;
        if (args.flags & (1 << 0)) {
            const _zoomToken = reader.tgReadString();
            args.zoomToken = _zoomToken;
        } else {
            args.zoomToken = undefined;
        }
        return new StatsGraph(args);
    }
}