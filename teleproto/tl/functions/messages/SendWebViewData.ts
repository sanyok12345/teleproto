import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendWebViewData extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3691135688;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendWebViewData";
    static classType = "request";

    bot?: EntityLike;
    randomId!: bigint;
    buttonText!: string;
    data!: string;

    constructor(args: { bot?: EntityLike, randomId?: bigint, buttonText?: string, data?: string } = {}) {
        super();
        this.bot = args.bot;
        this.randomId = args.randomId!;
        this.buttonText = args.buttonText!;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3691135688, false);
        writer.write((this.bot! as any).getBytes());
        writer.writeLargeInt(this.randomId, 64);
        writer.tgWriteString(this.buttonText);
        writer.tgWriteString(this.data);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendWebViewData {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _buttonText = reader.tgReadString();
        args.buttonText = _buttonText;
        const _data = reader.tgReadString();
        args.data = _data;
        return new SendWebViewData(args);
    }
}