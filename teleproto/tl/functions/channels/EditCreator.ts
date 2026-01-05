import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditCreator extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2402864415;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.EditCreator";
    static classType = "request";

    channel?: EntityLike;
    userId!: EntityLike;
    password!: TypeInputCheckPasswordSRP;

    constructor(args: { channel?: EntityLike, userId?: EntityLike, password?: TypeInputCheckPasswordSRP } = {}) {
        super();
        this.channel = args.channel;
        this.userId = args.userId!;
        this.password = args.password!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2402864415, false);
        writer.write((this.channel! as any).getBytes());
        writer.write((this.userId as any).getBytes());
        writer.write(this.password.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditCreator {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _password = reader.tgReadObject();
        args.password = _password;
        return new EditCreator(args);
    }
}