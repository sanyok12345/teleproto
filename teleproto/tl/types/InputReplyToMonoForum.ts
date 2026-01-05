import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputReplyToMonoForum extends TLObject {
    static CONSTRUCTOR_ID = 1775660101;
    static SUBCLASS_OF_ID = 2356220701;
    static className = "InputReplyToMonoForum";
    static classType = "constructor";

    monoforumPeerId!: TypeInputPeer;

    constructor(args: { monoforumPeerId?: TypeInputPeer } = {}) {
        super();
        this.monoforumPeerId = args.monoforumPeerId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1775660101, false);
        writer.write(this.monoforumPeerId.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReplyToMonoForum {
        const args: any = {};
        const _monoforumPeerId = reader.tgReadObject();
        args.monoforumPeerId = _monoforumPeerId;
        return new InputReplyToMonoForum(args);
    }
}