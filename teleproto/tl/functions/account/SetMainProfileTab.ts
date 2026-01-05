import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeProfileTab } from "../../types/TypeProfileTab";

export class SetMainProfileTab extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1575909552;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SetMainProfileTab";
    static classType = "request";

    tab!: TypeProfileTab;

    constructor(args: { tab?: TypeProfileTab } = {}) {
        super();
        this.tab = args.tab!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1575909552, false);
        writer.write(this.tab.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetMainProfileTab {
        const args: any = {};
        const _tab = reader.tgReadObject();
        args.tab = _tab;
        return new SetMainProfileTab(args);
    }
}