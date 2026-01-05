import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NewSessionCreated extends TLObject {
    static CONSTRUCTOR_ID = 2663516424;
    static SUBCLASS_OF_ID = 1359818801;
    static className = "NewSessionCreated";
    static classType = "constructor";

    firstMsgId!: bigint;
    uniqueId!: bigint;
    serverSalt!: bigint;

    constructor(args: { firstMsgId?: bigint, uniqueId?: bigint, serverSalt?: bigint } = {}) {
        super();
        this.firstMsgId = args.firstMsgId!;
        this.uniqueId = args.uniqueId!;
        this.serverSalt = args.serverSalt!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2663516424, false);
        writer.writeLargeInt(this.firstMsgId, 64);
        writer.writeLargeInt(this.uniqueId, 64);
        writer.writeLargeInt(this.serverSalt, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NewSessionCreated {
        const args: any = {};
        const _firstMsgId = reader.readLargeInt(64);
        args.firstMsgId = _firstMsgId;
        const _uniqueId = reader.readLargeInt(64);
        args.uniqueId = _uniqueId;
        const _serverSalt = reader.readLargeInt(64);
        args.serverSalt = _serverSalt;
        return new NewSessionCreated(args);
    }
}