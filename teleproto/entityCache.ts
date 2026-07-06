import { getInputPeer, getPeerId } from "./Utils";
import { isArrayLike, returnBigInt } from "./Helpers";
import { Api } from "./tl";
import bigInt from "big-integer";
import type { EntityLike } from "./define";

export interface CachePolicy {
    /**
     * Maximum number of cached peers, counted separately for users and
     * chats/channels. `0` or omitted - unlimited.
     */
    max?: number;
    /**
     * Peer lifetime in milliseconds since it was cached; an expired peer is
     * re-resolved on next access. `0` or omitted - never expires.
     */
    ttl?: number;
}

/**
 * Entity cache configuration:
 * omitted / `true` - default limits ({@link ENTITY_CACHE_DEFAULTS});
 * `false` - cache disabled, peers are resolved from the session store;
 * `{ max, ttl }` - custom policy, `{ max: 0 }` for an unbounded cache.
 */
export type EntityCacheOptions = boolean | CachePolicy;

export const ENTITY_CACHE_DEFAULTS = {
    max: 4096,
    ttl: 0,
} as const satisfies Required<CachePolicy>;

type PeerKey = bigInt.BigInteger | string | number;

type CachedPeer =
    | { readonly kind: "self" }
    | { readonly kind: "user"; readonly id: bigInt.BigInteger; readonly hash: bigInt.BigInteger }
    | { readonly kind: "chat"; readonly id: bigInt.BigInteger }
    | { readonly kind: "channel"; readonly id: bigInt.BigInteger; readonly hash: bigInt.BigInteger }
    | { readonly kind: "raw"; readonly peer: Api.TypeInputPeer };

interface CacheEntry {
    peer: CachedPeer;
    writtenAt: number;
}

function toCachedPeer(peer: Api.TypeInputPeer): CachedPeer {
    if (peer instanceof Api.InputPeerUser) {
        return { kind: "user", id: peer.userId, hash: peer.accessHash };
    }
    if (peer instanceof Api.InputPeerChat) {
        return { kind: "chat", id: peer.chatId };
    }
    if (peer instanceof Api.InputPeerChannel) {
        return { kind: "channel", id: peer.channelId, hash: peer.accessHash };
    }
    if (peer instanceof Api.InputPeerSelf) {
        return { kind: "self" };
    }
    return { kind: "raw", peer };
}

function buildInputPeer(cached: CachedPeer): Api.TypeInputPeer {
    switch (cached.kind) {
        case "self":
            return new Api.InputPeerSelf();
        case "user":
            return new Api.InputPeerUser({ userId: cached.id, accessHash: cached.hash });
        case "chat":
            return new Api.InputPeerChat({ chatId: cached.id });
        case "channel":
            return new Api.InputPeerChannel({ channelId: cached.id, accessHash: cached.hash });
        case "raw":
            return cached.peer;
        default:
            return assertNever(cached);
    }
}

function assertNever(value: never): never {
    throw new Error(`Unhandled cached peer: ${JSON.stringify(value)}`);
}

function collectEntities(input: unknown): unknown[] {
    if (isArrayLike(input)) {
        return input;
    }
    if (input == undefined || typeof input !== "object") {
        return [];
    }
    const { users, chats, user } = input as { users?: unknown; chats?: unknown; user?: unknown };
    return [
        ...(isArrayLike(chats) ? chats : []),
        ...(isArrayLike(users) ? users : []),
        ...(user != undefined ? [user] : []),
    ];
}

export class EntityCache {
    private readonly enabled: boolean;
    private readonly max: number;
    private readonly ttl: number;
    private readonly users = new Map<string, CacheEntry>();
    private readonly chats = new Map<string, CacheEntry>();
    private readonly pinnedKeys = new Set<string>();

    constructor(options?: EntityCacheOptions) {
        this.enabled = options !== false;
        const policy = typeof options === "object" ? options : ENTITY_CACHE_DEFAULTS;
        this.max = Math.max(0, policy.max ?? 0);
        this.ttl = Math.max(0, policy.ttl ?? 0);
    }

    get size(): number {
        return this.users.size + this.chats.size;
    }

    add(entities: unknown): void {
        if (!this.enabled) return;
        for (const entity of collectEntities(entities)) {
            try {
                this.write(getPeerId(entity as EntityLike), toCachedPeer(getInputPeer(entity)));
            } catch { }
        }
    }

    get(item: PeerKey | undefined): Api.TypeInputPeer {
        const found = this.find(item);
        if (!found) {
            throw new Error("No cached entity for the given key");
        }
        return buildInputPeer(found);
    }

    has(item: PeerKey | undefined): boolean {
        try {
            return this.find(item) !== undefined;
        } catch {
            return false;
        }
    }

    delete(item: PeerKey | undefined): boolean {
        try {
            for (const key of this.candidateKeys(item)) {
                this.pinnedKeys.delete(key);
                if (this.getSegment(key).delete(key)) {
                    return true;
                }
            }
        } catch { }
        return false;
    }

    clear(): void {
        this.users.clear();
        this.chats.clear();
        this.pinnedKeys.clear();
    }

    pin(markedId: PeerKey): void {
        if (!this.enabled) return;
        this.pinnedKeys.add(markedId.toString());
    }

    unpin(markedId: PeerKey): void {
        this.pinnedKeys.delete(markedId.toString());
    }

    private getSegment(key: string): Map<string, CacheEntry> {
        return key.startsWith("-") ? this.chats : this.users;
    }

    private write(key: string, peer: CachedPeer): void {
        const segment = this.getSegment(key);
        segment.delete(key);
        segment.set(key, { peer, writtenAt: Date.now() });
        this.prune(segment);
    }

    private read(key: string): CachedPeer | undefined {
        const segment = this.getSegment(key);
        const entry = segment.get(key);
        if (!entry) return undefined;
        if (this.isExpired(key, entry, Date.now())) {
            segment.delete(key);
            return undefined;
        }
        segment.delete(key);
        segment.set(key, entry);
        return entry.peer;
    }

    private isExpired(key: string, entry: CacheEntry, now: number): boolean {
        return this.ttl > 0 && now - entry.writtenAt > this.ttl && !this.pinnedKeys.has(key);
    }

    private prune(segment: Map<string, CacheEntry>): void {
        const now = Date.now();
        if (this.ttl > 0) {
            for (const [key, entry] of segment) {
                if (this.pinnedKeys.has(key)) continue;
                if (!this.isExpired(key, entry, now)) break;
                segment.delete(key);
            }
        }
        if (this.max > 0 && segment.size > this.max) {
            for (const key of segment.keys()) {
                if (this.pinnedKeys.has(key)) continue;
                segment.delete(key);
                if (segment.size <= this.max) break;
            }
        }
    }

    private find(item: PeerKey | undefined): CachedPeer | undefined {
        if (!this.enabled) return undefined;
        for (const key of this.candidateKeys(item)) {
            const cached = this.read(key);
            if (cached) {
                return cached;
            }
        }
        return undefined;
    }

    private *candidateKeys(item: PeerKey | undefined): Generator<string> {
        if (item == undefined) {
            throw new Error("No cached entity for the given key");
        }
        const id = returnBigInt(item);
        if (id.lesser(bigInt.zero)) {
            let marked: string;
            try {
                marked = getPeerId(id);
            } catch {
                throw new Error("Invalid key will not have entity");
            }
            yield marked;
        }
        yield getPeerId(new Api.PeerUser({ userId: id }));
        yield getPeerId(new Api.PeerChat({ chatId: id }));
        yield getPeerId(new Api.PeerChannel({ channelId: id }));
    }
}
