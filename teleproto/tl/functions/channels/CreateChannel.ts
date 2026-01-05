import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGeoPoint } from "../../types/TypeInputGeoPoint";
import { TypeUpdates } from "../../types/TypeUpdates";

export class CreateChannel extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2432722695;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.CreateChannel";
    static classType = "request";

    flags?: number;
    broadcast?: boolean;
    megagroup?: boolean;
    forImport?: boolean;
    forum?: boolean;
    title!: string;
    about!: string;
    geoPoint?: TypeInputGeoPoint;
    address?: string;
    ttlPeriod?: number;

    constructor(args: { flags?: number, broadcast?: boolean, megagroup?: boolean, forImport?: boolean, forum?: boolean, title?: string, about?: string, geoPoint?: TypeInputGeoPoint, address?: string, ttlPeriod?: number } = {}) {
        super();
        this.flags = args.flags;
        this.broadcast = args.broadcast;
        this.megagroup = args.megagroup;
        this.forImport = args.forImport;
        this.forum = args.forum;
        this.title = args.title!;
        this.about = args.about!;
        this.geoPoint = args.geoPoint;
        this.address = args.address;
        this.ttlPeriod = args.ttlPeriod;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2432722695, false);
        let flags = 0;
        if (this.broadcast) { flags |= 1 << 0; }
        if (this.megagroup) { flags |= 1 << 1; }
        if (this.forImport) { flags |= 1 << 3; }
        if (this.forum) { flags |= 1 << 5; }
        if (this.geoPoint !== undefined && this.geoPoint !== null) { flags |= 1 << 2; }
        if (this.address !== undefined && this.address !== null) { flags |= 1 << 2; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.broadcast !== undefined && this.broadcast !== null) {
        }
        if (this.megagroup !== undefined && this.megagroup !== null) {
        }
        if (this.forImport !== undefined && this.forImport !== null) {
        }
        if (this.forum !== undefined && this.forum !== null) {
        }
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.about);
        if (this.geoPoint !== undefined && this.geoPoint !== null) {
            writer.write(this.geoPoint.getBytes());
        }
        if (this.address !== undefined && this.address !== null) {
            writer.tgWriteString(this.address);
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CreateChannel {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _broadcast = true;
            args.broadcast = _broadcast;
        } else {
            args.broadcast = false;
        }
        if (args.flags & (1 << 1)) {
            const _megagroup = true;
            args.megagroup = _megagroup;
        } else {
            args.megagroup = false;
        }
        if (args.flags & (1 << 3)) {
            const _forImport = true;
            args.forImport = _forImport;
        } else {
            args.forImport = false;
        }
        if (args.flags & (1 << 5)) {
            const _forum = true;
            args.forum = _forum;
        } else {
            args.forum = false;
        }
        const _title = reader.tgReadString();
        args.title = _title;
        const _about = reader.tgReadString();
        args.about = _about;
        if (args.flags & (1 << 2)) {
            const _geoPoint = reader.tgReadObject();
            args.geoPoint = _geoPoint;
        } else {
            args.geoPoint = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _address = reader.tgReadString();
            args.address = _address;
        } else {
            args.address = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        return new CreateChannel(args);
    }
}