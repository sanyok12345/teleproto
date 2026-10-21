import type { ResourceState } from "./ResourceState";

export type ResourceMode = "baseline" | "greedy";

export interface ResourceConsumer {
    readonly resource: ResourceState;
    onResources(): void;
}

interface Node {
    consumer: ResourceConsumer;
    priority: number;
}

export class ResourceManager {
    private readonly nodes: Node[] = [];
    private scheduled = false;

    constructor(
        readonly maxLimit: number,
        readonly mode: ResourceMode
    ) {}

    get size() {
        return this.nodes.length;
    }

    register(consumer: ResourceConsumer, priority: number) {
        const rank = Math.abs(priority);
        const index =
            priority >= 0
                ? this.nodes.findIndex((node) => node.priority <= rank)
                : this.nodes.findIndex((node) => node.priority < rank);
        const node = { consumer, priority: rank };
        if (index < 0) this.nodes.push(node);
        else this.nodes.splice(index, 0, node);
        this.update();
    }

    unregister(consumer: ResourceConsumer) {
        const index = this.nodes.findIndex((node) => node.consumer === consumer);
        if (index >= 0) this.nodes.splice(index, 1);
        this.update();
    }

    update() {
        if (this.scheduled) return;
        this.scheduled = true;
        queueMicrotask(() => {
            this.scheduled = false;
            this.loop();
        });
    }

    private loop() {
        let pool = this.maxLimit;
        for (const { consumer } of this.nodes) pool -= Math.max(0, consumer.resource.activeLimit);
        if (this.mode === "baseline") {
            for (const { consumer } of this.nodes) {
                const left = this.satisfy(consumer, pool);
                pool = left.pool;
                if (!left.satisfied) break;
            }
            return;
        }
        const waiting = new Set(this.nodes.map((node) => node.consumer));
        while (waiting.size) {
            let next: ResourceConsumer | undefined;
            for (const consumer of waiting) {
                const extra = consumer.resource.estimatedExtra;
                if (extra <= 0) {
                    waiting.delete(consumer);
                    continue;
                }
                if (!next || extra < next.resource.estimatedExtra) next = consumer;
            }
            if (!next) return;
            waiting.delete(next);
            const left = this.satisfy(next, pool);
            pool = left.pool;
            if (!left.satisfied) return;
        }
    }

    private satisfy(consumer: ResourceConsumer, pool: number): { pool: number; satisfied: boolean } {
        const state = consumer.resource;
        const need = state.estimatedExtra;
        if (need <= 0) return { pool, satisfied: true };
        const grant = Math.floor(Math.min(need, pool) / state.unitSize) * state.unitSize;
        if (grant > 0) {
            state.limit += grant;
            pool -= grant;
            queueMicrotask(() => consumer.onResources());
        }
        return { pool, satisfied: grant >= need };
    }
}
