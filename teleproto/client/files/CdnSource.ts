import { Api } from "../../tl";
import { crypto } from "../../platform";

interface RangeHash {
    limit: number;
    hash: Buffer;
}

interface PartialRange {
    pieces: { offset: number; data: Buffer }[];
    bytes: number;
}

export class CdnHashMismatchError extends Error {
    constructor(offset: number) {
        super(`CDN file hash mismatch at offset ${offset}`);
        this.name = "CdnHashMismatchError";
    }
}

export class CdnSource {
    readonly dcId: number;
    readonly fileToken: Buffer;
    private readonly key: Buffer;
    private readonly iv: Buffer;
    private readonly hashes = new Map<number, RangeHash>();
    private readonly partial = new Map<number, PartialRange>();
    private fetching?: Promise<void>;

    constructor(
        redirect: Api.upload.FileCdnRedirect,
        private readonly fetchHashes: (offset: number) => Promise<Api.TypeFileHash[]>
    ) {
        this.dcId = redirect.dcId;
        this.fileToken = redirect.fileToken;
        this.key = redirect.encryptionKey;
        this.iv = redirect.encryptionIv;
        this.addHashes(redirect.fileHashes);
    }

    addHashes(hashes: Api.TypeFileHash[]) {
        for (const item of hashes) this.hashes.set(item.offset.toJSNumber(), { limit: item.limit, hash: Buffer.from(item.hash) });
    }

    decrypt(offset: number, data: Buffer): Buffer {
        const iv = Buffer.from(this.iv);
        iv.writeUInt32BE((offset / 16) >>> 0, 12);
        const cipher = crypto.aesCtr(this.key, iv);
        try {
            return cipher.update(data);
        } finally {
            cipher.dispose();
        }
    }

    async verify(offset: number, data: Buffer): Promise<void> {
        const end = offset + data.length;
        let position = offset;
        while (position < end) {
            const [start, range] = await this.rangeAt(position);
            const rangeEnd = start + range.limit;
            const pieceEnd = Math.min(rangeEnd, end);
            if (start >= offset && rangeEnd <= end) {
                this.check(start, range, data.subarray(start - offset, rangeEnd - offset));
            } else {
                this.collect(start, range, position, data.subarray(position - offset, pieceEnd - offset));
            }
            position = pieceEnd;
        }
    }

    private async rangeAt(position: number): Promise<[number, RangeHash]> {
        let requested = false;
        for (;;) {
            const found = this.find(position);
            if (found) return found;
            if (this.fetching) {
                await this.fetching.catch(() => {});
                continue;
            }
            if (requested) throw new Error(`Telegram returned no CDN hash for offset ${position}`);
            requested = true;
            this.fetching = this.fetchHashes(position)
                .then((hashes) => this.addHashes(hashes))
                .finally(() => (this.fetching = undefined));
            await this.fetching;
        }
    }

    private find(position: number): [number, RangeHash] | undefined {
        for (const [start, range] of this.hashes) {
            if (start <= position && position < start + range.limit) return [start, range];
        }
        return undefined;
    }

    private collect(start: number, range: RangeHash, offset: number, data: Buffer) {
        let pending = this.partial.get(start);
        if (!pending) this.partial.set(start, (pending = { pieces: [], bytes: 0 }));
        pending.pieces.push({ offset, data: Buffer.from(data) });
        pending.bytes += data.length;
        if (pending.bytes < range.limit) return;
        this.partial.delete(start);
        const whole = Buffer.concat(pending.pieces.sort((a, b) => a.offset - b.offset).map((piece) => piece.data));
        this.check(start, range, whole);
    }

    private check(start: number, range: RangeHash, data: Buffer) {
        if (!crypto.hash("sha256", data).equals(range.hash)) throw new CdnHashMismatchError(start);
    }
}
