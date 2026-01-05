import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePasskey } from "../TypePasskey";

export class Passkeys extends TLObject {
    static CONSTRUCTOR_ID = 4175473180;
    static SUBCLASS_OF_ID = 618471518;
    static className = "account.Passkeys";
    static classType = "constructor";

    passkeys!: TypePasskey[];

    constructor(args: { passkeys?: TypePasskey[] } = {}) {
        super();
        this.passkeys = args.passkeys!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4175473180, false);
        writer.writeVector(this.passkeys, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Passkeys {
        const args: any = {};
        const _passkeys = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.passkeys = _passkeys;
        return new Passkeys(args);
    }
}