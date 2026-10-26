import { timers } from "../../platform";
import type { TelegramClient } from "../TelegramClient";

const STALE_CHECK_INTERVAL_MS = 9000;

export class UpdateLoop {
    private controller?: AbortController;

    constructor(private readonly client: TelegramClient) { }

    get running(): boolean {
        return this.controller !== undefined;
    }

    start(catchUp = true): void {
        if (this.controller || this.client._destroyed) return;
        void this.run(catchUp);
    }

    stop(): void {
        this.controller?.abort();
        this.controller = undefined;
    }

    private async run(catchUp: boolean): Promise<void> {
        const client = this.client;
        const controller = new AbortController();
        this.controller = controller;
        const active = () => !controller.signal.aborted && !client._destroyed;
        client.updateManager.start();
        if (catchUp) await client.updateManager.catchUp();

        while (active()) {
            try {
                await timers.sleep(STALE_CHECK_INTERVAL_MS, { signal: controller.signal, ref: false });
            } catch {
                break;
            }
            if (!active()) break;
            const sender = client._sender;
            if (sender?.userDisconnected) break;
            if (!sender?.isConnected()) continue;
            await client.updateManager.recoverIfStale();
        }

        if (this.controller === controller) {
            this.controller = undefined;
            if (client._destroyed) await client.disconnect();
        }
    }
}
