import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReportSpam extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4098523925;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.ReportSpam";
    static classType = "request";

    channel?: EntityLike;
    participant!: EntityLike;
    id?: number[];

    constructor(args: { channel?: EntityLike, participant?: EntityLike, id?: number[] } = {}) {
        super();
        this.channel = args.channel;
        this.participant = args.participant!;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4098523925, false);
        writer.write((this.channel! as any).getBytes());
        writer.write((this.participant as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReportSpam {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new ReportSpam(args);
    }
}