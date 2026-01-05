import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ResolveStarGiftOffer extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3922622492;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.ResolveStarGiftOffer";
    static classType = "request";

    flags?: number;
    decline?: boolean;
    offerMsgId!: number;

    constructor(args: { flags?: number, decline?: boolean, offerMsgId?: number } = {}) {
        super();
        this.flags = args.flags;
        this.decline = args.decline;
        this.offerMsgId = args.offerMsgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3922622492, false);
        let flags = 0;
        if (this.decline) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.decline !== undefined && this.decline !== null) {
        }
        writer.writeInt(this.offerMsgId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResolveStarGiftOffer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _decline = true;
            args.decline = _decline;
        } else {
            args.decline = false;
        }
        const _offerMsgId = reader.readInt();
        args.offerMsgId = _offerMsgId;
        return new ResolveStarGiftOffer(args);
    }
}