import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGame } from "./TypeInputGame";

export class InputMediaGame extends TLObject {
    static CONSTRUCTOR_ID = 3544138739;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaGame";
    static classType = "constructor";

    id!: TypeInputGame;

    constructor(args: { id?: TypeInputGame } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3544138739, false);
        writer.write(this.id.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaGame {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        return new InputMediaGame(args);
    }
}