import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAllStories } from "../../types/stories/TypeAllStories";

export class GetAllStories extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4004566565;
    static SUBCLASS_OF_ID = 2120274125;
    static className = "stories.GetAllStories";
    static classType = "request";

    flags?: number;
    next?: boolean;
    hidden?: boolean;
    state?: string;

    constructor(args: { flags?: number, next?: boolean, hidden?: boolean, state?: string } = {}) {
        super();
        this.flags = args.flags;
        this.next = args.next;
        this.hidden = args.hidden;
        this.state = args.state;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4004566565, false);
        let flags = 0;
        if (this.next) { flags |= 1 << 1; }
        if (this.hidden) { flags |= 1 << 2; }
        if (this.state !== undefined && this.state !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.next !== undefined && this.next !== null) {
        }
        if (this.hidden !== undefined && this.hidden !== null) {
        }
        if (this.state !== undefined && this.state !== null) {
            writer.tgWriteString(this.state);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAllStories {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAllStories {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _next = true;
            args.next = _next;
        } else {
            args.next = false;
        }
        if (args.flags & (1 << 2)) {
            const _hidden = true;
            args.hidden = _hidden;
        } else {
            args.hidden = false;
        }
        if (args.flags & (1 << 0)) {
            const _state = reader.tgReadString();
            args.state = _state;
        } else {
            args.state = undefined;
        }
        return new GetAllStories(args);
    }
}