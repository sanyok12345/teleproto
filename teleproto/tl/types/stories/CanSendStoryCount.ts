import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CanSendStoryCount extends TLObject {
    static CONSTRUCTOR_ID = 3280453710;
    static SUBCLASS_OF_ID = 3411255960;
    static className = "stories.CanSendStoryCount";
    static classType = "constructor";

    countRemains!: number;

    constructor(args: { countRemains?: number } = {}) {
        super();
        this.countRemains = args.countRemains!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3280453710, false);
        writer.writeInt(this.countRemains);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CanSendStoryCount {
        const args: any = {};
        const _countRemains = reader.readInt();
        args.countRemains = _countRemains;
        return new CanSendStoryCount(args);
    }
}