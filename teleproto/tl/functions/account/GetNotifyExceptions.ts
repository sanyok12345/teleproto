import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputNotifyPeer } from "../../types/TypeInputNotifyPeer";
import { TypeUpdates } from "../../types/TypeUpdates";

export class GetNotifyExceptions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1398240377;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "account.GetNotifyExceptions";
    static classType = "request";

    flags?: number;
    compareSound?: boolean;
    compareStories?: boolean;
    peer?: TypeInputNotifyPeer;

    constructor(args: { flags?: number, compareSound?: boolean, compareStories?: boolean, peer?: TypeInputNotifyPeer } = {}) {
        super();
        this.flags = args.flags;
        this.compareSound = args.compareSound;
        this.compareStories = args.compareStories;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1398240377, false);
        let flags = 0;
        if (this.compareSound) { flags |= 1 << 1; }
        if (this.compareStories) { flags |= 1 << 2; }
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.compareSound !== undefined && this.compareSound !== null) {
        }
        if (this.compareStories !== undefined && this.compareStories !== null) {
        }
        if (this.peer !== undefined && this.peer !== null) {
            writer.write(this.peer.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetNotifyExceptions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _compareSound = true;
            args.compareSound = _compareSound;
        } else {
            args.compareSound = false;
        }
        if (args.flags & (1 << 2)) {
            const _compareStories = true;
            args.compareStories = _compareStories;
        } else {
            args.compareStories = false;
        }
        if (args.flags & (1 << 0)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        return new GetNotifyExceptions(args);
    }
}