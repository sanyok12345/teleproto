import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";

export class CheckGroupCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3046963575;
    static SUBCLASS_OF_ID = 1344696591;
    static className = "phone.CheckGroupCall";
    static classType = "request";

    call!: TypeInputGroupCall;
    sources!: number[];

    constructor(args: { call?: TypeInputGroupCall, sources?: number[] } = {}) {
        super();
        this.call = args.call!;
        this.sources = args.sources!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3046963575, false);
        writer.write(this.call.getBytes());
        writer.writeVector(this.sources, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): number[] {
        const result = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _sources = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.sources = _sources;
        return new CheckGroupCall(args);
    }
}