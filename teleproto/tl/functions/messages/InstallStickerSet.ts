import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStickerSet } from "../../types/TypeInputStickerSet";
import { TypeStickerSetInstallResult } from "../../types/messages/TypeStickerSetInstallResult";

export class InstallStickerSet extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3348096096;
    static SUBCLASS_OF_ID = 1741373416;
    static className = "messages.InstallStickerSet";
    static classType = "request";

    stickerset!: TypeInputStickerSet;
    archived!: boolean;

    constructor(args: { stickerset?: TypeInputStickerSet, archived?: boolean } = {}) {
        super();
        this.stickerset = args.stickerset!;
        this.archived = args.archived!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3348096096, false);
        writer.write(this.stickerset.getBytes());
        writer.tgWriteBool(this.archived);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickerSetInstallResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InstallStickerSet {
        const args: any = {};
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        const _archived = reader.tgReadBool();
        args.archived = _archived;
        return new InstallStickerSet(args);
    }
}