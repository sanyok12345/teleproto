import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputFile } from "../../types/TypeInputFile";
import { TypeHistoryImport } from "../../types/messages/TypeHistoryImport";

export class InitHistoryImport extends MTProtoRequest {
    static CONSTRUCTOR_ID = 873008187;
    static SUBCLASS_OF_ID = 2978723082;
    static className = "messages.InitHistoryImport";
    static classType = "request";

    peer?: EntityLike;
    file!: TypeInputFile;
    mediaCount!: number;

    constructor(args: { peer?: EntityLike, file?: TypeInputFile, mediaCount?: number } = {}) {
        super();
        this.peer = args.peer;
        this.file = args.file!;
        this.mediaCount = args.mediaCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(873008187, false);
        writer.write((this.peer! as any).getBytes());
        writer.write(this.file.getBytes());
        writer.writeInt(this.mediaCount);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeHistoryImport {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InitHistoryImport {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _file = reader.tgReadObject();
        args.file = _file;
        const _mediaCount = reader.readInt();
        args.mediaCount = _mediaCount;
        return new InitHistoryImport(args);
    }
}