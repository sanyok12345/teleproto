import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class UpdateBotWebhookJSON extends TLObject {
    static CONSTRUCTOR_ID = 2199371971;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotWebhookJSON";
    static classType = "constructor";

    data!: TypeDataJSON;

    constructor(args: { data?: TypeDataJSON } = {}) {
        super();
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2199371971, false);
        writer.write(this.data.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotWebhookJSON {
        const args: any = {};
        const _data = reader.tgReadObject();
        args.data = _data;
        return new UpdateBotWebhookJSON(args);
    }
}