import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ToggleConnectedBotPaused extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1684934807;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ToggleConnectedBotPaused";
    static classType = "request";

    peer?: EntityLike;
    paused!: boolean;

    constructor(args: { peer?: EntityLike, paused?: boolean } = {}) {
        super();
        this.peer = args.peer;
        this.paused = args.paused!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1684934807, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteBool(this.paused);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleConnectedBotPaused {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _paused = reader.tgReadBool();
        args.paused = _paused;
        return new ToggleConnectedBotPaused(args);
    }
}