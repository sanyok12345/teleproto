import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class StartBot extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3873403768;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.StartBot";
    static classType = "request";

    bot?: EntityLike;
    peer?: EntityLike;
    randomId!: bigint;
    startParam!: string;

    constructor(args: { bot?: EntityLike, peer?: EntityLike, randomId?: bigint, startParam?: string } = {}) {
        super();
        this.bot = args.bot;
        this.peer = args.peer;
        this.randomId = args.randomId!;
        this.startParam = args.startParam!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3873403768, false);
        writer.write((this.bot! as any).getBytes());
        writer.write((this.peer! as any).getBytes());
        writer.writeLargeInt(this.randomId, 64);
        writer.tgWriteString(this.startParam);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): StartBot {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _startParam = reader.tgReadString();
        args.startParam = _startParam;
        return new StartBot(args);
    }
}