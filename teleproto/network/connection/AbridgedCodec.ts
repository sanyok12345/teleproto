import { Connection, PacketCodec } from "./Connection";
import { InvalidBufferError } from "../../errors";
import type { PacketReader } from "../transport/socket/types";
import { Buffer } from "../../platform";

const TRANSPORT_ERROR_HEADS = new Set([0x6c, 0x53, 0x44]);
const TRANSPORT_ERROR_CODES = new Set([-404, -429, -444]);

export class AbridgedPacketCodec extends PacketCodec {
    static readonly tag = Buffer.from("ef", "hex");
    static readonly obfuscateTag = Buffer.from("efefefef", "hex");

    encodePacket(data: Buffer): Buffer {
        const words = data.length >> 2;
        if (words < 127) return Buffer.concat([Buffer.from([words]), data]);
        const head = Buffer.allocUnsafe(4);
        head.writeUInt32LE(((words << 8) | 0x7f) >>> 0, 0);
        return Buffer.concat([head, data]);
    }

    async readPacket(reader: PacketReader): Promise<Buffer> {
        const first = (await reader.readExactly(1))[0];
        if (first >= 0x7f) {
            const length = (await reader.readExactly(3)).readUIntLE(0, 3);
            return reader.readExactly(length << 2);
        }
        if (TRANSPORT_ERROR_HEADS.has(first)) {
            const tail = await reader.readExactly(3);
            const candidate = Buffer.concat([Buffer.from([first]), tail]);
            if (TRANSPORT_ERROR_CODES.has(candidate.readInt32LE(0))) throw new InvalidBufferError(candidate);
            return Buffer.concat([tail, await reader.readExactly((first << 2) - 3)]);
        }
        return reader.readExactly(first << 2);
    }
}

export class ConnectionTCPAbridged extends Connection {
    PacketCodecClass = AbridgedPacketCodec;
}
