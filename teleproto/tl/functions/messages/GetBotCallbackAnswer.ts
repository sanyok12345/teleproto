import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";
import { TypeBotCallbackAnswer } from "../../types/messages/TypeBotCallbackAnswer";

export class GetBotCallbackAnswer extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2470627847;
    static SUBCLASS_OF_ID = 1817039244;
    static className = "messages.GetBotCallbackAnswer";
    static classType = "request";

    flags?: number;
    game?: boolean;
    peer?: EntityLike;
    msgId?: MessageIDLike;
    data?: Buffer;
    password?: TypeInputCheckPasswordSRP;

    constructor(args: { flags?: number, game?: boolean, peer?: EntityLike, msgId?: MessageIDLike, data?: Buffer, password?: TypeInputCheckPasswordSRP } = {}) {
        super();
        this.flags = args.flags;
        this.game = args.game;
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.data = args.data;
        this.password = args.password;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2470627847, false);
        let flags = 0;
        if (this.game) { flags |= 1 << 1; }
        if (this.data !== undefined && this.data !== null) { flags |= 1 << 0; }
        if (this.password !== undefined && this.password !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.game !== undefined && this.game !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        if (this.data !== undefined && this.data !== null) {
            writer.tgWriteBytes(this.data);
        }
        if (this.password !== undefined && this.password !== null) {
            writer.write(this.password.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotCallbackAnswer {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBotCallbackAnswer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _game = true;
            args.game = _game;
        } else {
            args.game = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        if (args.flags & (1 << 0)) {
            const _data = reader.tgReadBytes();
            args.data = _data;
        } else {
            args.data = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _password = reader.tgReadObject();
            args.password = _password;
        } else {
            args.password = undefined;
        }
        return new GetBotCallbackAnswer(args);
    }
}