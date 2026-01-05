import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPeerColorCollectible extends TLObject {
    static CONSTRUCTOR_ID = 3102377641;
    static SUBCLASS_OF_ID = 4068582527;
    static className = "InputPeerColorCollectible";
    static classType = "constructor";

    collectibleId!: bigint;

    constructor(args: { collectibleId?: bigint } = {}) {
        super();
        this.collectibleId = args.collectibleId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3102377641, false);
        writer.writeLargeInt(this.collectibleId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerColorCollectible {
        const args: any = {};
        const _collectibleId = reader.readLargeInt(64);
        args.collectibleId = _collectibleId;
        return new InputPeerColorCollectible(args);
    }
}