import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessagesFilter } from "../../types/TypeMessagesFilter";
import { TypeSearchResultsCalendar } from "../../types/messages/TypeSearchResultsCalendar";

export class GetSearchResultsCalendar extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1789130429;
    static SUBCLASS_OF_ID = 2462409743;
    static className = "messages.GetSearchResultsCalendar";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    savedPeerId?: EntityLike;
    filter!: TypeMessagesFilter;
    offsetId!: number;
    offsetDate!: number;

    constructor(args: { flags?: number, peer?: EntityLike, savedPeerId?: EntityLike, filter?: TypeMessagesFilter, offsetId?: number, offsetDate?: number } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.savedPeerId = args.savedPeerId;
        this.filter = args.filter!;
        this.offsetId = args.offsetId!;
        this.offsetDate = args.offsetDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1789130429, false);
        let flags = 0;
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write((this.savedPeerId as any).getBytes());
        }
        writer.write(this.filter.getBytes());
        writer.writeInt(this.offsetId);
        writer.writeInt(this.offsetDate);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSearchResultsCalendar {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSearchResultsCalendar {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 2)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _offsetId = reader.readInt();
        args.offsetId = _offsetId;
        const _offsetDate = reader.readInt();
        args.offsetDate = _offsetDate;
        return new GetSearchResultsCalendar(args);
    }
}