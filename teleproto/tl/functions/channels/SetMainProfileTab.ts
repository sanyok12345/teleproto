import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeProfileTab } from "../../types/TypeProfileTab";

export class SetMainProfileTab extends MTProtoRequest {
    static CONSTRUCTOR_ID = 897842353;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.SetMainProfileTab";
    static classType = "request";

    channel?: EntityLike;
    tab!: TypeProfileTab;

    constructor(args: { channel?: EntityLike, tab?: TypeProfileTab } = {}) {
        super();
        this.channel = args.channel;
        this.tab = args.tab!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(897842353, false);
        writer.write((this.channel! as any).getBytes());
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
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _tab = reader.tgReadObject();
        args.tab = _tab;
        return new SetMainProfileTab(args);
    }
}