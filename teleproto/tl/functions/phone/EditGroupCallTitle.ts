import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditGroupCallTitle extends MTProtoRequest {
    static CONSTRUCTOR_ID = 480685066;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.EditGroupCallTitle";
    static classType = "request";

    call!: TypeInputGroupCall;
    title!: string;

    constructor(args: { call?: TypeInputGroupCall, title?: string } = {}) {
        super();
        this.call = args.call!;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(480685066, false);
        writer.write(this.call.getBytes());
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditGroupCallTitle {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _title = reader.tgReadString();
        args.title = _title;
        return new EditGroupCallTitle(args);
    }
}