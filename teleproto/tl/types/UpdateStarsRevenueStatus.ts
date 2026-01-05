import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStarsRevenueStatus } from "./TypeStarsRevenueStatus";

export class UpdateStarsRevenueStatus extends TLObject {
    static CONSTRUCTOR_ID = 2776936473;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateStarsRevenueStatus";
    static classType = "constructor";

    peer!: TypePeer;
    status!: TypeStarsRevenueStatus;

    constructor(args: { peer?: TypePeer, status?: TypeStarsRevenueStatus } = {}) {
        super();
        this.peer = args.peer!;
        this.status = args.status!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2776936473, false);
        writer.write(this.peer.getBytes());
        writer.write(this.status.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateStarsRevenueStatus {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _status = reader.tgReadObject();
        args.status = _status;
        return new UpdateStarsRevenueStatus(args);
    }
}