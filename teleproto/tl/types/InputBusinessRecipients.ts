import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputBusinessRecipients extends TLObject {
    static CONSTRUCTOR_ID = 1871393450;
    static SUBCLASS_OF_ID = 226420031;
    static className = "InputBusinessRecipients";
    static classType = "constructor";

    flags!: number;
    existingChats?: boolean;
    newChats?: boolean;
    contacts?: boolean;
    nonContacts?: boolean;
    excludeSelected?: boolean;
    users?: TypeInputUser[];

    constructor(args: { flags?: number, existingChats?: boolean, newChats?: boolean, contacts?: boolean, nonContacts?: boolean, excludeSelected?: boolean, users?: TypeInputUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.existingChats = args.existingChats;
        this.newChats = args.newChats;
        this.contacts = args.contacts;
        this.nonContacts = args.nonContacts;
        this.excludeSelected = args.excludeSelected;
        this.users = args.users;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1871393450, false);
        let flags = 0;
        if (this.existingChats) { flags |= 1 << 0; }
        if (this.newChats) { flags |= 1 << 1; }
        if (this.contacts) { flags |= 1 << 2; }
        if (this.nonContacts) { flags |= 1 << 3; }
        if (this.excludeSelected) { flags |= 1 << 5; }
        if (this.users !== undefined && this.users !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.existingChats !== undefined && this.existingChats !== null) {
        }
        if (this.newChats !== undefined && this.newChats !== null) {
        }
        if (this.contacts !== undefined && this.contacts !== null) {
        }
        if (this.nonContacts !== undefined && this.nonContacts !== null) {
        }
        if (this.excludeSelected !== undefined && this.excludeSelected !== null) {
        }
        if (this.users !== undefined && this.users !== null) {
            writer.writeVector(this.users, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBusinessRecipients {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _existingChats = true;
            args.existingChats = _existingChats;
        } else {
            args.existingChats = false;
        }
        if (args.flags & (1 << 1)) {
            const _newChats = true;
            args.newChats = _newChats;
        } else {
            args.newChats = false;
        }
        if (args.flags & (1 << 2)) {
            const _contacts = true;
            args.contacts = _contacts;
        } else {
            args.contacts = false;
        }
        if (args.flags & (1 << 3)) {
            const _nonContacts = true;
            args.nonContacts = _nonContacts;
        } else {
            args.nonContacts = false;
        }
        if (args.flags & (1 << 5)) {
            const _excludeSelected = true;
            args.excludeSelected = _excludeSelected;
        } else {
            args.excludeSelected = false;
        }
        if (args.flags & (1 << 4)) {
            const _users = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.users = _users;
        } else {
            args.users = undefined;
        }
        return new InputBusinessRecipients(args);
    }
}