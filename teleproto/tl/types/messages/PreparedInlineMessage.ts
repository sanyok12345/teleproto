import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeBotInlineResult } from "../TypeBotInlineResult";
import { TypeInlineQueryPeerType } from "../TypeInlineQueryPeerType";
import { TypeUser } from "../TypeUser";

export class PreparedInlineMessage extends TLObject {
    static CONSTRUCTOR_ID = 4283920525;
    static SUBCLASS_OF_ID = 1225645901;
    static className = "messages.PreparedInlineMessage";
    static classType = "constructor";

    queryId!: bigint;
    result!: TypeBotInlineResult;
    peerTypes!: TypeInlineQueryPeerType[];
    cacheTime!: number;
    users!: TypeUser[];

    constructor(args: { queryId?: bigint, result?: TypeBotInlineResult, peerTypes?: TypeInlineQueryPeerType[], cacheTime?: number, users?: TypeUser[] } = {}) {
        super();
        this.queryId = args.queryId!;
        this.result = args.result!;
        this.peerTypes = args.peerTypes!;
        this.cacheTime = args.cacheTime!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4283920525, false);
        writer.writeLargeInt(this.queryId, 64);
        writer.write(this.result.getBytes());
        writer.writeVector(this.peerTypes, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.cacheTime);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PreparedInlineMessage {
        const args: any = {};
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _result = reader.tgReadObject();
        args.result = _result;
        const _peerTypes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peerTypes = _peerTypes;
        const _cacheTime = reader.readInt();
        args.cacheTime = _cacheTime;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PreparedInlineMessage(args);
    }
}