import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class TogglePeerStoriesHidden extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3171161540;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "stories.TogglePeerStoriesHidden";
    static classType = "request";

    peer?: EntityLike;
    hidden!: boolean;

    constructor(args: { peer?: EntityLike, hidden?: boolean } = {}) {
        super();
        this.peer = args.peer;
        this.hidden = args.hidden!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3171161540, false);
        writer.write((this.peer! as any).getBytes());
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

    static fromReader(reader: BinaryReader): TogglePeerStoriesHidden {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _hidden = reader.tgReadBool();
        args.hidden = _hidden;
        return new TogglePeerStoriesHidden(args);
    }
}