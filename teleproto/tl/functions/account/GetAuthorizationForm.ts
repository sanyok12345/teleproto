import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAuthorizationForm } from "../../types/account/TypeAuthorizationForm";

export class GetAuthorizationForm extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2838059386;
    static SUBCLASS_OF_ID = 2013567636;
    static className = "account.GetAuthorizationForm";
    static classType = "request";

    botId!: bigint;
    scope!: string;
    publicKey!: string;

    constructor(args: { botId?: bigint, scope?: string, publicKey?: string } = {}) {
        super();
        this.botId = args.botId!;
        this.scope = args.scope!;
        this.publicKey = args.publicKey!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2838059386, false);
        writer.writeLargeInt(this.botId, 64);
        writer.tgWriteString(this.scope);
        writer.tgWriteString(this.publicKey);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorizationForm {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAuthorizationForm {
        const args: any = {};
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _scope = reader.tgReadString();
        args.scope = _scope;
        const _publicKey = reader.tgReadString();
        args.publicKey = _publicKey;
        return new GetAuthorizationForm(args);
    }
}