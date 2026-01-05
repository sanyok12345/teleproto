import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditTitle extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1450044624;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.EditTitle";
    static classType = "request";

    channel?: EntityLike;
    title!: string;

    constructor(args: { channel?: EntityLike, title?: string } = {}) {
        super();
        this.channel = args.channel;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1450044624, false);
        writer.write((this.channel! as any).getBytes());
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditTitle {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _title = reader.tgReadString();
        args.title = _title;
        return new EditTitle(args);
    }
}