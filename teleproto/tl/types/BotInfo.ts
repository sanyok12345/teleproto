import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";
import { TypeDocument } from "./TypeDocument";
import { TypeBotCommand } from "./TypeBotCommand";
import { TypeBotMenuButton } from "./TypeBotMenuButton";
import { TypeBotAppSettings } from "./TypeBotAppSettings";
import { TypeBotVerifierSettings } from "./TypeBotVerifierSettings";

export class BotInfo extends TLObject {
    static CONSTRUCTOR_ID = 1300890265;
    static SUBCLASS_OF_ID = 4059496923;
    static className = "BotInfo";
    static classType = "constructor";

    flags!: number;
    hasPreviewMedias?: boolean;
    userId?: bigint;
    description?: string;
    descriptionPhoto?: TypePhoto;
    descriptionDocument?: TypeDocument;
    commands?: TypeBotCommand[];
    menuButton?: TypeBotMenuButton;
    privacyPolicyUrl?: string;
    appSettings?: TypeBotAppSettings;
    verifierSettings?: TypeBotVerifierSettings;

    constructor(args: { flags?: number, hasPreviewMedias?: boolean, userId?: bigint, description?: string, descriptionPhoto?: TypePhoto, descriptionDocument?: TypeDocument, commands?: TypeBotCommand[], menuButton?: TypeBotMenuButton, privacyPolicyUrl?: string, appSettings?: TypeBotAppSettings, verifierSettings?: TypeBotVerifierSettings } = {}) {
        super();
        this.flags = args.flags!;
        this.hasPreviewMedias = args.hasPreviewMedias;
        this.userId = args.userId;
        this.description = args.description;
        this.descriptionPhoto = args.descriptionPhoto;
        this.descriptionDocument = args.descriptionDocument;
        this.commands = args.commands;
        this.menuButton = args.menuButton;
        this.privacyPolicyUrl = args.privacyPolicyUrl;
        this.appSettings = args.appSettings;
        this.verifierSettings = args.verifierSettings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1300890265, false);
        let flags = 0;
        if (this.hasPreviewMedias) { flags |= 1 << 6; }
        if (this.userId !== undefined && this.userId !== null) { flags |= 1 << 0; }
        if (this.description !== undefined && this.description !== null) { flags |= 1 << 1; }
        if (this.descriptionPhoto !== undefined && this.descriptionPhoto !== null) { flags |= 1 << 4; }
        if (this.descriptionDocument !== undefined && this.descriptionDocument !== null) { flags |= 1 << 5; }
        if (this.commands !== undefined && this.commands !== null) { flags |= 1 << 2; }
        if (this.menuButton !== undefined && this.menuButton !== null) { flags |= 1 << 3; }
        if (this.privacyPolicyUrl !== undefined && this.privacyPolicyUrl !== null) { flags |= 1 << 7; }
        if (this.appSettings !== undefined && this.appSettings !== null) { flags |= 1 << 8; }
        if (this.verifierSettings !== undefined && this.verifierSettings !== null) { flags |= 1 << 9; }
        writer.writeInt(flags, false);
        if (this.hasPreviewMedias !== undefined && this.hasPreviewMedias !== null) {
        }
        if (this.userId !== undefined && this.userId !== null) {
            writer.writeLargeInt(this.userId, 64);
        }
        if (this.description !== undefined && this.description !== null) {
            writer.tgWriteString(this.description);
        }
        if (this.descriptionPhoto !== undefined && this.descriptionPhoto !== null) {
            writer.write(this.descriptionPhoto.getBytes());
        }
        if (this.descriptionDocument !== undefined && this.descriptionDocument !== null) {
            writer.write(this.descriptionDocument.getBytes());
        }
        if (this.commands !== undefined && this.commands !== null) {
            writer.writeVector(this.commands, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.menuButton !== undefined && this.menuButton !== null) {
            writer.write(this.menuButton.getBytes());
        }
        if (this.privacyPolicyUrl !== undefined && this.privacyPolicyUrl !== null) {
            writer.tgWriteString(this.privacyPolicyUrl);
        }
        if (this.appSettings !== undefined && this.appSettings !== null) {
            writer.write(this.appSettings.getBytes());
        }
        if (this.verifierSettings !== undefined && this.verifierSettings !== null) {
            writer.write(this.verifierSettings.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 6)) {
            const _hasPreviewMedias = true;
            args.hasPreviewMedias = _hasPreviewMedias;
        } else {
            args.hasPreviewMedias = false;
        }
        if (args.flags & (1 << 0)) {
            const _userId = reader.readLargeInt(64);
            args.userId = _userId;
        } else {
            args.userId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _description = reader.tgReadString();
            args.description = _description;
        } else {
            args.description = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _descriptionPhoto = reader.tgReadObject();
            args.descriptionPhoto = _descriptionPhoto;
        } else {
            args.descriptionPhoto = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _descriptionDocument = reader.tgReadObject();
            args.descriptionDocument = _descriptionDocument;
        } else {
            args.descriptionDocument = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _commands = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.commands = _commands;
        } else {
            args.commands = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _menuButton = reader.tgReadObject();
            args.menuButton = _menuButton;
        } else {
            args.menuButton = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _privacyPolicyUrl = reader.tgReadString();
            args.privacyPolicyUrl = _privacyPolicyUrl;
        } else {
            args.privacyPolicyUrl = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _appSettings = reader.tgReadObject();
            args.appSettings = _appSettings;
        } else {
            args.appSettings = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _verifierSettings = reader.tgReadObject();
            args.verifierSettings = _verifierSettings;
        } else {
            args.verifierSettings = undefined;
        }
        return new BotInfo(args);
    }
}