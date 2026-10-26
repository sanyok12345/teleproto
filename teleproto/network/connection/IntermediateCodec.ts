import { generateRandomBytes } from "../../Helpers";
import { crypto } from "../../platform";
import { Connection, PacketCodec } from "./Connection";
import { InvalidBufferError } from "../../errors";
import type { PacketReader } from "../transport/socket/types";

const TRANSPORT_ERRORS = new Set([-404, -429, -444]);
const MAX_PACKET_LENGTH = (1 << 24) + 1024;

export async function readIntermediateLength(reader: PacketReader): Promise<number> {
    const header = await reader.readExactly(4);
    const length = header.readInt32LE(0);
    if (TRANSPORT_ERRORS.has(length)) throw new InvalidBufferError(header);
    if (length < 4 || length > MAX_PACKET_LENGTH) throw new Error(`Invalid intermediate packet length: ${length}`);
    return length;
}

export function checkTransportError(body: Buffer) {
    if (body.length === 4 && body.readInt32LE(0) < 0) throw new InvalidBufferError(body);
}

export class IntermediatePacketCodec extends PacketCodec {
    static readonly tag = Buffer.from("eeeeeeee", "hex");
    static readonly obfuscateTag = IntermediatePacketCodec.tag;

    encodePacket(data: Buffer): Buffer {
        const packet = Buffer.allocUnsafe(4 + data.length);
        packet.writeUInt32LE(data.length, 0);
        data.copy(packet, 4);
        return packet;
    }

    async readPacket(reader: PacketReader): Promise<Buffer> {
        const body = await reader.readExactly(await readIntermediateLength(reader));
        checkTransportError(body);
        return body;
    }
}

export class PaddedIntermediatePacketCodec extends PacketCodec {
    static readonly tag = Buffer.from("dddddddd", "hex");
    static readonly obfuscateTag = PaddedIntermediatePacketCodec.tag;

    encodePacket(data: Buffer): Buffer {
        const padding = crypto.randomInt(16);
        const packet = Buffer.allocUnsafe(4 + data.length + padding);
        packet.writeUInt32LE(data.length + padding, 0);
        data.copy(packet, 4);
        if (padding) generateRandomBytes(padding).copy(packet, 4 + data.length);
        return packet;
    }

    async readPacket(reader: PacketReader): Promise<Buffer> {
        const length = await readIntermediateLength(reader);
        const body = await reader.readExactly(length);
        if (length < 20) {
            checkTransportError(body.subarray(0, 4));
            throw new Error("Invalid padded intermediate payload");
        }
        if (body.readBigUInt64LE(0) === BigInt(0)) {
            const end = 20 + body.readUInt32LE(16);
            if (end > length) throw new Error("Invalid unencrypted MTProto payload length");
            return body.subarray(0, end);
        }
        if (length < 40) throw new Error("Invalid encrypted MTProto payload length");
        return body.subarray(0, length - ((length - 24) % 16));
    }
}

export class ConnectionTCPIntermediate extends Connection {
    PacketCodecClass = IntermediatePacketCodec;
}

export class ConnectionTCPPaddedIntermediate extends Connection {
    PacketCodecClass = PaddedIntermediatePacketCodec;

    get usesRandomPadding(): boolean {
        return true;
    }
}
