import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUser } from "../../types/TypeUser";

export class UpdateProfile extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2018596725;
    static SUBCLASS_OF_ID = 765557111;
    static className = "account.UpdateProfile";
    static classType = "request";

    flags?: number;
    firstName?: string;
    lastName?: string;
    about?: string;

    constructor(args: { flags?: number, firstName?: string, lastName?: string, about?: string } = {}) {
        super();
        this.flags = args.flags;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.about = args.about;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2018596725, false);
        let flags = 0;
        if (this.firstName !== undefined && this.firstName !== null) { flags |= 1 << 0; }
        if (this.lastName !== undefined && this.lastName !== null) { flags |= 1 << 1; }
        if (this.about !== undefined && this.about !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.firstName !== undefined && this.firstName !== null) {
            writer.tgWriteString(this.firstName);
        }
        if (this.lastName !== undefined && this.lastName !== null) {
            writer.tgWriteString(this.lastName);
        }
        if (this.about !== undefined && this.about !== null) {
            writer.tgWriteString(this.about);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUser {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateProfile {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _firstName = reader.tgReadString();
            args.firstName = _firstName;
        } else {
            args.firstName = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _lastName = reader.tgReadString();
            args.lastName = _lastName;
        } else {
            args.lastName = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _about = reader.tgReadString();
            args.about = _about;
        } else {
            args.about = undefined;
        }
        return new UpdateProfile(args);
    }
}