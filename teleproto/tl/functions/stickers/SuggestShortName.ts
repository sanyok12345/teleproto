import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSuggestedShortName } from "../../types/stickers/TypeSuggestedShortName";

export class SuggestShortName extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1303364867;
    static SUBCLASS_OF_ID = 3293203233;
    static className = "stickers.SuggestShortName";
    static classType = "request";

    title!: string;

    constructor(args: { title?: string } = {}) {
        super();
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1303364867, false);
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSuggestedShortName {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SuggestShortName {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        return new SuggestShortName(args);
    }
}