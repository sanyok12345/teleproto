import { setMaxListeners as nodeSetMaxListeners } from "node:events";

export function setMaxListeners(count: number, ...targets: EventTarget[]): void {
    nodeSetMaxListeners(count, ...targets);
}
