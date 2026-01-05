import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class TogglePinned extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2591400431;
    static SUBCLASS_OF_ID = 1344696591;
    static className = "stories.TogglePinned";
    static classType = "request";

    peer?: EntityLike;
    id?: number[];
    pinned!: boolean;

    constructor(args: { peer?: EntityLike, id?: number[], pinned?: boolean } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
        this.pinned = args.pinned!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2591400431, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        writer.tgWriteBool(this.pinned);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): number[] {
        const result = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): TogglePinned {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        const _pinned = reader.tgReadBool();
        args.pinned = _pinned;
        return new TogglePinned(args);
    }
}