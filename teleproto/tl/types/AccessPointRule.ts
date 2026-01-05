import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeIpPort } from "./TypeIpPort";

export class AccessPointRule extends TLObject {
    static CONSTRUCTOR_ID = 1182381663;
    static SUBCLASS_OF_ID = 2980880637;
    static className = "AccessPointRule";
    static classType = "constructor";

    phonePrefixRules!: string;
    dcId!: number;
    ips!: TypeIpPort[];

    constructor(args: { phonePrefixRules?: string, dcId?: number, ips?: TypeIpPort[] } = {}) {
        super();
        this.phonePrefixRules = args.phonePrefixRules!;
        this.dcId = args.dcId!;
        this.ips = args.ips!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1182381663, false);
        writer.tgWriteString(this.phonePrefixRules);
        writer.writeInt(this.dcId);
        writer.writeVector(this.ips, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AccessPointRule {
        const args: any = {};
        const _phonePrefixRules = reader.tgReadString();
        args.phonePrefixRules = _phonePrefixRules;
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _ips = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.ips = _ips;
        return new AccessPointRule(args);
    }
}