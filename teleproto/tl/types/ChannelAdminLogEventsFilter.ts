import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventsFilter extends TLObject {
    static CONSTRUCTOR_ID = 3926948580;
    static SUBCLASS_OF_ID = 2092692249;
    static className = "ChannelAdminLogEventsFilter";
    static classType = "constructor";

    flags!: number;
    join?: boolean;
    leave?: boolean;
    invite?: boolean;
    ban?: boolean;
    unban?: boolean;
    kick?: boolean;
    unkick?: boolean;
    promote?: boolean;
    demote?: boolean;
    info?: boolean;
    settings?: boolean;
    pinned?: boolean;
    edit?: boolean;
    delete?: boolean;
    groupCall?: boolean;
    invites?: boolean;
    send?: boolean;
    forums?: boolean;
    subExtend?: boolean;

    constructor(args: { flags?: number, join?: boolean, leave?: boolean, invite?: boolean, ban?: boolean, unban?: boolean, kick?: boolean, unkick?: boolean, promote?: boolean, demote?: boolean, info?: boolean, settings?: boolean, pinned?: boolean, edit?: boolean, delete?: boolean, groupCall?: boolean, invites?: boolean, send?: boolean, forums?: boolean, subExtend?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.join = args.join;
        this.leave = args.leave;
        this.invite = args.invite;
        this.ban = args.ban;
        this.unban = args.unban;
        this.kick = args.kick;
        this.unkick = args.unkick;
        this.promote = args.promote;
        this.demote = args.demote;
        this.info = args.info;
        this.settings = args.settings;
        this.pinned = args.pinned;
        this.edit = args.edit;
        this.delete = args.delete;
        this.groupCall = args.groupCall;
        this.invites = args.invites;
        this.send = args.send;
        this.forums = args.forums;
        this.subExtend = args.subExtend;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3926948580, false);
        let flags = 0;
        if (this.join) { flags |= 1 << 0; }
        if (this.leave) { flags |= 1 << 1; }
        if (this.invite) { flags |= 1 << 2; }
        if (this.ban) { flags |= 1 << 3; }
        if (this.unban) { flags |= 1 << 4; }
        if (this.kick) { flags |= 1 << 5; }
        if (this.unkick) { flags |= 1 << 6; }
        if (this.promote) { flags |= 1 << 7; }
        if (this.demote) { flags |= 1 << 8; }
        if (this.info) { flags |= 1 << 9; }
        if (this.settings) { flags |= 1 << 10; }
        if (this.pinned) { flags |= 1 << 11; }
        if (this.edit) { flags |= 1 << 12; }
        if (this.delete) { flags |= 1 << 13; }
        if (this.groupCall) { flags |= 1 << 14; }
        if (this.invites) { flags |= 1 << 15; }
        if (this.send) { flags |= 1 << 16; }
        if (this.forums) { flags |= 1 << 17; }
        if (this.subExtend) { flags |= 1 << 18; }
        writer.writeInt(flags, false);
        if (this.join !== undefined && this.join !== null) {
        }
        if (this.leave !== undefined && this.leave !== null) {
        }
        if (this.invite !== undefined && this.invite !== null) {
        }
        if (this.ban !== undefined && this.ban !== null) {
        }
        if (this.unban !== undefined && this.unban !== null) {
        }
        if (this.kick !== undefined && this.kick !== null) {
        }
        if (this.unkick !== undefined && this.unkick !== null) {
        }
        if (this.promote !== undefined && this.promote !== null) {
        }
        if (this.demote !== undefined && this.demote !== null) {
        }
        if (this.info !== undefined && this.info !== null) {
        }
        if (this.settings !== undefined && this.settings !== null) {
        }
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        if (this.edit !== undefined && this.edit !== null) {
        }
        if (this.delete !== undefined && this.delete !== null) {
        }
        if (this.groupCall !== undefined && this.groupCall !== null) {
        }
        if (this.invites !== undefined && this.invites !== null) {
        }
        if (this.send !== undefined && this.send !== null) {
        }
        if (this.forums !== undefined && this.forums !== null) {
        }
        if (this.subExtend !== undefined && this.subExtend !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventsFilter {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _join = true;
            args.join = _join;
        } else {
            args.join = false;
        }
        if (args.flags & (1 << 1)) {
            const _leave = true;
            args.leave = _leave;
        } else {
            args.leave = false;
        }
        if (args.flags & (1 << 2)) {
            const _invite = true;
            args.invite = _invite;
        } else {
            args.invite = false;
        }
        if (args.flags & (1 << 3)) {
            const _ban = true;
            args.ban = _ban;
        } else {
            args.ban = false;
        }
        if (args.flags & (1 << 4)) {
            const _unban = true;
            args.unban = _unban;
        } else {
            args.unban = false;
        }
        if (args.flags & (1 << 5)) {
            const _kick = true;
            args.kick = _kick;
        } else {
            args.kick = false;
        }
        if (args.flags & (1 << 6)) {
            const _unkick = true;
            args.unkick = _unkick;
        } else {
            args.unkick = false;
        }
        if (args.flags & (1 << 7)) {
            const _promote = true;
            args.promote = _promote;
        } else {
            args.promote = false;
        }
        if (args.flags & (1 << 8)) {
            const _demote = true;
            args.demote = _demote;
        } else {
            args.demote = false;
        }
        if (args.flags & (1 << 9)) {
            const _info = true;
            args.info = _info;
        } else {
            args.info = false;
        }
        if (args.flags & (1 << 10)) {
            const _settings = true;
            args.settings = _settings;
        } else {
            args.settings = false;
        }
        if (args.flags & (1 << 11)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        if (args.flags & (1 << 12)) {
            const _edit = true;
            args.edit = _edit;
        } else {
            args.edit = false;
        }
        if (args.flags & (1 << 13)) {
            const _delete = true;
            args.delete = _delete;
        } else {
            args.delete = false;
        }
        if (args.flags & (1 << 14)) {
            const _groupCall = true;
            args.groupCall = _groupCall;
        } else {
            args.groupCall = false;
        }
        if (args.flags & (1 << 15)) {
            const _invites = true;
            args.invites = _invites;
        } else {
            args.invites = false;
        }
        if (args.flags & (1 << 16)) {
            const _send = true;
            args.send = _send;
        } else {
            args.send = false;
        }
        if (args.flags & (1 << 17)) {
            const _forums = true;
            args.forums = _forums;
        } else {
            args.forums = false;
        }
        if (args.flags & (1 << 18)) {
            const _subExtend = true;
            args.subExtend = _subExtend;
        } else {
            args.subExtend = false;
        }
        return new ChannelAdminLogEventsFilter(args);
    }
}