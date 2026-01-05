import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputInvoiceBusinessBotTransferStars extends TLObject {
    static CONSTRUCTOR_ID = 4103700034;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceBusinessBotTransferStars";
    static classType = "constructor";

    bot!: TypeInputUser;
    stars!: bigint;

    constructor(args: { bot?: TypeInputUser, stars?: bigint } = {}) {
        super();
        this.bot = args.bot!;
        this.stars = args.stars!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4103700034, false);
        writer.write(this.bot.getBytes());
        writer.writeLargeInt(this.stars, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceBusinessBotTransferStars {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        return new InputInvoiceBusinessBotTransferStars(args);
    }
}