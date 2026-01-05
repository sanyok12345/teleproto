import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeWebAuthorization } from "../TypeWebAuthorization";
import { TypeUser } from "../TypeUser";

export class WebAuthorizations extends TLObject {
    static CONSTRUCTOR_ID = 3981887996;
    static SUBCLASS_OF_ID = 2587253554;
    static className = "account.WebAuthorizations";
    static classType = "constructor";

    authorizations!: TypeWebAuthorization[];
    users!: TypeUser[];

    constructor(args: { authorizations?: TypeWebAuthorization[], users?: TypeUser[] } = {}) {
        super();
        this.authorizations = args.authorizations!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3981887996, false);
        writer.writeVector(this.authorizations, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebAuthorizations {
        const args: any = {};
        const _authorizations = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.authorizations = _authorizations;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new WebAuthorizations(args);
    }
}