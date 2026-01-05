import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBotApp } from "./TypeBotApp";

export class MessageActionBotAllowed extends TLObject {
    static CONSTRUCTOR_ID = 3306608249;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionBotAllowed";
    static classType = "constructor";

    flags!: number;
    attachMenu?: boolean;
    fromRequest?: boolean;
    domain?: string;
    app?: TypeBotApp;

    constructor(args: { flags?: number, attachMenu?: boolean, fromRequest?: boolean, domain?: string, app?: TypeBotApp } = {}) {
        super();
        this.flags = args.flags!;
        this.attachMenu = args.attachMenu;
        this.fromRequest = args.fromRequest;
        this.domain = args.domain;
        this.app = args.app;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3306608249, false);
        let flags = 0;
        if (this.attachMenu) { flags |= 1 << 1; }
        if (this.fromRequest) { flags |= 1 << 3; }
        if (this.domain !== undefined && this.domain !== null) { flags |= 1 << 0; }
        if (this.app !== undefined && this.app !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.attachMenu !== undefined && this.attachMenu !== null) {
        }
        if (this.fromRequest !== undefined && this.fromRequest !== null) {
        }
        if (this.domain !== undefined && this.domain !== null) {
            writer.tgWriteString(this.domain);
        }
        if (this.app !== undefined && this.app !== null) {
            writer.write(this.app.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionBotAllowed {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _attachMenu = true;
            args.attachMenu = _attachMenu;
        } else {
            args.attachMenu = false;
        }
        if (args.flags & (1 << 3)) {
            const _fromRequest = true;
            args.fromRequest = _fromRequest;
        } else {
            args.fromRequest = false;
        }
        if (args.flags & (1 << 0)) {
            const _domain = reader.tgReadString();
            args.domain = _domain;
        } else {
            args.domain = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _app = reader.tgReadObject();
            args.app = _app;
        } else {
            args.app = undefined;
        }
        return new MessageActionBotAllowed(args);
    }
}