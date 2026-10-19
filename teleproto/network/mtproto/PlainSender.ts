import { Api } from "../../tl";
import { toSignedLittleBuffer } from "../../Helpers";
import { InvalidBufferError, SecurityError } from "../../errors";
import { Reader } from "../../tl/binary/Reader";
import type { Logger } from "../../extensions/Logger";
import type { Connection } from "../connection/Connection";
import { SessionState } from "./SessionState";

export class PlainSender {
    private readonly state: SessionState;

    constructor(
        private readonly connection: Connection,
        log: Logger
    ) {
        this.state = new SessionState(undefined, log);
    }

    async send(request: Api.AnyRequest): Promise<unknown> {
        const body = request.getBytes();
        const header = Buffer.alloc(20);
        toSignedLittleBuffer(this.state.newMsgId(), 8).copy(header, 8);
        header.writeInt32LE(body.length, 16);
        await this.connection.send(Buffer.concat([header, body]));

        const packet = await this.connection.recv();
        if (packet.length < 20) throw new InvalidBufferError(packet);
        const reader = new Reader(packet);
        if (!reader.readLong().isZero()) throw new SecurityError("Plain answer has a non-zero auth_key_id");
        if (reader.readLong().isZero()) throw new SecurityError("Plain answer has a zero msg_id");
        const length = reader.readInt();
        if (length <= 0 || length > packet.length - 20) throw new SecurityError("Plain answer has an invalid length");
        return reader.tgReadObject();
    }
}
