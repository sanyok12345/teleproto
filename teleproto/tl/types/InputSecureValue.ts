import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValueType } from "./TypeSecureValueType";
import { TypeSecureData } from "./TypeSecureData";
import { TypeInputSecureFile } from "./TypeInputSecureFile";
import { TypeSecurePlainData } from "./TypeSecurePlainData";

export class InputSecureValue extends TLObject {
    static CONSTRUCTOR_ID = 3676426407;
    static SUBCLASS_OF_ID = 3030229500;
    static className = "InputSecureValue";
    static classType = "constructor";

    flags!: number;
    type!: TypeSecureValueType;
    data?: TypeSecureData;
    frontSide?: TypeInputSecureFile;
    reverseSide?: TypeInputSecureFile;
    selfie?: TypeInputSecureFile;
    translation?: TypeInputSecureFile[];
    files?: TypeInputSecureFile[];
    plainData?: TypeSecurePlainData;

    constructor(args: { flags?: number, type?: TypeSecureValueType, data?: TypeSecureData, frontSide?: TypeInputSecureFile, reverseSide?: TypeInputSecureFile, selfie?: TypeInputSecureFile, translation?: TypeInputSecureFile[], files?: TypeInputSecureFile[], plainData?: TypeSecurePlainData } = {}) {
        super();
        this.flags = args.flags!;
        this.type = args.type!;
        this.data = args.data;
        this.frontSide = args.frontSide;
        this.reverseSide = args.reverseSide;
        this.selfie = args.selfie;
        this.translation = args.translation;
        this.files = args.files;
        this.plainData = args.plainData;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3676426407, false);
        let flags = 0;
        if (this.data !== undefined && this.data !== null) { flags |= 1 << 0; }
        if (this.frontSide !== undefined && this.frontSide !== null) { flags |= 1 << 1; }
        if (this.reverseSide !== undefined && this.reverseSide !== null) { flags |= 1 << 2; }
        if (this.selfie !== undefined && this.selfie !== null) { flags |= 1 << 3; }
        if (this.translation !== undefined && this.translation !== null) { flags |= 1 << 6; }
        if (this.files !== undefined && this.files !== null) { flags |= 1 << 4; }
        if (this.plainData !== undefined && this.plainData !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        writer.write(this.type.getBytes());
        if (this.data !== undefined && this.data !== null) {
            writer.write(this.data.getBytes());
        }
        if (this.frontSide !== undefined && this.frontSide !== null) {
            writer.write(this.frontSide.getBytes());
        }
        if (this.reverseSide !== undefined && this.reverseSide !== null) {
            writer.write(this.reverseSide.getBytes());
        }
        if (this.selfie !== undefined && this.selfie !== null) {
            writer.write(this.selfie.getBytes());
        }
        if (this.translation !== undefined && this.translation !== null) {
            writer.writeVector(this.translation, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.files !== undefined && this.files !== null) {
            writer.writeVector(this.files, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.plainData !== undefined && this.plainData !== null) {
            writer.write(this.plainData.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputSecureValue {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _type = reader.tgReadObject();
        args.type = _type;
        if (args.flags & (1 << 0)) {
            const _data = reader.tgReadObject();
            args.data = _data;
        } else {
            args.data = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _frontSide = reader.tgReadObject();
            args.frontSide = _frontSide;
        } else {
            args.frontSide = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _reverseSide = reader.tgReadObject();
            args.reverseSide = _reverseSide;
        } else {
            args.reverseSide = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _selfie = reader.tgReadObject();
            args.selfie = _selfie;
        } else {
            args.selfie = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _translation = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.translation = _translation;
        } else {
            args.translation = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _files = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.files = _files;
        } else {
            args.files = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _plainData = reader.tgReadObject();
            args.plainData = _plainData;
        } else {
            args.plainData = undefined;
        }
        return new InputSecureValue(args);
    }
}