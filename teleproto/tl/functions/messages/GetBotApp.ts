import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBotApp } from "../../types/TypeInputBotApp";
import { TypeBotApp } from "../../types/messages/TypeBotApp";

export class GetBotApp extends MTProtoRequest {
    static CONSTRUCTOR_ID = 889046467;
    static SUBCLASS_OF_ID = 2406630311;
    static className = "messages.GetBotApp";
    static classType = "request";

    app!: TypeInputBotApp;
    hash?: bigint;

    constructor(args: { app?: TypeInputBotApp, hash?: bigint } = {}) {
        super();
        this.app = args.app!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(889046467, false);
        writer.write(this.app.getBytes());
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotApp {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBotApp {
        const args: any = {};
        const _app = reader.tgReadObject();
        args.app = _app;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetBotApp(args);
    }
}