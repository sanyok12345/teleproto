import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeAuthorization } from "../TypeAuthorization";

export class Authorizations extends TLObject {
    static CONSTRUCTOR_ID = 1275039392;
    static SUBCLASS_OF_ID = 200663295;
    static className = "account.Authorizations";
    static classType = "constructor";

    authorizationTtlDays!: number;
    authorizations!: TypeAuthorization[];

    constructor(args: { authorizationTtlDays?: number, authorizations?: TypeAuthorization[] } = {}) {
        super();
        this.authorizationTtlDays = args.authorizationTtlDays!;
        this.authorizations = args.authorizations!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1275039392, false);
        writer.writeInt(this.authorizationTtlDays);
        writer.writeVector(this.authorizations, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Authorizations {
        const args: any = {};
        const _authorizationTtlDays = reader.readInt();
        args.authorizationTtlDays = _authorizationTtlDays;
        const _authorizations = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.authorizations = _authorizations;
        return new Authorizations(args);
    }
}