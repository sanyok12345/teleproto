import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRequestPeerType } from "./TypeRequestPeerType";

export class InputKeyboardButtonRequestPeer extends TLObject {
    static CONSTRUCTOR_ID = 3378916613;
    static SUBCLASS_OF_ID = 195916963;
    static className = "InputKeyboardButtonRequestPeer";
    static classType = "constructor";

    flags!: number;
    nameRequested?: boolean;
    usernameRequested?: boolean;
    photoRequested?: boolean;
    text!: string;
    buttonId!: number;
    peerType!: TypeRequestPeerType;
    maxQuantity!: number;

    constructor(args: { flags?: number, nameRequested?: boolean, usernameRequested?: boolean, photoRequested?: boolean, text?: string, buttonId?: number, peerType?: TypeRequestPeerType, maxQuantity?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.nameRequested = args.nameRequested;
        this.usernameRequested = args.usernameRequested;
        this.photoRequested = args.photoRequested;
        this.text = args.text!;
        this.buttonId = args.buttonId!;
        this.peerType = args.peerType!;
        this.maxQuantity = args.maxQuantity!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3378916613, false);
        let flags = 0;
        if (this.nameRequested) { flags |= 1 << 0; }
        if (this.usernameRequested) { flags |= 1 << 1; }
        if (this.photoRequested) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.nameRequested !== undefined && this.nameRequested !== null) {
        }
        if (this.usernameRequested !== undefined && this.usernameRequested !== null) {
        }
        if (this.photoRequested !== undefined && this.photoRequested !== null) {
        }
        writer.tgWriteString(this.text);
        writer.writeInt(this.buttonId);
        writer.write(this.peerType.getBytes());
        writer.writeInt(this.maxQuantity);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputKeyboardButtonRequestPeer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nameRequested = true;
            args.nameRequested = _nameRequested;
        } else {
            args.nameRequested = false;
        }
        if (args.flags & (1 << 1)) {
            const _usernameRequested = true;
            args.usernameRequested = _usernameRequested;
        } else {
            args.usernameRequested = false;
        }
        if (args.flags & (1 << 2)) {
            const _photoRequested = true;
            args.photoRequested = _photoRequested;
        } else {
            args.photoRequested = false;
        }
        const _text = reader.tgReadString();
        args.text = _text;
        const _buttonId = reader.readInt();
        args.buttonId = _buttonId;
        const _peerType = reader.tgReadObject();
        args.peerType = _peerType;
        const _maxQuantity = reader.readInt();
        args.maxQuantity = _maxQuantity;
        return new InputKeyboardButtonRequestPeer(args);
    }
}