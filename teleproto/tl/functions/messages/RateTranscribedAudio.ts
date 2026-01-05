import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";

export class RateTranscribedAudio extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2132608815;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.RateTranscribedAudio";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    transcriptionId!: bigint;
    good!: boolean;

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, transcriptionId?: bigint, good?: boolean } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.transcriptionId = args.transcriptionId!;
        this.good = args.good!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2132608815, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.writeLargeInt(this.transcriptionId, 64);
        writer.tgWriteBool(this.good);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RateTranscribedAudio {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _transcriptionId = reader.readLargeInt(64);
        args.transcriptionId = _transcriptionId;
        const _good = reader.tgReadBool();
        args.good = _good;
        return new RateTranscribedAudio(args);
    }
}