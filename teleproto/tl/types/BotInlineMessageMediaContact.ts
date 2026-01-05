import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReplyMarkup } from "./TypeReplyMarkup";

export class BotInlineMessageMediaContact extends TLObject {
    static CONSTRUCTOR_ID = 416402882;
    static SUBCLASS_OF_ID = 3297841032;
    static className = "BotInlineMessageMediaContact";
    static classType = "constructor";

    flags!: number;
    phoneNumber!: string;
    firstName!: string;
    lastName!: string;
    vcard!: string;
    replyMarkup?: TypeReplyMarkup;

    constructor(args: { flags?: number, phoneNumber?: string, firstName?: string, lastName?: string, vcard?: string, replyMarkup?: TypeReplyMarkup } = {}) {
        super();
        this.flags = args.flags!;
        this.phoneNumber = args.phoneNumber!;
        this.firstName = args.firstName!;
        this.lastName = args.lastName!;
        this.vcard = args.vcard!;
        this.replyMarkup = args.replyMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(416402882, false);
        let flags = 0;
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.phoneNumber);
        writer.tgWriteString(this.firstName);
        writer.tgWriteString(this.lastName);
        writer.tgWriteString(this.vcard);
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotInlineMessageMediaContact {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _firstName = reader.tgReadString();
        args.firstName = _firstName;
        const _lastName = reader.tgReadString();
        args.lastName = _lastName;
        const _vcard = reader.tgReadString();
        args.vcard = _vcard;
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        return new BotInlineMessageMediaContact(args);
    }
}