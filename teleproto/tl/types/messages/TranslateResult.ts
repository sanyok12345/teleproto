import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeTextWithEntities } from "../TypeTextWithEntities";

export class TranslateResult extends TLObject {
    static CONSTRUCTOR_ID = 870003448;
    static SUBCLASS_OF_ID = 37897192;
    static className = "messages.TranslateResult";
    static classType = "constructor";

    result!: TypeTextWithEntities[];

    constructor(args: { result?: TypeTextWithEntities[] } = {}) {
        super();
        this.result = args.result!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(870003448, false);
        writer.writeVector(this.result, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TranslateResult {
        const args: any = {};
        const _result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.result = _result;
        return new TranslateResult(args);
    }
}