import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeReaction } from "../../types/TypeReaction";

export class SetDefaultReaction extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1330094102;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetDefaultReaction";
    static classType = "request";

    reaction!: TypeReaction;

    constructor(args: { reaction?: TypeReaction } = {}) {
        super();
        this.reaction = args.reaction!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1330094102, false);
        writer.write(this.reaction.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetDefaultReaction {
        const args: any = {};
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        return new SetDefaultReaction(args);
    }
}