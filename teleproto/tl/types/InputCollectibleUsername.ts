import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputCollectibleUsername extends TLObject {
    static CONSTRUCTOR_ID = 3818152105;
    static SUBCLASS_OF_ID = 705659371;
    static className = "InputCollectibleUsername";
    static classType = "constructor";

    username!: string;

    constructor(args: { username?: string } = {}) {
        super();
        this.username = args.username!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3818152105, false);
        writer.tgWriteString(this.username);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputCollectibleUsername {
        const args: any = {};
        const _username = reader.tgReadString();
        args.username = _username;
        return new InputCollectibleUsername(args);
    }
}