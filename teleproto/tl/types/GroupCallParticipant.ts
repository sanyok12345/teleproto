import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeGroupCallParticipantVideo } from "./TypeGroupCallParticipantVideo";

export class GroupCallParticipant extends TLObject {
    static CONSTRUCTOR_ID = 708691884;
    static SUBCLASS_OF_ID = 3222974284;
    static className = "GroupCallParticipant";
    static classType = "constructor";

    flags!: number;
    muted?: boolean;
    left?: boolean;
    canSelfUnmute?: boolean;
    justJoined?: boolean;
    versioned?: boolean;
    min?: boolean;
    mutedByYou?: boolean;
    volumeByAdmin?: boolean;
    self?: boolean;
    videoJoined?: boolean;
    peer!: TypePeer;
    date!: number;
    activeDate?: number;
    source!: number;
    volume?: number;
    about?: string;
    raiseHandRating?: bigint;
    video?: TypeGroupCallParticipantVideo;
    presentation?: TypeGroupCallParticipantVideo;
    paidStarsTotal?: bigint;

    constructor(args: { flags?: number, muted?: boolean, left?: boolean, canSelfUnmute?: boolean, justJoined?: boolean, versioned?: boolean, min?: boolean, mutedByYou?: boolean, volumeByAdmin?: boolean, self?: boolean, videoJoined?: boolean, peer?: TypePeer, date?: number, activeDate?: number, source?: number, volume?: number, about?: string, raiseHandRating?: bigint, video?: TypeGroupCallParticipantVideo, presentation?: TypeGroupCallParticipantVideo, paidStarsTotal?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.muted = args.muted;
        this.left = args.left;
        this.canSelfUnmute = args.canSelfUnmute;
        this.justJoined = args.justJoined;
        this.versioned = args.versioned;
        this.min = args.min;
        this.mutedByYou = args.mutedByYou;
        this.volumeByAdmin = args.volumeByAdmin;
        this.self = args.self;
        this.videoJoined = args.videoJoined;
        this.peer = args.peer!;
        this.date = args.date!;
        this.activeDate = args.activeDate;
        this.source = args.source!;
        this.volume = args.volume;
        this.about = args.about;
        this.raiseHandRating = args.raiseHandRating;
        this.video = args.video;
        this.presentation = args.presentation;
        this.paidStarsTotal = args.paidStarsTotal;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(708691884, false);
        let flags = 0;
        if (this.muted) { flags |= 1 << 0; }
        if (this.left) { flags |= 1 << 1; }
        if (this.canSelfUnmute) { flags |= 1 << 2; }
        if (this.justJoined) { flags |= 1 << 4; }
        if (this.versioned) { flags |= 1 << 5; }
        if (this.min) { flags |= 1 << 8; }
        if (this.mutedByYou) { flags |= 1 << 9; }
        if (this.volumeByAdmin) { flags |= 1 << 10; }
        if (this.self) { flags |= 1 << 12; }
        if (this.videoJoined) { flags |= 1 << 15; }
        if (this.activeDate !== undefined && this.activeDate !== null) { flags |= 1 << 3; }
        if (this.volume !== undefined && this.volume !== null) { flags |= 1 << 7; }
        if (this.about !== undefined && this.about !== null) { flags |= 1 << 11; }
        if (this.raiseHandRating !== undefined && this.raiseHandRating !== null) { flags |= 1 << 13; }
        if (this.video !== undefined && this.video !== null) { flags |= 1 << 6; }
        if (this.presentation !== undefined && this.presentation !== null) { flags |= 1 << 14; }
        if (this.paidStarsTotal !== undefined && this.paidStarsTotal !== null) { flags |= 1 << 16; }
        writer.writeInt(flags, false);
        if (this.muted !== undefined && this.muted !== null) {
        }
        if (this.left !== undefined && this.left !== null) {
        }
        if (this.canSelfUnmute !== undefined && this.canSelfUnmute !== null) {
        }
        if (this.justJoined !== undefined && this.justJoined !== null) {
        }
        if (this.versioned !== undefined && this.versioned !== null) {
        }
        if (this.min !== undefined && this.min !== null) {
        }
        if (this.mutedByYou !== undefined && this.mutedByYou !== null) {
        }
        if (this.volumeByAdmin !== undefined && this.volumeByAdmin !== null) {
        }
        if (this.self !== undefined && this.self !== null) {
        }
        if (this.videoJoined !== undefined && this.videoJoined !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeInt(this.date);
        if (this.activeDate !== undefined && this.activeDate !== null) {
            writer.writeInt(this.activeDate);
        }
        writer.writeInt(this.source);
        if (this.volume !== undefined && this.volume !== null) {
            writer.writeInt(this.volume);
        }
        if (this.about !== undefined && this.about !== null) {
            writer.tgWriteString(this.about);
        }
        if (this.raiseHandRating !== undefined && this.raiseHandRating !== null) {
            writer.writeLargeInt(this.raiseHandRating, 64);
        }
        if (this.video !== undefined && this.video !== null) {
            writer.write(this.video.getBytes());
        }
        if (this.presentation !== undefined && this.presentation !== null) {
            writer.write(this.presentation.getBytes());
        }
        if (this.paidStarsTotal !== undefined && this.paidStarsTotal !== null) {
            writer.writeLargeInt(this.paidStarsTotal, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallParticipant {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _muted = true;
            args.muted = _muted;
        } else {
            args.muted = false;
        }
        if (args.flags & (1 << 1)) {
            const _left = true;
            args.left = _left;
        } else {
            args.left = false;
        }
        if (args.flags & (1 << 2)) {
            const _canSelfUnmute = true;
            args.canSelfUnmute = _canSelfUnmute;
        } else {
            args.canSelfUnmute = false;
        }
        if (args.flags & (1 << 4)) {
            const _justJoined = true;
            args.justJoined = _justJoined;
        } else {
            args.justJoined = false;
        }
        if (args.flags & (1 << 5)) {
            const _versioned = true;
            args.versioned = _versioned;
        } else {
            args.versioned = false;
        }
        if (args.flags & (1 << 8)) {
            const _min = true;
            args.min = _min;
        } else {
            args.min = false;
        }
        if (args.flags & (1 << 9)) {
            const _mutedByYou = true;
            args.mutedByYou = _mutedByYou;
        } else {
            args.mutedByYou = false;
        }
        if (args.flags & (1 << 10)) {
            const _volumeByAdmin = true;
            args.volumeByAdmin = _volumeByAdmin;
        } else {
            args.volumeByAdmin = false;
        }
        if (args.flags & (1 << 12)) {
            const _self = true;
            args.self = _self;
        } else {
            args.self = false;
        }
        if (args.flags & (1 << 15)) {
            const _videoJoined = true;
            args.videoJoined = _videoJoined;
        } else {
            args.videoJoined = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 3)) {
            const _activeDate = reader.readInt();
            args.activeDate = _activeDate;
        } else {
            args.activeDate = undefined;
        }
        const _source = reader.readInt();
        args.source = _source;
        if (args.flags & (1 << 7)) {
            const _volume = reader.readInt();
            args.volume = _volume;
        } else {
            args.volume = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _about = reader.tgReadString();
            args.about = _about;
        } else {
            args.about = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _raiseHandRating = reader.readLargeInt(64);
            args.raiseHandRating = _raiseHandRating;
        } else {
            args.raiseHandRating = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _video = reader.tgReadObject();
            args.video = _video;
        } else {
            args.video = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _presentation = reader.tgReadObject();
            args.presentation = _presentation;
        } else {
            args.presentation = undefined;
        }
        if (args.flags & (1 << 16)) {
            const _paidStarsTotal = reader.readLargeInt(64);
            args.paidStarsTotal = _paidStarsTotal;
        } else {
            args.paidStarsTotal = undefined;
        }
        return new GroupCallParticipant(args);
    }
}