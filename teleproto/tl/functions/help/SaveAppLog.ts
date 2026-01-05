import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputAppEvent } from "../../types/TypeInputAppEvent";

export class SaveAppLog extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1862465352;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "help.SaveAppLog";
    static classType = "request";

    events!: TypeInputAppEvent[];

    constructor(args: { events?: TypeInputAppEvent[] } = {}) {
        super();
        this.events = args.events!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1862465352, false);
        writer.writeVector(this.events, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveAppLog {
        const args: any = {};
        const _events = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.events = _events;
        return new SaveAppLog(args);
    }
}