import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class Authorization extends TLObject {
    static CONSTRUCTOR_ID = 2902578717;
    static SUBCLASS_OF_ID = 3373514778;
    static className = "Authorization";
    static classType = "constructor";

    flags!: number;
    current?: boolean;
    officialApp?: boolean;
    passwordPending?: boolean;
    encryptedRequestsDisabled?: boolean;
    callRequestsDisabled?: boolean;
    unconfirmed?: boolean;
    hash!: bigint;
    deviceModel!: string;
    platform!: string;
    systemVersion!: string;
    apiId!: number;
    appName!: string;
    appVersion!: string;
    dateCreated!: number;
    dateActive!: number;
    ip!: string;
    country!: string;
    region!: string;

    constructor(args: { flags?: number, current?: boolean, officialApp?: boolean, passwordPending?: boolean, encryptedRequestsDisabled?: boolean, callRequestsDisabled?: boolean, unconfirmed?: boolean, hash?: bigint, deviceModel?: string, platform?: string, systemVersion?: string, apiId?: number, appName?: string, appVersion?: string, dateCreated?: number, dateActive?: number, ip?: string, country?: string, region?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.current = args.current;
        this.officialApp = args.officialApp;
        this.passwordPending = args.passwordPending;
        this.encryptedRequestsDisabled = args.encryptedRequestsDisabled;
        this.callRequestsDisabled = args.callRequestsDisabled;
        this.unconfirmed = args.unconfirmed;
        this.hash = args.hash!;
        this.deviceModel = args.deviceModel!;
        this.platform = args.platform!;
        this.systemVersion = args.systemVersion!;
        this.apiId = args.apiId!;
        this.appName = args.appName!;
        this.appVersion = args.appVersion!;
        this.dateCreated = args.dateCreated!;
        this.dateActive = args.dateActive!;
        this.ip = args.ip!;
        this.country = args.country!;
        this.region = args.region!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2902578717, false);
        let flags = 0;
        if (this.current) { flags |= 1 << 0; }
        if (this.officialApp) { flags |= 1 << 1; }
        if (this.passwordPending) { flags |= 1 << 2; }
        if (this.encryptedRequestsDisabled) { flags |= 1 << 3; }
        if (this.callRequestsDisabled) { flags |= 1 << 4; }
        if (this.unconfirmed) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        if (this.current !== undefined && this.current !== null) {
        }
        if (this.officialApp !== undefined && this.officialApp !== null) {
        }
        if (this.passwordPending !== undefined && this.passwordPending !== null) {
        }
        if (this.encryptedRequestsDisabled !== undefined && this.encryptedRequestsDisabled !== null) {
        }
        if (this.callRequestsDisabled !== undefined && this.callRequestsDisabled !== null) {
        }
        if (this.unconfirmed !== undefined && this.unconfirmed !== null) {
        }
        writer.writeLargeInt(this.hash, 64);
        writer.tgWriteString(this.deviceModel);
        writer.tgWriteString(this.platform);
        writer.tgWriteString(this.systemVersion);
        writer.writeInt(this.apiId);
        writer.tgWriteString(this.appName);
        writer.tgWriteString(this.appVersion);
        writer.writeInt(this.dateCreated);
        writer.writeInt(this.dateActive);
        writer.tgWriteString(this.ip);
        writer.tgWriteString(this.country);
        writer.tgWriteString(this.region);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Authorization {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _current = true;
            args.current = _current;
        } else {
            args.current = false;
        }
        if (args.flags & (1 << 1)) {
            const _officialApp = true;
            args.officialApp = _officialApp;
        } else {
            args.officialApp = false;
        }
        if (args.flags & (1 << 2)) {
            const _passwordPending = true;
            args.passwordPending = _passwordPending;
        } else {
            args.passwordPending = false;
        }
        if (args.flags & (1 << 3)) {
            const _encryptedRequestsDisabled = true;
            args.encryptedRequestsDisabled = _encryptedRequestsDisabled;
        } else {
            args.encryptedRequestsDisabled = false;
        }
        if (args.flags & (1 << 4)) {
            const _callRequestsDisabled = true;
            args.callRequestsDisabled = _callRequestsDisabled;
        } else {
            args.callRequestsDisabled = false;
        }
        if (args.flags & (1 << 5)) {
            const _unconfirmed = true;
            args.unconfirmed = _unconfirmed;
        } else {
            args.unconfirmed = false;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _deviceModel = reader.tgReadString();
        args.deviceModel = _deviceModel;
        const _platform = reader.tgReadString();
        args.platform = _platform;
        const _systemVersion = reader.tgReadString();
        args.systemVersion = _systemVersion;
        const _apiId = reader.readInt();
        args.apiId = _apiId;
        const _appName = reader.tgReadString();
        args.appName = _appName;
        const _appVersion = reader.tgReadString();
        args.appVersion = _appVersion;
        const _dateCreated = reader.readInt();
        args.dateCreated = _dateCreated;
        const _dateActive = reader.readInt();
        args.dateActive = _dateActive;
        const _ip = reader.tgReadString();
        args.ip = _ip;
        const _country = reader.tgReadString();
        args.country = _country;
        const _region = reader.tgReadString();
        args.region = _region;
        return new Authorization(args);
    }
}