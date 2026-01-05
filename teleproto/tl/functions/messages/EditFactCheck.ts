import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeTextWithEntities } from "../../types/TypeTextWithEntities";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditFactCheck extends MTProtoRequest {
    static CONSTRUCTOR_ID = 92925557;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.EditFactCheck";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    text!: TypeTextWithEntities;

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, text?: TypeTextWithEntities } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(92925557, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.write(this.text.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditFactCheck {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _text = reader.tgReadObject();
        args.text = _text;
        return new EditFactCheck(args);
    }
}