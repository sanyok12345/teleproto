import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBotInlineResult } from "../../types/TypeInputBotInlineResult";
import { EntityLike } from "../../types/../../define";
import { TypeInlineQueryPeerType } from "../../types/TypeInlineQueryPeerType";
import { TypeBotPreparedInlineMessage } from "../../types/messages/TypeBotPreparedInlineMessage";

export class SavePreparedInlineMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4062150447;
    static SUBCLASS_OF_ID = 4019263931;
    static className = "messages.SavePreparedInlineMessage";
    static classType = "request";

    flags?: number;
    result!: TypeInputBotInlineResult;
    userId!: EntityLike;
    peerTypes?: TypeInlineQueryPeerType[];

    constructor(args: { flags?: number, result?: TypeInputBotInlineResult, userId?: EntityLike, peerTypes?: TypeInlineQueryPeerType[] } = {}) {
        super();
        this.flags = args.flags;
        this.result = args.result!;
        this.userId = args.userId!;
        this.peerTypes = args.peerTypes;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4062150447, false);
        let flags = 0;
        if (this.peerTypes !== undefined && this.peerTypes !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.result.getBytes());
        writer.write((this.userId as any).getBytes());
        if (this.peerTypes !== undefined && this.peerTypes !== null) {
            writer.writeVector(this.peerTypes, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotPreparedInlineMessage {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SavePreparedInlineMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _result = reader.tgReadObject();
        args.result = _result;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        if (args.flags & (1 << 0)) {
            const _peerTypes = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.peerTypes = _peerTypes;
        } else {
            args.peerTypes = undefined;
        }
        return new SavePreparedInlineMessage(args);
    }
}