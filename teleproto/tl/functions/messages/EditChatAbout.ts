import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class EditChatAbout extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3740665751;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.EditChatAbout";
    static classType = "request";

    peer?: EntityLike;
    about!: string;

    constructor(args: { peer?: EntityLike, about?: string } = {}) {
        super();
        this.peer = args.peer;
        this.about = args.about!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3740665751, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.about);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditChatAbout {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _about = reader.tgReadString();
        args.about = _about;
        return new EditChatAbout(args);
    }
}