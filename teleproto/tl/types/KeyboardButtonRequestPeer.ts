import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRequestPeerType } from "./TypeRequestPeerType";

export class KeyboardButtonRequestPeer extends TLObject {
    static CONSTRUCTOR_ID = 1406648280;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonRequestPeer";
    static classType = "constructor";

    text!: string;
    buttonId!: number;
    peerType!: TypeRequestPeerType;
    maxQuantity!: number;

    constructor(args: { text?: string, buttonId?: number, peerType?: TypeRequestPeerType, maxQuantity?: number } = {}) {
        super();
        this.text = args.text!;
        this.buttonId = args.buttonId!;
        this.peerType = args.peerType!;
        this.maxQuantity = args.maxQuantity!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1406648280, false);
        writer.tgWriteString(this.text);
        writer.writeInt(this.buttonId);
        writer.write(this.peerType.getBytes());
        writer.writeInt(this.maxQuantity);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonRequestPeer {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _buttonId = reader.readInt();
        args.buttonId = _buttonId;
        const _peerType = reader.tgReadObject();
        args.peerType = _peerType;
        const _maxQuantity = reader.readInt();
        args.maxQuantity = _maxQuantity;
        return new KeyboardButtonRequestPeer(args);
    }
}