import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RpcError extends TLObject {
    static CONSTRUCTOR_ID = 558156313;
    static SUBCLASS_OF_ID = 1243079269;
    static className = "RpcError";
    static classType = "constructor";

    errorCode!: number;
    errorMessage!: string;

    constructor(args: { errorCode?: number, errorMessage?: string } = {}) {
        super();
        this.errorCode = args.errorCode!;
        this.errorMessage = args.errorMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(558156313, false);
        writer.writeInt(this.errorCode);
        writer.tgWriteString(this.errorMessage);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RpcError {
        const args: any = {};
        const _errorCode = reader.readInt();
        args.errorCode = _errorCode;
        const _errorMessage = reader.tgReadString();
        args.errorMessage = _errorMessage;
        return new RpcError(args);
    }
}