import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeBotApp } from "../TypeBotApp";

export class BotApp extends TLObject {
    static CONSTRUCTOR_ID = 3947933173;
    static SUBCLASS_OF_ID = 2406630311;
    static className = "messages.BotApp";
    static classType = "constructor";

    flags!: number;
    inactive?: boolean;
    requestWriteAccess?: boolean;
    hasSettings?: boolean;
    app!: TypeBotApp;

    constructor(args: { flags?: number, inactive?: boolean, requestWriteAccess?: boolean, hasSettings?: boolean, app?: TypeBotApp } = {}) {
        super();
        this.flags = args.flags!;
        this.inactive = args.inactive;
        this.requestWriteAccess = args.requestWriteAccess;
        this.hasSettings = args.hasSettings;
        this.app = args.app!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3947933173, false);
        let flags = 0;
        if (this.inactive) { flags |= 1 << 0; }
        if (this.requestWriteAccess) { flags |= 1 << 1; }
        if (this.hasSettings) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.inactive !== undefined && this.inactive !== null) {
        }
        if (this.requestWriteAccess !== undefined && this.requestWriteAccess !== null) {
        }
        if (this.hasSettings !== undefined && this.hasSettings !== null) {
        }
        writer.write(this.app.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotApp {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _inactive = true;
            args.inactive = _inactive;
        } else {
            args.inactive = false;
        }
        if (args.flags & (1 << 1)) {
            const _requestWriteAccess = true;
            args.requestWriteAccess = _requestWriteAccess;
        } else {
            args.requestWriteAccess = false;
        }
        if (args.flags & (1 << 2)) {
            const _hasSettings = true;
            args.hasSettings = _hasSettings;
        } else {
            args.hasSettings = false;
        }
        const _app = reader.tgReadObject();
        args.app = _app;
        return new BotApp(args);
    }
}