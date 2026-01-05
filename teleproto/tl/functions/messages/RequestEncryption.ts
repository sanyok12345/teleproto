import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeEncryptedChat } from "../../types/TypeEncryptedChat";

export class RequestEncryption extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4132286275;
    static SUBCLASS_OF_ID = 1831379834;
    static className = "messages.RequestEncryption";
    static classType = "request";

    userId!: EntityLike;
    randomId!: number;
    gA!: Buffer;

    constructor(args: { userId?: EntityLike, randomId?: number, gA?: Buffer } = {}) {
        super();
        this.userId = args.userId!;
        this.randomId = args.randomId!;
        this.gA = args.gA!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4132286275, false);
        writer.write((this.userId as any).getBytes());
        writer.writeInt(this.randomId);
        writer.tgWriteBytes(this.gA);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEncryptedChat {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RequestEncryption {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _randomId = reader.readInt();
        args.randomId = _randomId;
        const _gA = reader.tgReadBytes();
        args.gA = _gA;
        return new RequestEncryption(args);
    }
}