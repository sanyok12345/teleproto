import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeUpdates } from "../TypeUpdates";
import { TypeMissingInvitee } from "../TypeMissingInvitee";

export class InvitedUsers extends TLObject {
    static CONSTRUCTOR_ID = 2136862630;
    static SUBCLASS_OF_ID = 1035899041;
    static className = "messages.InvitedUsers";
    static classType = "constructor";

    updates!: TypeUpdates;
    missingInvitees!: TypeMissingInvitee[];

    constructor(args: { updates?: TypeUpdates, missingInvitees?: TypeMissingInvitee[] } = {}) {
        super();
        this.updates = args.updates!;
        this.missingInvitees = args.missingInvitees!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2136862630, false);
        writer.write(this.updates.getBytes());
        writer.writeVector(this.missingInvitees, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InvitedUsers {
        const args: any = {};
        const _updates = reader.tgReadObject();
        args.updates = _updates;
        const _missingInvitees = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.missingInvitees = _missingInvitees;
        return new InvitedUsers(args);
    }
}