import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";

export class RequestedPeerUser extends TLObject {
    static CONSTRUCTOR_ID = 3593466986;
    static SUBCLASS_OF_ID = 3263724560;
    static className = "RequestedPeerUser";
    static classType = "constructor";

    flags!: number;
    userId!: bigint;
    firstName?: string;
    lastName?: string;
    username?: string;
    photo?: TypePhoto;

    constructor(args: { flags?: number, userId?: bigint, firstName?: string, lastName?: string, username?: string, photo?: TypePhoto } = {}) {
        super();
        this.flags = args.flags!;
        this.userId = args.userId!;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.username = args.username;
        this.photo = args.photo;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3593466986, false);
        let flags = 0;
        if (this.firstName !== undefined && this.firstName !== null) { flags |= 1 << 0; }
        if (this.lastName !== undefined && this.lastName !== null) { flags |= 1 << 0; }
        if (this.username !== undefined && this.username !== null) { flags |= 1 << 1; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.userId, 64);
        if (this.firstName !== undefined && this.firstName !== null) {
            writer.tgWriteString(this.firstName);
        }
        if (this.lastName !== undefined && this.lastName !== null) {
            writer.tgWriteString(this.lastName);
        }
        if (this.username !== undefined && this.username !== null) {
            writer.tgWriteString(this.username);
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RequestedPeerUser {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        if (args.flags & (1 << 0)) {
            const _firstName = reader.tgReadString();
            args.firstName = _firstName;
        } else {
            args.firstName = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _lastName = reader.tgReadString();
            args.lastName = _lastName;
        } else {
            args.lastName = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _username = reader.tgReadString();
            args.username = _username;
        } else {
            args.username = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        return new RequestedPeerUser(args);
    }
}