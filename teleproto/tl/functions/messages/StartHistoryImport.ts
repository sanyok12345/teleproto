import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class StartHistoryImport extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3023958852;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.StartHistoryImport";
    static classType = "request";

    peer?: EntityLike;
    importId!: bigint;

    constructor(args: { peer?: EntityLike, importId?: bigint } = {}) {
        super();
        this.peer = args.peer;
        this.importId = args.importId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3023958852, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeLargeInt(this.importId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): StartHistoryImport {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _importId = reader.readLargeInt(64);
        args.importId = _importId;
        return new StartHistoryImport(args);
    }
}