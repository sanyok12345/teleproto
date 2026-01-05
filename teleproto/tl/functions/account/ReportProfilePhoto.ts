import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputPhoto } from "../../types/TypeInputPhoto";
import { TypeReportReason } from "../../types/TypeReportReason";

export class ReportProfilePhoto extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4203529973;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ReportProfilePhoto";
    static classType = "request";

    peer?: EntityLike;
    photoId!: TypeInputPhoto;
    reason!: TypeReportReason;
    message!: string;

    constructor(args: { peer?: EntityLike, photoId?: TypeInputPhoto, reason?: TypeReportReason, message?: string } = {}) {
        super();
        this.peer = args.peer;
        this.photoId = args.photoId!;
        this.reason = args.reason!;
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4203529973, false);
        writer.write((this.peer! as any).getBytes());
        writer.write(this.photoId.getBytes());
        writer.write(this.reason.getBytes());
        writer.tgWriteString(this.message);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReportProfilePhoto {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _photoId = reader.tgReadObject();
        args.photoId = _photoId;
        const _reason = reader.tgReadObject();
        args.reason = _reason;
        const _message = reader.tgReadString();
        args.message = _message;
        return new ReportProfilePhoto(args);
    }
}