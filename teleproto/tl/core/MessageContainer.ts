import { TLMessage } from "./TLMessage";
import type { Reader } from "../binary/Reader";

export class MessageContainer {
    static readonly CONSTRUCTOR_ID = 0x73f1f8dc;
    static readonly classType = "constructor";
    static readonly MAXIMUM_SIZE = 1044456 - 8;
    static readonly MAXIMUM_LENGTH = 100;
    readonly CONSTRUCTOR_ID = MessageContainer.CONSTRUCTOR_ID;
    readonly classType = "constructor";

    constructor(readonly messages: TLMessage[]) {}

    static fromReader(reader: Reader): MessageContainer {
        const count = reader.readInt();
        const messages = new Array<TLMessage>(count);
        for (let i = 0; i < count; i++) {
            const msgId = reader.readLong();
            const seqNo = reader.readInt();
            const length = reader.readInt();
            const start = reader.tellPosition();
            const obj = reader.tgReadObject();
            reader.setPosition(start + length);
            messages[i] = new TLMessage(msgId, seqNo, obj);
        }
        return new MessageContainer(messages);
    }
}
