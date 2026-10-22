import type { EventBuilder } from "../../events/common";
import { Raw } from "../../events/Raw";
import type { TelegramClient } from "../TelegramClient";

export { StopPropagation } from "../updates/StopPropagation";

export function on(client: TelegramClient, event?: EventBuilder) {
    return (f: (event: any) => void) => {
        client.addEventHandler(f, event);
        return f;
    };
}

export function addEventHandler(client: TelegramClient, callback: CallableFunction, event?: EventBuilder) {
    event ??= new Raw({});
    event.client = client;
    client._eventBuilders.push([event, callback]);
}

export function removeEventHandler(client: TelegramClient, callback: CallableFunction, event: EventBuilder) {
    client._eventBuilders = client._eventBuilders.filter((item) => item[0] !== event && item[1] !== callback);
}

export function listEventHandlers(client: TelegramClient) {
    return client._eventBuilders;
}

export async function catchUp(client: TelegramClient): Promise<void> {
    await client.updateManager.catchUp();
}
