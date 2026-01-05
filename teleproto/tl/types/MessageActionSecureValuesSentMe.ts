import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValue } from "./TypeSecureValue";
import { TypeSecureCredentialsEncrypted } from "./TypeSecureCredentialsEncrypted";

export class MessageActionSecureValuesSentMe extends TLObject {
    static CONSTRUCTOR_ID = 455635795;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSecureValuesSentMe";
    static classType = "constructor";

    values!: TypeSecureValue[];
    credentials!: TypeSecureCredentialsEncrypted;

    constructor(args: { values?: TypeSecureValue[], credentials?: TypeSecureCredentialsEncrypted } = {}) {
        super();
        this.values = args.values!;
        this.credentials = args.credentials!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(455635795, false);
        writer.writeVector(this.values, (item) => {
            writer.write(item.getBytes());
        });
        writer.write(this.credentials.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSecureValuesSentMe {
        const args: any = {};
        const _values = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.values = _values;
        const _credentials = reader.tgReadObject();
        args.credentials = _credentials;
        return new MessageActionSecureValuesSentMe(args);
    }
}