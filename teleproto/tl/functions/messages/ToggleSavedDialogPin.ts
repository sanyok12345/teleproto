import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDialogPeer } from "../../types/TypeInputDialogPeer";

export class ToggleSavedDialogPin extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2894183390;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ToggleSavedDialogPin";
    static classType = "request";

    flags?: number;
    pinned?: boolean;
    peer?: TypeInputDialogPeer;

    constructor(args: { flags?: number, pinned?: boolean, peer?: TypeInputDialogPeer } = {}) {
        super();
        this.flags = args.flags;
        this.pinned = args.pinned;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2894183390, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        writer.write(this.peer!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleSavedDialogPin {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new ToggleSavedDialogPin(args);
    }
}