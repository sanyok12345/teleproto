import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeNotificationSound } from "./TypeNotificationSound";

export class PeerNotifySettings extends TLObject {
    static CONSTRUCTOR_ID = 2573347852;
    static SUBCLASS_OF_ID = 3475030132;
    static className = "PeerNotifySettings";
    static classType = "constructor";

    flags!: number;
    showPreviews?: boolean;
    silent?: boolean;
    muteUntil?: number;
    iosSound?: TypeNotificationSound;
    androidSound?: TypeNotificationSound;
    otherSound?: TypeNotificationSound;
    storiesMuted?: boolean;
    storiesHideSender?: boolean;
    storiesIosSound?: TypeNotificationSound;
    storiesAndroidSound?: TypeNotificationSound;
    storiesOtherSound?: TypeNotificationSound;

    constructor(args: { flags?: number, showPreviews?: boolean, silent?: boolean, muteUntil?: number, iosSound?: TypeNotificationSound, androidSound?: TypeNotificationSound, otherSound?: TypeNotificationSound, storiesMuted?: boolean, storiesHideSender?: boolean, storiesIosSound?: TypeNotificationSound, storiesAndroidSound?: TypeNotificationSound, storiesOtherSound?: TypeNotificationSound } = {}) {
        super();
        this.flags = args.flags!;
        this.showPreviews = args.showPreviews;
        this.silent = args.silent;
        this.muteUntil = args.muteUntil;
        this.iosSound = args.iosSound;
        this.androidSound = args.androidSound;
        this.otherSound = args.otherSound;
        this.storiesMuted = args.storiesMuted;
        this.storiesHideSender = args.storiesHideSender;
        this.storiesIosSound = args.storiesIosSound;
        this.storiesAndroidSound = args.storiesAndroidSound;
        this.storiesOtherSound = args.storiesOtherSound;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2573347852, false);
        let flags = 0;
        if (this.showPreviews !== undefined && this.showPreviews !== null) { flags |= 1 << 0; }
        if (this.silent !== undefined && this.silent !== null) { flags |= 1 << 1; }
        if (this.muteUntil !== undefined && this.muteUntil !== null) { flags |= 1 << 2; }
        if (this.iosSound !== undefined && this.iosSound !== null) { flags |= 1 << 3; }
        if (this.androidSound !== undefined && this.androidSound !== null) { flags |= 1 << 4; }
        if (this.otherSound !== undefined && this.otherSound !== null) { flags |= 1 << 5; }
        if (this.storiesMuted !== undefined && this.storiesMuted !== null) { flags |= 1 << 6; }
        if (this.storiesHideSender !== undefined && this.storiesHideSender !== null) { flags |= 1 << 7; }
        if (this.storiesIosSound !== undefined && this.storiesIosSound !== null) { flags |= 1 << 8; }
        if (this.storiesAndroidSound !== undefined && this.storiesAndroidSound !== null) { flags |= 1 << 9; }
        if (this.storiesOtherSound !== undefined && this.storiesOtherSound !== null) { flags |= 1 << 10; }
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
        if (this.iosSound !== undefined && this.iosSound !== null) {
            writer.write(this.iosSound.getBytes());
        }
        if (this.androidSound !== undefined && this.androidSound !== null) {
            writer.write(this.androidSound.getBytes());
        }
        if (this.otherSound !== undefined && this.otherSound !== null) {
            writer.write(this.otherSound.getBytes());
        }
        if (this.storiesMuted !== undefined && this.storiesMuted !== null) {
            writer.tgWriteBool(this.storiesMuted);
        }
        if (this.storiesHideSender !== undefined && this.storiesHideSender !== null) {
            writer.tgWriteBool(this.storiesHideSender);
        }
        if (this.storiesIosSound !== undefined && this.storiesIosSound !== null) {
            writer.write(this.storiesIosSound.getBytes());
        }
        if (this.storiesAndroidSound !== undefined && this.storiesAndroidSound !== null) {
            writer.write(this.storiesAndroidSound.getBytes());
        }
        if (this.storiesOtherSound !== undefined && this.storiesOtherSound !== null) {
            writer.write(this.storiesOtherSound.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerNotifySettings {
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
            const _iosSound = reader.tgReadObject();
            args.iosSound = _iosSound;
        } else {
            args.iosSound = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _androidSound = reader.tgReadObject();
            args.androidSound = _androidSound;
        } else {
            args.androidSound = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _otherSound = reader.tgReadObject();
            args.otherSound = _otherSound;
        } else {
            args.otherSound = undefined;
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
            const _storiesIosSound = reader.tgReadObject();
            args.storiesIosSound = _storiesIosSound;
        } else {
            args.storiesIosSound = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _storiesAndroidSound = reader.tgReadObject();
            args.storiesAndroidSound = _storiesAndroidSound;
        } else {
            args.storiesAndroidSound = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _storiesOtherSound = reader.tgReadObject();
            args.storiesOtherSound = _storiesOtherSound;
        } else {
            args.storiesOtherSound = undefined;
        }
        return new PeerNotifySettings(args);
    }
}