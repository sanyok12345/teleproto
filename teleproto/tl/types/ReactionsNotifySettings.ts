import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReactionNotificationsFrom } from "./TypeReactionNotificationsFrom";
import { TypeNotificationSound } from "./TypeNotificationSound";

export class ReactionsNotifySettings extends TLObject {
    static CONSTRUCTOR_ID = 1457736048;
    static SUBCLASS_OF_ID = 2382301265;
    static className = "ReactionsNotifySettings";
    static classType = "constructor";

    flags!: number;
    messagesNotifyFrom?: TypeReactionNotificationsFrom;
    storiesNotifyFrom?: TypeReactionNotificationsFrom;
    sound!: TypeNotificationSound;
    showPreviews!: boolean;

    constructor(args: { flags?: number, messagesNotifyFrom?: TypeReactionNotificationsFrom, storiesNotifyFrom?: TypeReactionNotificationsFrom, sound?: TypeNotificationSound, showPreviews?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.messagesNotifyFrom = args.messagesNotifyFrom;
        this.storiesNotifyFrom = args.storiesNotifyFrom;
        this.sound = args.sound!;
        this.showPreviews = args.showPreviews!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1457736048, false);
        let flags = 0;
        if (this.messagesNotifyFrom !== undefined && this.messagesNotifyFrom !== null) { flags |= 1 << 0; }
        if (this.storiesNotifyFrom !== undefined && this.storiesNotifyFrom !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.messagesNotifyFrom !== undefined && this.messagesNotifyFrom !== null) {
            writer.write(this.messagesNotifyFrom.getBytes());
        }
        if (this.storiesNotifyFrom !== undefined && this.storiesNotifyFrom !== null) {
            writer.write(this.storiesNotifyFrom.getBytes());
        }
        writer.write(this.sound.getBytes());
        writer.tgWriteBool(this.showPreviews);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReactionsNotifySettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _messagesNotifyFrom = reader.tgReadObject();
            args.messagesNotifyFrom = _messagesNotifyFrom;
        } else {
            args.messagesNotifyFrom = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _storiesNotifyFrom = reader.tgReadObject();
            args.storiesNotifyFrom = _storiesNotifyFrom;
        } else {
            args.storiesNotifyFrom = undefined;
        }
        const _sound = reader.tgReadObject();
        args.sound = _sound;
        const _showPreviews = reader.tgReadBool();
        args.showPreviews = _showPreviews;
        return new ReactionsNotifySettings(args);
    }
}