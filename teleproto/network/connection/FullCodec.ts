import { Connection, PacketCodec } from "./Connection";
import { crc32 } from "../../Helpers";
import { InvalidBufferError, InvalidChecksumError } from "../../errors";
import type { PacketReader } from "../transport/socket/types";

export class FullPacketCodec extends PacketCodec {
    private sendCounter = 0;

    encodePacket(data: Buffer): Buffer {
        const length = data.length + 12;
        const packet = Buffer.allocUnsafe(length);
        packet.writeInt32LE(length, 0);
        packet.writeInt32LE(this.sendCounter++, 4);
        data.copy(packet, 8);
        packet.writeUInt32LE(crc32(packet.subarray(0, length - 4)), length - 4);
        return packet;
    }

    async readPacket(reader: PacketReader): Promise<Buffer> {
        const head = await reader.readExactly(4);
        const length = head.readInt32LE(0);
        if (length < 0) throw new InvalidBufferError(head);
        if (length < 12) throw new Error(`Invalid full packet length: ${length}`);
        const rest = await reader.readExactly(length - 4);
        const checksum = rest.readUInt32LE(rest.length - 4);
        const expected = crc32(rest.subarray(0, rest.length - 4), crc32(head));
        if (checksum !== expected) throw new InvalidChecksumError(checksum, expected);
        return rest.subarray(4, rest.length - 4);
    }
}

export class ConnectionTCPFull extends Connection {
    PacketCodecClass = FullPacketCodec;
}
