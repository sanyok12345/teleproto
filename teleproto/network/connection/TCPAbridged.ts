import { readBufferFromBigInt } from "../../Helpers";
import { Connection, PacketCodec } from "./Connection";
import { InvalidBufferError } from "../../errors";
import type { PacketReader } from "../../extensions/SocketInterface";

import bigInt from "big-integer";

const TRANSPORT_ERROR_HEAD = new Set([
    0x6c, // -404
    0x53, // -429
    0x44, // -444
]);
const TRANSPORT_ERROR_CODES = new Set([-404, -429, -444]);

export class AbridgedPacketCodec extends PacketCodec {
    static tag = Buffer.from("ef", "hex");
    static obfuscateTag = Buffer.from("efefefef", "hex");
    private tag: Buffer;
    obfuscateTag: Buffer;

    constructor(props: any) {
        super(props);
        this.tag = AbridgedPacketCodec.tag;
        this.obfuscateTag = AbridgedPacketCodec.obfuscateTag;
    }

    encodePacket(data: Buffer) {
        let length = data.length >> 2;
        let temp;
        if (length < 127) {
            const b = Buffer.alloc(1);
            b.writeUInt8(length, 0);
            temp = b;
        } else {
            temp = Buffer.concat([
                Buffer.from("7f", "hex"),
                readBufferFromBigInt(bigInt(length), 3),
            ]);
        }
        return Buffer.concat([temp, data]);
    }

    async readPacket(
        reader: PacketReader
    ): Promise<Buffer> {
        const readData = await reader.readExactly(1);
        let length = readData[0];
        if (length >= 127) {
            length = Buffer.concat([
                await reader.readExactly(3),
                Buffer.alloc(1),
            ]).readInt32LE(0);
        } else if (TRANSPORT_ERROR_HEAD.has(length)) {
            const tail = await reader.readExactly(3);
            const candidate = Buffer.concat([Buffer.from([length]), tail]);
            if (TRANSPORT_ERROR_CODES.has(candidate.readInt32LE(0))) {
                throw new InvalidBufferError(candidate);
            }
            const rest = await reader.readExactly((length << 2) - 3);
            return Buffer.concat([tail, rest]);
        }

        return reader.readExactly(length << 2);
    }
}

/**
 * This is the mode with the lowest overhead, as it will
 * only require 1 byte if the packet length is less than
 * 508 bytes (127 << 2, which is very common).
 */
export class ConnectionTCPAbridged extends Connection {
    PacketCodecClass = AbridgedPacketCodec;
}
