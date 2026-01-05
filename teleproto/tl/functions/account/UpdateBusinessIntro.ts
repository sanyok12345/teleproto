import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBusinessIntro } from "../../types/TypeInputBusinessIntro";

export class UpdateBusinessIntro extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2786381876;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateBusinessIntro";
    static classType = "request";

    flags?: number;
    intro?: TypeInputBusinessIntro;

    constructor(args: { flags?: number, intro?: TypeInputBusinessIntro } = {}) {
        super();
        this.flags = args.flags;
        this.intro = args.intro;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2786381876, false);
        let flags = 0;
        if (this.intro !== undefined && this.intro !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.intro !== undefined && this.intro !== null) {
            writer.write(this.intro.getBytes());
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

    static fromReader(reader: BinaryReader): UpdateBusinessIntro {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _intro = reader.tgReadObject();
            args.intro = _intro;
        } else {
            args.intro = undefined;
        }
        return new UpdateBusinessIntro(args);
    }
}