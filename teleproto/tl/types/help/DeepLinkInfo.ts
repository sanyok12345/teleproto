import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessageEntity } from "../TypeMessageEntity";

export class DeepLinkInfo extends TLObject {
    static CONSTRUCTOR_ID = 1783556146;
    static SUBCLASS_OF_ID = 2555030584;
    static className = "help.DeepLinkInfo";
    static classType = "constructor";

    flags!: number;
    updateApp?: boolean;
    message!: string;
    entities?: TypeMessageEntity[];

    constructor(args: { flags?: number, updateApp?: boolean, message?: string, entities?: TypeMessageEntity[] } = {}) {
        super();
        this.flags = args.flags!;
        this.updateApp = args.updateApp;
        this.message = args.message!;
        this.entities = args.entities;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1783556146, false);
        let flags = 0;
        if (this.updateApp) { flags |= 1 << 0; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.updateApp !== undefined && this.updateApp !== null) {
        }
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DeepLinkInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _updateApp = true;
            args.updateApp = _updateApp;
        } else {
            args.updateApp = false;
        }
        const _message = reader.tgReadString();
        args.message = _message;
        if (args.flags & (1 << 1)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        return new DeepLinkInfo(args);
    }
}