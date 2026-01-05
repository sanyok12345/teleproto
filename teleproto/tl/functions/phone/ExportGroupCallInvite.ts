import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeExportedGroupCallInvite } from "../../types/phone/TypeExportedGroupCallInvite";

export class ExportGroupCallInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3869926527;
    static SUBCLASS_OF_ID = 993787535;
    static className = "phone.ExportGroupCallInvite";
    static classType = "request";

    flags?: number;
    canSelfUnmute?: boolean;
    call!: TypeInputGroupCall;

    constructor(args: { flags?: number, canSelfUnmute?: boolean, call?: TypeInputGroupCall } = {}) {
        super();
        this.flags = args.flags;
        this.canSelfUnmute = args.canSelfUnmute;
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3869926527, false);
        let flags = 0;
        if (this.canSelfUnmute) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.canSelfUnmute !== undefined && this.canSelfUnmute !== null) {
        }
        writer.write(this.call.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedGroupCallInvite {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportGroupCallInvite {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _canSelfUnmute = true;
            args.canSelfUnmute = _canSelfUnmute;
        } else {
            args.canSelfUnmute = false;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        return new ExportGroupCallInvite(args);
    }
}