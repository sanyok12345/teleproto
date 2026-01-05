import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeUser } from "../TypeUser";

export class Authorization extends TLObject {
    static CONSTRUCTOR_ID = 782418132;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.Authorization";
    static classType = "constructor";

    flags!: number;
    setupPasswordRequired?: boolean;
    otherwiseReloginDays?: number;
    tmpSessions?: number;
    futureAuthToken?: Buffer;
    user!: TypeUser;

    constructor(args: { flags?: number, setupPasswordRequired?: boolean, otherwiseReloginDays?: number, tmpSessions?: number, futureAuthToken?: Buffer, user?: TypeUser } = {}) {
        super();
        this.flags = args.flags!;
        this.setupPasswordRequired = args.setupPasswordRequired;
        this.otherwiseReloginDays = args.otherwiseReloginDays;
        this.tmpSessions = args.tmpSessions;
        this.futureAuthToken = args.futureAuthToken;
        this.user = args.user!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(782418132, false);
        let flags = 0;
        if (this.setupPasswordRequired) { flags |= 1 << 1; }
        if (this.otherwiseReloginDays !== undefined && this.otherwiseReloginDays !== null) { flags |= 1 << 1; }
        if (this.tmpSessions !== undefined && this.tmpSessions !== null) { flags |= 1 << 0; }
        if (this.futureAuthToken !== undefined && this.futureAuthToken !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.setupPasswordRequired !== undefined && this.setupPasswordRequired !== null) {
        }
        if (this.otherwiseReloginDays !== undefined && this.otherwiseReloginDays !== null) {
            writer.writeInt(this.otherwiseReloginDays);
        }
        if (this.tmpSessions !== undefined && this.tmpSessions !== null) {
            writer.writeInt(this.tmpSessions);
        }
        if (this.futureAuthToken !== undefined && this.futureAuthToken !== null) {
            writer.tgWriteBytes(this.futureAuthToken);
        }
        writer.write(this.user.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Authorization {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _setupPasswordRequired = true;
            args.setupPasswordRequired = _setupPasswordRequired;
        } else {
            args.setupPasswordRequired = false;
        }
        if (args.flags & (1 << 1)) {
            const _otherwiseReloginDays = reader.readInt();
            args.otherwiseReloginDays = _otherwiseReloginDays;
        } else {
            args.otherwiseReloginDays = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _tmpSessions = reader.readInt();
            args.tmpSessions = _tmpSessions;
        } else {
            args.tmpSessions = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _futureAuthToken = reader.tgReadBytes();
            args.futureAuthToken = _futureAuthToken;
        } else {
            args.futureAuthToken = undefined;
        }
        const _user = reader.tgReadObject();
        args.user = _user;
        return new Authorization(args);
    }
}