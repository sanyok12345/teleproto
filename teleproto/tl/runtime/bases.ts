import type { TlBaseClass } from "./defineClass";
import * as message from "../custom/message";

const customMessage = (): TlBaseClass =>
    message.CustomMessage as unknown as TlBaseClass;

export const tlBases: Record<string, () => TlBaseClass> = {
    Message: customMessage,
    MessageService: customMessage,
    MessageEmpty: customMessage,
};
