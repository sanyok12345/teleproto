import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateSmsJob extends TLObject {
    static CONSTRUCTOR_ID = 4049758676;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateSmsJob";
    static classType = "constructor";

    jobId!: string;

    constructor(args: { jobId?: string } = {}) {
        super();
        this.jobId = args.jobId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4049758676, false);
        writer.tgWriteString(this.jobId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateSmsJob {
        const args: any = {};
        const _jobId = reader.tgReadString();
        args.jobId = _jobId;
        return new UpdateSmsJob(args);
    }
}