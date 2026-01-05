import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReadMessageContents extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3937786936;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.ReadMessageContents";
    static classType = "request";

    channel?: EntityLike;
    id?: number[];

    constructor(args: { channel?: EntityLike, id?: number[] } = {}) {
        super();
        this.channel = args.channel;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3937786936, false);
        writer.write((this.channel! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReadMessageContents {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new ReadMessageContents(args);
    }
}