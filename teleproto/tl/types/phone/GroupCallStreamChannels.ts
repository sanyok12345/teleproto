import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeGroupCallStreamChannel } from "../TypeGroupCallStreamChannel";

export class GroupCallStreamChannels extends TLObject {
    static CONSTRUCTOR_ID = 3504636594;
    static SUBCLASS_OF_ID = 2438448612;
    static className = "phone.GroupCallStreamChannels";
    static classType = "constructor";

    channels!: TypeGroupCallStreamChannel[];

    constructor(args: { channels?: TypeGroupCallStreamChannel[] } = {}) {
        super();
        this.channels = args.channels!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3504636594, false);
        writer.writeVector(this.channels, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallStreamChannels {
        const args: any = {};
        const _channels = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.channels = _channels;
        return new GroupCallStreamChannels(args);
    }
}