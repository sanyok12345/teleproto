import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBotBusinessConnection } from "./TypeBotBusinessConnection";

export class UpdateBotBusinessConnect extends TLObject {
    static CONSTRUCTOR_ID = 2330315130;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotBusinessConnect";
    static classType = "constructor";

    connection!: TypeBotBusinessConnection;
    qts!: number;

    constructor(args: { connection?: TypeBotBusinessConnection, qts?: number } = {}) {
        super();
        this.connection = args.connection!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2330315130, false);
        writer.write(this.connection.getBytes());
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotBusinessConnect {
        const args: any = {};
        const _connection = reader.tgReadObject();
        args.connection = _connection;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotBusinessConnect(args);
    }
}