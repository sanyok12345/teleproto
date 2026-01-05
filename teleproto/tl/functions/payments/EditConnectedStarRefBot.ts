import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeConnectedStarRefBots } from "../../types/payments/TypeConnectedStarRefBots";

export class EditConnectedStarRefBot extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3841762467;
    static SUBCLASS_OF_ID = 593369703;
    static className = "payments.EditConnectedStarRefBot";
    static classType = "request";

    flags?: number;
    revoked?: boolean;
    peer?: EntityLike;
    link!: string;

    constructor(args: { flags?: number, revoked?: boolean, peer?: EntityLike, link?: string } = {}) {
        super();
        this.flags = args.flags;
        this.revoked = args.revoked;
        this.peer = args.peer;
        this.link = args.link!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3841762467, false);
        let flags = 0;
        if (this.revoked) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.revoked !== undefined && this.revoked !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.link);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeConnectedStarRefBots {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditConnectedStarRefBot {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _revoked = true;
            args.revoked = _revoked;
        } else {
            args.revoked = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _link = reader.tgReadString();
        args.link = _link;
        return new EditConnectedStarRefBot(args);
    }
}