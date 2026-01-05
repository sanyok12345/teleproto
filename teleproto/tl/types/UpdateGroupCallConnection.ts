import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class UpdateGroupCallConnection extends TLObject {
    static CONSTRUCTOR_ID = 192428418;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateGroupCallConnection";
    static classType = "constructor";

    flags!: number;
    presentation?: boolean;
    params!: TypeDataJSON;

    constructor(args: { flags?: number, presentation?: boolean, params?: TypeDataJSON } = {}) {
        super();
        this.flags = args.flags!;
        this.presentation = args.presentation;
        this.params = args.params!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(192428418, false);
        let flags = 0;
        if (this.presentation) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.presentation !== undefined && this.presentation !== null) {
        }
        writer.write(this.params.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateGroupCallConnection {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _presentation = true;
            args.presentation = _presentation;
        } else {
            args.presentation = false;
        }
        const _params = reader.tgReadObject();
        args.params = _params;
        return new UpdateGroupCallConnection(args);
    }
}