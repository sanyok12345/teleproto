import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SmsJob extends TLObject {
    static CONSTRUCTOR_ID = 3869372088;
    static SUBCLASS_OF_ID = 522459262;
    static className = "SmsJob";
    static classType = "constructor";

    jobId!: string;
    phoneNumber!: string;
    text!: string;

    constructor(args: { jobId?: string, phoneNumber?: string, text?: string } = {}) {
        super();
        this.jobId = args.jobId!;
        this.phoneNumber = args.phoneNumber!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3869372088, false);
        writer.tgWriteString(this.jobId);
        writer.tgWriteString(this.phoneNumber);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SmsJob {
        const args: any = {};
        const _jobId = reader.tgReadString();
        args.jobId = _jobId;
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _text = reader.tgReadString();
        args.text = _text;
        return new SmsJob(args);
    }
}