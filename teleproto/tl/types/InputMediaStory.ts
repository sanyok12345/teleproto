import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputMediaStory extends TLObject {
    static CONSTRUCTOR_ID = 2315114360;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaStory";
    static classType = "constructor";

    peer!: TypeInputPeer;
    id!: number;

    constructor(args: { peer?: TypeInputPeer, id?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2315114360, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.id);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaStory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        return new InputMediaStory(args);
    }
}