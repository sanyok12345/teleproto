import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleSignatures extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1099781276;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.ToggleSignatures";
    static classType = "request";

    flags?: number;
    signaturesEnabled?: boolean;
    profilesEnabled?: boolean;
    channel?: EntityLike;

    constructor(args: { flags?: number, signaturesEnabled?: boolean, profilesEnabled?: boolean, channel?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.signaturesEnabled = args.signaturesEnabled;
        this.profilesEnabled = args.profilesEnabled;
        this.channel = args.channel;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1099781276, false);
        let flags = 0;
        if (this.signaturesEnabled) { flags |= 1 << 0; }
        if (this.profilesEnabled) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.signaturesEnabled !== undefined && this.signaturesEnabled !== null) {
        }
        if (this.profilesEnabled !== undefined && this.profilesEnabled !== null) {
        }
        writer.write((this.channel! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleSignatures {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _signaturesEnabled = true;
            args.signaturesEnabled = _signaturesEnabled;
        } else {
            args.signaturesEnabled = false;
        }
        if (args.flags & (1 << 1)) {
            const _profilesEnabled = true;
            args.profilesEnabled = _profilesEnabled;
        } else {
            args.profilesEnabled = false;
        }
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        return new ToggleSignatures(args);
    }
}