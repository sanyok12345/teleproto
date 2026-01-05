import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { EntityLike } from "../../types/../../define";
import { TypeGroupParticipants } from "../../types/phone/TypeGroupParticipants";

export class GetGroupParticipants extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3310934187;
    static SUBCLASS_OF_ID = 1926431988;
    static className = "phone.GetGroupParticipants";
    static classType = "request";

    call!: TypeInputGroupCall;
    ids!: EntityLike[];
    sources!: number[];
    offset!: string;
    limit!: number;

    constructor(args: { call?: TypeInputGroupCall, ids?: EntityLike[], sources?: number[], offset?: string, limit?: number } = {}) {
        super();
        this.call = args.call!;
        this.ids = args.ids!;
        this.sources = args.sources!;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3310934187, false);
        writer.write(this.call.getBytes());
        writer.writeVector(this.ids, (item) => {
            writer.write((item as any).getBytes());
        });
        writer.writeVector(this.sources, (item) => {
            writer.writeInt(item);
        });
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeGroupParticipants {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGroupParticipants {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _ids = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.ids = _ids;
        const _sources = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.sources = _sources;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetGroupParticipants(args);
    }
}