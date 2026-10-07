import { Connection, PacketCodec } from "./Connection";
import { crc32 } from "../../Helpers";
import { InvalidBufferError, InvalidChecksumError } from "../../errors";
import type { PacketReader } from "../../extensions/SocketInterface";

export class FullPacketCodec extends PacketCodec {
    private _sendCounter: number;

    constructor(connection: any) {
        super(connection);
        this._sendCounter = 0; // Telegram will ignore us otherwise
    }

    encodePacket(data: Buffer): Buffer {
        const length = data.length + 12;
        const packet = Buffer.allocUnsafe(length);
        packet.writeInt32LE(length, 0);
        packet.writeInt32LE(this._sendCounter, 4);
        data.copy(packet, 8);
        packet.writeUInt32LE(crc32(packet.subarray(0, length - 4)), length - 4);
        this._sendCounter += 1;
        return packet;
    }

    /**
     *
     * @param reader {PacketReader}
     * @returns {Promise<*>}
     */
    async readPacket(
        reader: PacketReader
    ): Promise<Buffer> {
        const lenBuf = await reader.readExactly(4);
        if (lenBuf === undefined) {
            // Return empty buffer in case of issue
            return Buffer.alloc(0);
        }
        const packetLen = lenBuf.readInt32LE(0);
        if (packetLen < 0) {
            throw new InvalidBufferError(lenBuf);
        }
        const seqBuf = await reader.readExactly(4);
        let body = await reader.readExactly(packetLen - 8);
        const checksum = body.slice(-4).readUInt32LE(0);
        body = body.slice(0, -4);

        const validChecksum = crc32(body, crc32(seqBuf, crc32(lenBuf)));
        if (!(validChecksum === checksum)) {
            throw new InvalidChecksumError(checksum, validChecksum);
        }
        return body;
    }
}

export class ConnectionTCPFull extends Connection {
    PacketCodecClass = FullPacketCodec;
}
