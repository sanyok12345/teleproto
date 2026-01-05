import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";

export class AvailableReaction extends TLObject {
    static CONSTRUCTOR_ID = 3229084673;
    static SUBCLASS_OF_ID = 2350685555;
    static className = "AvailableReaction";
    static classType = "constructor";

    flags!: number;
    inactive?: boolean;
    premium?: boolean;
    reaction!: string;
    title!: string;
    staticIcon!: TypeDocument;
    appearAnimation!: TypeDocument;
    selectAnimation!: TypeDocument;
    activateAnimation!: TypeDocument;
    effectAnimation!: TypeDocument;
    aroundAnimation?: TypeDocument;
    centerIcon?: TypeDocument;

    constructor(args: { flags?: number, inactive?: boolean, premium?: boolean, reaction?: string, title?: string, staticIcon?: TypeDocument, appearAnimation?: TypeDocument, selectAnimation?: TypeDocument, activateAnimation?: TypeDocument, effectAnimation?: TypeDocument, aroundAnimation?: TypeDocument, centerIcon?: TypeDocument } = {}) {
        super();
        this.flags = args.flags!;
        this.inactive = args.inactive;
        this.premium = args.premium;
        this.reaction = args.reaction!;
        this.title = args.title!;
        this.staticIcon = args.staticIcon!;
        this.appearAnimation = args.appearAnimation!;
        this.selectAnimation = args.selectAnimation!;
        this.activateAnimation = args.activateAnimation!;
        this.effectAnimation = args.effectAnimation!;
        this.aroundAnimation = args.aroundAnimation;
        this.centerIcon = args.centerIcon;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3229084673, false);
        let flags = 0;
        if (this.inactive) { flags |= 1 << 0; }
        if (this.premium) { flags |= 1 << 2; }
        if (this.aroundAnimation !== undefined && this.aroundAnimation !== null) { flags |= 1 << 1; }
        if (this.centerIcon !== undefined && this.centerIcon !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.inactive !== undefined && this.inactive !== null) {
        }
        if (this.premium !== undefined && this.premium !== null) {
        }
        writer.tgWriteString(this.reaction);
        writer.tgWriteString(this.title);
        writer.write(this.staticIcon.getBytes());
        writer.write(this.appearAnimation.getBytes());
        writer.write(this.selectAnimation.getBytes());
        writer.write(this.activateAnimation.getBytes());
        writer.write(this.effectAnimation.getBytes());
        if (this.aroundAnimation !== undefined && this.aroundAnimation !== null) {
            writer.write(this.aroundAnimation.getBytes());
        }
        if (this.centerIcon !== undefined && this.centerIcon !== null) {
            writer.write(this.centerIcon.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AvailableReaction {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _inactive = true;
            args.inactive = _inactive;
        } else {
            args.inactive = false;
        }
        if (args.flags & (1 << 2)) {
            const _premium = true;
            args.premium = _premium;
        } else {
            args.premium = false;
        }
        const _reaction = reader.tgReadString();
        args.reaction = _reaction;
        const _title = reader.tgReadString();
        args.title = _title;
        const _staticIcon = reader.tgReadObject();
        args.staticIcon = _staticIcon;
        const _appearAnimation = reader.tgReadObject();
        args.appearAnimation = _appearAnimation;
        const _selectAnimation = reader.tgReadObject();
        args.selectAnimation = _selectAnimation;
        const _activateAnimation = reader.tgReadObject();
        args.activateAnimation = _activateAnimation;
        const _effectAnimation = reader.tgReadObject();
        args.effectAnimation = _effectAnimation;
        if (args.flags & (1 << 1)) {
            const _aroundAnimation = reader.tgReadObject();
            args.aroundAnimation = _aroundAnimation;
        } else {
            args.aroundAnimation = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _centerIcon = reader.tgReadObject();
            args.centerIcon = _centerIcon;
        } else {
            args.centerIcon = undefined;
        }
        return new AvailableReaction(args);
    }
}