import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeExportedStoryLink } from "../../types/TypeExportedStoryLink";

export class ExportStoryLink extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2072899360;
    static SUBCLASS_OF_ID = 264585638;
    static className = "stories.ExportStoryLink";
    static classType = "request";

    peer?: EntityLike;
    id?: number;

    constructor(args: { peer?: EntityLike, id?: number } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2072899360, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedStoryLink {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportStoryLink {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        return new ExportStoryLink(args);
    }
}