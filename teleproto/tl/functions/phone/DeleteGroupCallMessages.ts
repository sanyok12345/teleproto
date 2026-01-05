import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DeleteGroupCallMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4132394231;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.DeleteGroupCallMessages";
    static classType = "request";

    flags?: number;
    reportSpam?: boolean;
    call!: TypeInputGroupCall;
    messages!: number[];

    constructor(args: { flags?: number, reportSpam?: boolean, call?: TypeInputGroupCall, messages?: number[] } = {}) {
        super();
        this.flags = args.flags;
        this.reportSpam = args.reportSpam;
        this.call = args.call!;
        this.messages = args.messages!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4132394231, false);
        let flags = 0;
        if (this.reportSpam) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.reportSpam !== undefined && this.reportSpam !== null) {
        }
        writer.write(this.call.getBytes());
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteGroupCallMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _reportSpam = true;
            args.reportSpam = _reportSpam;
        } else {
            args.reportSpam = false;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        return new DeleteGroupCallMessages(args);
    }
}