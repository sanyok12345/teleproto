import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class DismissSuggestion extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4111317665;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "help.DismissSuggestion";
    static classType = "request";

    peer?: EntityLike;
    suggestion!: string;

    constructor(args: { peer?: EntityLike, suggestion?: string } = {}) {
        super();
        this.peer = args.peer;
        this.suggestion = args.suggestion!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4111317665, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.suggestion);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DismissSuggestion {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _suggestion = reader.tgReadString();
        args.suggestion = _suggestion;
        return new DismissSuggestion(args);
    }
}