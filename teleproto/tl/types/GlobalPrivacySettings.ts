import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDisallowedGiftsSettings } from "./TypeDisallowedGiftsSettings";

export class GlobalPrivacySettings extends TLObject {
    static CONSTRUCTOR_ID = 4265718607;
    static SUBCLASS_OF_ID = 3373160304;
    static className = "GlobalPrivacySettings";
    static classType = "constructor";

    flags!: number;
    archiveAndMuteNewNoncontactPeers?: boolean;
    keepArchivedUnmuted?: boolean;
    keepArchivedFolders?: boolean;
    hideReadMarks?: boolean;
    newNoncontactPeersRequirePremium?: boolean;
    displayGiftsButton?: boolean;
    noncontactPeersPaidStars?: bigint;
    disallowedGifts?: TypeDisallowedGiftsSettings;

    constructor(args: { flags?: number, archiveAndMuteNewNoncontactPeers?: boolean, keepArchivedUnmuted?: boolean, keepArchivedFolders?: boolean, hideReadMarks?: boolean, newNoncontactPeersRequirePremium?: boolean, displayGiftsButton?: boolean, noncontactPeersPaidStars?: bigint, disallowedGifts?: TypeDisallowedGiftsSettings } = {}) {
        super();
        this.flags = args.flags!;
        this.archiveAndMuteNewNoncontactPeers = args.archiveAndMuteNewNoncontactPeers;
        this.keepArchivedUnmuted = args.keepArchivedUnmuted;
        this.keepArchivedFolders = args.keepArchivedFolders;
        this.hideReadMarks = args.hideReadMarks;
        this.newNoncontactPeersRequirePremium = args.newNoncontactPeersRequirePremium;
        this.displayGiftsButton = args.displayGiftsButton;
        this.noncontactPeersPaidStars = args.noncontactPeersPaidStars;
        this.disallowedGifts = args.disallowedGifts;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4265718607, false);
        let flags = 0;
        if (this.archiveAndMuteNewNoncontactPeers) { flags |= 1 << 0; }
        if (this.keepArchivedUnmuted) { flags |= 1 << 1; }
        if (this.keepArchivedFolders) { flags |= 1 << 2; }
        if (this.hideReadMarks) { flags |= 1 << 3; }
        if (this.newNoncontactPeersRequirePremium) { flags |= 1 << 4; }
        if (this.displayGiftsButton) { flags |= 1 << 7; }
        if (this.noncontactPeersPaidStars !== undefined && this.noncontactPeersPaidStars !== null) { flags |= 1 << 5; }
        if (this.disallowedGifts !== undefined && this.disallowedGifts !== null) { flags |= 1 << 6; }
        writer.writeInt(flags, false);
        if (this.archiveAndMuteNewNoncontactPeers !== undefined && this.archiveAndMuteNewNoncontactPeers !== null) {
        }
        if (this.keepArchivedUnmuted !== undefined && this.keepArchivedUnmuted !== null) {
        }
        if (this.keepArchivedFolders !== undefined && this.keepArchivedFolders !== null) {
        }
        if (this.hideReadMarks !== undefined && this.hideReadMarks !== null) {
        }
        if (this.newNoncontactPeersRequirePremium !== undefined && this.newNoncontactPeersRequirePremium !== null) {
        }
        if (this.displayGiftsButton !== undefined && this.displayGiftsButton !== null) {
        }
        if (this.noncontactPeersPaidStars !== undefined && this.noncontactPeersPaidStars !== null) {
            writer.writeLargeInt(this.noncontactPeersPaidStars, 64);
        }
        if (this.disallowedGifts !== undefined && this.disallowedGifts !== null) {
            writer.write(this.disallowedGifts.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GlobalPrivacySettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _archiveAndMuteNewNoncontactPeers = true;
            args.archiveAndMuteNewNoncontactPeers = _archiveAndMuteNewNoncontactPeers;
        } else {
            args.archiveAndMuteNewNoncontactPeers = false;
        }
        if (args.flags & (1 << 1)) {
            const _keepArchivedUnmuted = true;
            args.keepArchivedUnmuted = _keepArchivedUnmuted;
        } else {
            args.keepArchivedUnmuted = false;
        }
        if (args.flags & (1 << 2)) {
            const _keepArchivedFolders = true;
            args.keepArchivedFolders = _keepArchivedFolders;
        } else {
            args.keepArchivedFolders = false;
        }
        if (args.flags & (1 << 3)) {
            const _hideReadMarks = true;
            args.hideReadMarks = _hideReadMarks;
        } else {
            args.hideReadMarks = false;
        }
        if (args.flags & (1 << 4)) {
            const _newNoncontactPeersRequirePremium = true;
            args.newNoncontactPeersRequirePremium = _newNoncontactPeersRequirePremium;
        } else {
            args.newNoncontactPeersRequirePremium = false;
        }
        if (args.flags & (1 << 7)) {
            const _displayGiftsButton = true;
            args.displayGiftsButton = _displayGiftsButton;
        } else {
            args.displayGiftsButton = false;
        }
        if (args.flags & (1 << 5)) {
            const _noncontactPeersPaidStars = reader.readLargeInt(64);
            args.noncontactPeersPaidStars = _noncontactPeersPaidStars;
        } else {
            args.noncontactPeersPaidStars = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _disallowedGifts = reader.tgReadObject();
            args.disallowedGifts = _disallowedGifts;
        } else {
            args.disallowedGifts = undefined;
        }
        return new GlobalPrivacySettings(args);
    }
}