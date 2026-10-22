import type { TelegramClient } from "../../../client/TelegramClient";
import type { UpdateConnectionState } from "../../../network";
import type { Api } from "../../../tl";

export { on, addEventHandler, removeEventHandler, listEventHandlers, catchUp } from "../../../client/methods/updates";
export { StopPropagation } from "../../../client/updates/StopPropagation";

/** @hidden @deprecated */
export function _handleUpdate(
    client: TelegramClient,
    update: Api.TypeUpdate | Api.TypeUpdates | UpdateConnectionState | number
): void {
    client.updateManager.receive(update);
}

/** @hidden @deprecated */
export function _dispatchUpdate(client: TelegramClient, args: { update: unknown }): Promise<void> {
    return client._updateDispatcher.dispatch(args.update);
}

/** @hidden @deprecated */
export function _clearUpdateQueue(client: TelegramClient): void {
    client._updateDispatcher.clear();
}

/** @hidden @deprecated */
export function _stopUpdateLoop(client: TelegramClient): void {
    client._updateLoop.stop();
}

/** @hidden @deprecated */
export async function _updateLoop(client: TelegramClient, catchUp = true): Promise<void> {
    client._updateLoop.start(catchUp);
}
