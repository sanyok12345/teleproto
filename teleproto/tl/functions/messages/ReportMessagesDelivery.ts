import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReportMessagesDelivery extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1517122453;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReportMessagesDelivery";
    static classType = "request";

    flags?: number;
    push?: boolean;
    peer?: EntityLike;
    id?: number[];

    constructor(args: { flags?: number, push?: boolean, peer?: EntityLike, id?: number[] } = {}) {
        super();
        this.flags = args.flags;
        this.push = args.push;
        this.peer = args.peer;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1517122453, false);
        let flags = 0;
        if (this.push) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.push !== undefined && this.push !== null) {
        }
        writer.write((this.peer! as any).getBytes());
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

    static fromReader(reader: BinaryReader): ReportMessagesDelivery {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _push = true;
            args.push = _push;
        } else {
            args.push = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new ReportMessagesDelivery(args);
    }
}