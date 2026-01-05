import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMyBoosts } from "../../types/premium/TypeMyBoosts";

export class ApplyBoost extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1803396934;
    static SUBCLASS_OF_ID = 2905936603;
    static className = "premium.ApplyBoost";
    static classType = "request";

    flags?: number;
    slots?: number[];
    peer?: EntityLike;

    constructor(args: { flags?: number, slots?: number[], peer?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.slots = args.slots;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1803396934, false);
        let flags = 0;
        if (this.slots !== undefined && this.slots !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.slots !== undefined && this.slots !== null) {
            writer.writeVector(this.slots, (item) => {
                writer.writeInt(item);
            });
        }
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMyBoosts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ApplyBoost {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _slots = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.slots = _slots;
        } else {
            args.slots = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new ApplyBoost(args);
    }
}