import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeNotificationSound } from "./TypeNotificationSound";

export class InputPeerNotifySettings extends TLObject {
    static CONSTRUCTOR_ID = 3402328802;
    static SUBCLASS_OF_ID = 2430274317;
    static className = "InputPeerNotifySettings";
    static classType = "constructor";

    flags!: number;
    showPreviews?: boolean;
    silent?: boolean;
    muteUntil?: number;
    sound?: TypeNotificationSound;
    storiesMuted?: boolean;
    storiesHideSender?: boolean;
    storiesSound?: TypeNotificationSound;

    constructor(args: { flags?: number, showPreviews?: boolean, silent?: boolean, muteUntil?: number, sound?: TypeNotificationSound, storiesMuted?: boolean, storiesHideSender?: boolean, storiesSound?: TypeNotificationSound } = {}) {
        super();
        this.flags = args.flags!;
        this.showPreviews = args.showPreviews;
        this.silent = args.silent;
        this.muteUntil = args.muteUntil;
        this.sound = args.sound;
        this.storiesMuted = args.storiesMuted;
        this.storiesHideSender = args.storiesHideSender;
        this.storiesSound = args.storiesSound;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3402328802, false);
        let flags = 0;
        if (this.showPreviews !== undefined && this.showPreviews !== null) { flags |= 1 << 0; }
        if (this.silent !== undefined && this.silent !== null) { flags |= 1 << 1; }
        if (this.muteUntil !== undefined && this.muteUntil !== null) { flags |= 1 << 2; }
        if (this.sound !== undefined && this.sound !== null) { flags |= 1 << 3; }
        if (this.storiesMuted !== undefined && this.storiesMuted !== null) { flags |= 1 << 6; }
        if (this.storiesHideSender !== undefined && this.storiesHideSender !== null) { flags |= 1 << 7; }
        if (this.storiesSound !== undefined && this.storiesSound !== null) { flags |= 1 << 8; }
        writer.writeInt(flags, false);
        if (this.showPreviews !== undefined && this.showPreviews !== null) {
            writer.tgWriteBool(this.showPreviews);
        }
        if (this.silent !== undefined && this.silent !== null) {
            writer.tgWriteBool(this.silent);
        }
        if (this.muteUntil !== undefined && this.muteUntil !== null) {
            writer.writeInt(this.muteUntil);
        }
        if (this.sound !== undefined && this.sound !== null) {
            writer.write(this.sound.getBytes());
        }
        if (this.storiesMuted !== undefined && this.storiesMuted !== null) {
            writer.tgWriteBool(this.storiesMuted);
        }
        if (this.storiesHideSender !== undefined && this.storiesHideSender !== null) {
            writer.tgWriteBool(this.storiesHideSender);
        }
        if (this.storiesSound !== undefined && this.storiesSound !== null) {
            writer.write(this.storiesSound.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerNotifySettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _showPreviews = reader.tgReadBool();
            args.showPreviews = _showPreviews;
        } else {
            args.showPreviews = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _silent = reader.tgReadBool();
            args.silent = _silent;
        } else {
            args.silent = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _muteUntil = reader.readInt();
            args.muteUntil = _muteUntil;
        } else {
            args.muteUntil = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _sound = reader.tgReadObject();
            args.sound = _sound;
        } else {
            args.sound = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _storiesMuted = reader.tgReadBool();
            args.storiesMuted = _storiesMuted;
        } else {
            args.storiesMuted = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _storiesHideSender = reader.tgReadBool();
            args.storiesHideSender = _storiesHideSender;
        } else {
            args.storiesHideSender = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _storiesSound = reader.tgReadObject();
            args.storiesSound = _storiesSound;
        } else {
            args.storiesSound = undefined;
        }
        return new InputPeerNotifySettings(args);
    }
}