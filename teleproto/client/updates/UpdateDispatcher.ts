import type { TelegramClient } from "../TelegramClient";
import type { UpdateConnectionState } from "../../network";
import { returnBigInt } from "../../Helpers";
import { StopPropagation } from "./StopPropagation";

type DispatchedUpdate = UpdateConnectionState | any;

interface DispatchJob {
    update: DispatchedUpdate;
    resolve: () => void;
    reject: (error: unknown) => void;
    next?: DispatchJob;
}

export class UpdateDispatcher {
    private head?: DispatchJob;
    private tail?: DispatchJob;
    private draining = false;

    constructor(private readonly client: TelegramClient) {}

    dispatch(update: DispatchedUpdate): Promise<void> {
        if (this.client._destroyed) return Promise.resolve();
        if (!this.client._sequentialUpdates) return this.deliver(update);
        return new Promise<void>((resolve, reject) => {
            const job: DispatchJob = { update, resolve, reject };
            if (this.tail) this.tail.next = job;
            else this.head = job;
            this.tail = job;
            if (!this.draining) void this.drain();
        });
    }

    clear(): void {
        while (this.head) {
            const job = this.head;
            this.head = job.next;
            job.next = undefined;
            job.resolve();
        }
        this.tail = undefined;
    }

    private async drain(): Promise<void> {
        this.draining = true;
        try {
            while (this.head) {
                const job = this.head;
                this.head = job.next;
                job.next = undefined;
                if (!this.head) this.tail = undefined;
                try {
                    if (!this.client._destroyed) await this.deliver(job.update);
                    job.resolve();
                } catch (error) {
                    job.reject(error);
                }
            }
        } finally {
            this.draining = false;
        }
    }

    private async deliver(update: DispatchedUpdate): Promise<void> {
        const client = this.client;
        for (const [builder, callback] of [...client._eventBuilders]) {
            if (client._destroyed) return;
            if (!builder || !callback || !update) continue;
            try {
                if (!builder.resolved) await builder.resolve(client);
            } catch (e) {
                client._log.error(`Error resolving event builder: ${e}`);
                continue;
            }
            if (!client._selfInputPeer) {
                try {
                    await client.getMe(true);
                } catch {}
            }
            let event;
            try {
                event = builder.build(
                    update,
                    callback,
                    client._selfInputPeer ? returnBigInt(client._selfInputPeer.userId) : undefined
                );
            } catch (e) {
                client._log.error(`Error building event: ${e}`);
                continue;
            }
            if (!event) continue;
            event._client = client;
            if ("_eventName" in event) {
                event.originalUpdate = update;
                event._entities = update._entities ?? new Map();
                event._setClient(client);
            }
            let accepted;
            try {
                accepted = await builder.filter(event);
            } catch (e) {
                client._log.error(`Error in event filter: ${e}`);
                continue;
            }
            if (!accepted) continue;
            try {
                await callback(event);
            } catch (e) {
                if (e instanceof StopPropagation) break;
                if (client._errorHandler) {
                    try {
                        await client._errorHandler(e as Error);
                    } catch (error) {
                        client._log.error(`Error in update error handler: ${error}`);
                    }
                }
                client._log.error(`Error in event handler: ${e}`);
            }
        }
        if (!client._destroyed) await client.updates._dispatch(update);
    }
}
