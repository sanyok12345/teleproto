import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeAttachMenuPeerType } from "./TypeAttachMenuPeerType";
import { TypeAttachMenuBotIcon } from "./TypeAttachMenuBotIcon";

export class AttachMenuBot extends TLObject {
    static CONSTRUCTOR_ID = 3641544190;
    static SUBCLASS_OF_ID = 2668131398;
    static className = "AttachMenuBot";
    static classType = "constructor";

    flags!: number;
    inactive?: boolean;
    hasSettings?: boolean;
    requestWriteAccess?: boolean;
    showInAttachMenu?: boolean;
    showInSideMenu?: boolean;
    sideMenuDisclaimerNeeded?: boolean;
    botId!: bigint;
    shortName!: string;
    peerTypes?: TypeAttachMenuPeerType[];
    icons!: TypeAttachMenuBotIcon[];

    constructor(args: { flags?: number, inactive?: boolean, hasSettings?: boolean, requestWriteAccess?: boolean, showInAttachMenu?: boolean, showInSideMenu?: boolean, sideMenuDisclaimerNeeded?: boolean, botId?: bigint, shortName?: string, peerTypes?: TypeAttachMenuPeerType[], icons?: TypeAttachMenuBotIcon[] } = {}) {
        super();
        this.flags = args.flags!;
        this.inactive = args.inactive;
        this.hasSettings = args.hasSettings;
        this.requestWriteAccess = args.requestWriteAccess;
        this.showInAttachMenu = args.showInAttachMenu;
        this.showInSideMenu = args.showInSideMenu;
        this.sideMenuDisclaimerNeeded = args.sideMenuDisclaimerNeeded;
        this.botId = args.botId!;
        this.shortName = args.shortName!;
        this.peerTypes = args.peerTypes;
        this.icons = args.icons!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3641544190, false);
        let flags = 0;
        if (this.inactive) { flags |= 1 << 0; }
        if (this.hasSettings) { flags |= 1 << 1; }
        if (this.requestWriteAccess) { flags |= 1 << 2; }
        if (this.showInAttachMenu) { flags |= 1 << 3; }
        if (this.showInSideMenu) { flags |= 1 << 4; }
        if (this.sideMenuDisclaimerNeeded) { flags |= 1 << 5; }
        if (this.peerTypes !== undefined && this.peerTypes !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.inactive !== undefined && this.inactive !== null) {
        }
        if (this.hasSettings !== undefined && this.hasSettings !== null) {
        }
        if (this.requestWriteAccess !== undefined && this.requestWriteAccess !== null) {
        }
        if (this.showInAttachMenu !== undefined && this.showInAttachMenu !== null) {
        }
        if (this.showInSideMenu !== undefined && this.showInSideMenu !== null) {
        }
        if (this.sideMenuDisclaimerNeeded !== undefined && this.sideMenuDisclaimerNeeded !== null) {
        }
        writer.writeLargeInt(this.botId, 64);
        writer.tgWriteString(this.shortName);
        if (this.peerTypes !== undefined && this.peerTypes !== null) {
            writer.writeVector(this.peerTypes, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeVector(this.icons, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuBot {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _inactive = true;
            args.inactive = _inactive;
        } else {
            args.inactive = false;
        }
        if (args.flags & (1 << 1)) {
            const _hasSettings = true;
            args.hasSettings = _hasSettings;
        } else {
            args.hasSettings = false;
        }
        if (args.flags & (1 << 2)) {
            const _requestWriteAccess = true;
            args.requestWriteAccess = _requestWriteAccess;
        } else {
            args.requestWriteAccess = false;
        }
        if (args.flags & (1 << 3)) {
            const _showInAttachMenu = true;
            args.showInAttachMenu = _showInAttachMenu;
        } else {
            args.showInAttachMenu = false;
        }
        if (args.flags & (1 << 4)) {
            const _showInSideMenu = true;
            args.showInSideMenu = _showInSideMenu;
        } else {
            args.showInSideMenu = false;
        }
        if (args.flags & (1 << 5)) {
            const _sideMenuDisclaimerNeeded = true;
            args.sideMenuDisclaimerNeeded = _sideMenuDisclaimerNeeded;
        } else {
            args.sideMenuDisclaimerNeeded = false;
        }
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        if (args.flags & (1 << 3)) {
            const _peerTypes = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.peerTypes = _peerTypes;
        } else {
            args.peerTypes = undefined;
        }
        const _icons = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.icons = _icons;
        return new AttachMenuBot(args);
    }
}