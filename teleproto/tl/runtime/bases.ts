import type { TlBaseClass } from "./defineClass";

const customMessage = (): TlBaseClass =>
    (require("../custom/message") as typeof import("../custom/message")).CustomMessage as unknown as TlBaseClass;

export const tlBases: Record<string, () => TlBaseClass> = {
    Message: customMessage,
    MessageService: customMessage,
    MessageEmpty: customMessage,
};
