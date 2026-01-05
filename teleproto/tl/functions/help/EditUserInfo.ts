import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessageEntity } from "../../types/TypeMessageEntity";
import { TypeUserInfo } from "../../types/help/TypeUserInfo";

export class EditUserInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1723407216;
    static SUBCLASS_OF_ID = 1548998616;
    static className = "help.EditUserInfo";
    static classType = "request";

    userId!: EntityLike;
    message!: string;
    entities!: TypeMessageEntity[];

    constructor(args: { userId?: EntityLike, message?: string, entities?: TypeMessageEntity[] } = {}) {
        super();
        this.userId = args.userId!;
        this.message = args.message!;
        this.entities = args.entities!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1723407216, false);
        writer.write((this.userId as any).getBytes());
        writer.tgWriteString(this.message);
        writer.writeVector(this.entities, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUserInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditUserInfo {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _message = reader.tgReadString();
        args.message = _message;
        const _entities = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.entities = _entities;
        return new EditUserInfo(args);
    }
}