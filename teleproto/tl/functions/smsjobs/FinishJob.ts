import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class FinishJob extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1327415076;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "smsjobs.FinishJob";
    static classType = "request";

    flags?: number;
    jobId!: string;
    error?: string;

    constructor(args: { flags?: number, jobId?: string, error?: string } = {}) {
        super();
        this.flags = args.flags;
        this.jobId = args.jobId!;
        this.error = args.error;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1327415076, false);
        let flags = 0;
        if (this.error !== undefined && this.error !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.jobId);
        if (this.error !== undefined && this.error !== null) {
            writer.tgWriteString(this.error);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): FinishJob {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _jobId = reader.tgReadString();
        args.jobId = _jobId;
        if (args.flags & (1 << 0)) {
            const _error = reader.tgReadString();
            args.error = _error;
        } else {
            args.error = undefined;
        }
        return new FinishJob(args);
    }
}