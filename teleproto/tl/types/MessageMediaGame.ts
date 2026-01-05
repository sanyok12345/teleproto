import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGame } from "./TypeGame";

export class MessageMediaGame extends TLObject {
    static CONSTRUCTOR_ID = 4256272392;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaGame";
    static classType = "constructor";

    game!: TypeGame;

    constructor(args: { game?: TypeGame } = {}) {
        super();
        this.game = args.game!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4256272392, false);
        writer.write(this.game.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaGame {
        const args: any = {};
        const _game = reader.tgReadObject();
        args.game = _game;
        return new MessageMediaGame(args);
    }
}