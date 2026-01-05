import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ToggleAllStoriesHidden extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2082822084;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "stories.ToggleAllStoriesHidden";
    static classType = "request";

    hidden!: boolean;

    constructor(args: { hidden?: boolean } = {}) {
        super();
        this.hidden = args.hidden!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2082822084, false);
        writer.tgWriteBool(this.hidden);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleAllStoriesHidden {
        const args: any = {};
        const _hidden = reader.tgReadBool();
        args.hidden = _hidden;
        return new ToggleAllStoriesHidden(args);
    }
}