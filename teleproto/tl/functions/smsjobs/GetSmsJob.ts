import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSmsJob } from "../../types/TypeSmsJob";

export class GetSmsJob extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2005766191;
    static SUBCLASS_OF_ID = 522459262;
    static className = "smsjobs.GetSmsJob";
    static classType = "request";

    jobId!: string;

    constructor(args: { jobId?: string } = {}) {
        super();
        this.jobId = args.jobId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2005766191, false);
        writer.tgWriteString(this.jobId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSmsJob {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSmsJob {
        const args: any = {};
        const _jobId = reader.tgReadString();
        args.jobId = _jobId;
        return new GetSmsJob(args);
    }
}