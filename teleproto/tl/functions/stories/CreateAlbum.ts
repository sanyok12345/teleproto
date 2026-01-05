import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStoryAlbum } from "../../types/TypeStoryAlbum";

export class CreateAlbum extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2741212901;
    static SUBCLASS_OF_ID = 2089574050;
    static className = "stories.CreateAlbum";
    static classType = "request";

    peer?: EntityLike;
    title!: string;
    stories!: number[];

    constructor(args: { peer?: EntityLike, title?: string, stories?: number[] } = {}) {
        super();
        this.peer = args.peer;
        this.title = args.title!;
        this.stories = args.stories!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2741212901, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.title);
        writer.writeVector(this.stories, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStoryAlbum {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CreateAlbum {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _title = reader.tgReadString();
        args.title = _title;
        const _stories = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.stories = _stories;
        return new CreateAlbum(args);
    }
}