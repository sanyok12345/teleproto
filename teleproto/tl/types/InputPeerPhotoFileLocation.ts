import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputPeerPhotoFileLocation extends TLObject {
    static CONSTRUCTOR_ID = 925204121;
    static SUBCLASS_OF_ID = 354669666;
    static className = "InputPeerPhotoFileLocation";
    static classType = "constructor";

    flags!: number;
    big?: boolean;
    peer!: TypeInputPeer;
    photoId!: bigint;

    constructor(args: { flags?: number, big?: boolean, peer?: TypeInputPeer, photoId?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.big = args.big;
        this.peer = args.peer!;
        this.photoId = args.photoId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(925204121, false);
        let flags = 0;
        if (this.big) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.big !== undefined && this.big !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeLargeInt(this.photoId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerPhotoFileLocation {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _big = true;
            args.big = _big;
        } else {
            args.big = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _photoId = reader.readLargeInt(64);
        args.photoId = _photoId;
        return new InputPeerPhotoFileLocation(args);
    }
}