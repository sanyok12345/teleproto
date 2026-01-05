import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ChangeAuthorizationSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1089766498;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ChangeAuthorizationSettings";
    static classType = "request";

    flags?: number;
    confirmed?: boolean;
    hash?: bigint;
    encryptedRequestsDisabled?: boolean;
    callRequestsDisabled?: boolean;

    constructor(args: { flags?: number, confirmed?: boolean, hash?: bigint, encryptedRequestsDisabled?: boolean, callRequestsDisabled?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.confirmed = args.confirmed;
        this.hash = args.hash;
        this.encryptedRequestsDisabled = args.encryptedRequestsDisabled;
        this.callRequestsDisabled = args.callRequestsDisabled;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1089766498, false);
        let flags = 0;
        if (this.confirmed) { flags |= 1 << 3; }
        if (this.encryptedRequestsDisabled !== undefined && this.encryptedRequestsDisabled !== null) { flags |= 1 << 0; }
        if (this.callRequestsDisabled !== undefined && this.callRequestsDisabled !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.confirmed !== undefined && this.confirmed !== null) {
        }
        writer.writeLargeInt(this.hash!, 64);
        if (this.encryptedRequestsDisabled !== undefined && this.encryptedRequestsDisabled !== null) {
            writer.tgWriteBool(this.encryptedRequestsDisabled);
        }
        if (this.callRequestsDisabled !== undefined && this.callRequestsDisabled !== null) {
            writer.tgWriteBool(this.callRequestsDisabled);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ChangeAuthorizationSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _confirmed = true;
            args.confirmed = _confirmed;
        } else {
            args.confirmed = false;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        if (args.flags & (1 << 0)) {
            const _encryptedRequestsDisabled = reader.tgReadBool();
            args.encryptedRequestsDisabled = _encryptedRequestsDisabled;
        } else {
            args.encryptedRequestsDisabled = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _callRequestsDisabled = reader.tgReadBool();
            args.callRequestsDisabled = _callRequestsDisabled;
        } else {
            args.callRequestsDisabled = undefined;
        }
        return new ChangeAuthorizationSettings(args);
    }
}