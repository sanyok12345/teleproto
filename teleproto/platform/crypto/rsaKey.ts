import type { RsaPublicKey } from "./types";

interface DerNode {
    tag: number;
    start: number;
    end: number;
}

function readNode(der: Buffer, offset: number): DerNode {
    const tag = der[offset];
    let length = der[offset + 1];
    let start = offset + 2;
    if (length & 0x80) {
        const count = length & 0x7f;
        length = 0;
        for (let i = 0; i < count; i++) length = length * 256 + der[start + i];
        start += count;
    }
    if (start + length > der.length) throw new Error("Malformed RSA public key");
    return { tag, start, end: start + length };
}

function children(der: Buffer, node: DerNode): DerNode[] {
    const nodes: DerNode[] = [];
    for (let offset = node.start; offset < node.end; offset = nodes[nodes.length - 1].end) nodes.push(readNode(der, offset));
    return nodes;
}

function unsigned(der: Buffer, node: DerNode): Buffer {
    let start = node.start;
    while (start < node.end - 1 && der[start] === 0) start++;
    return Buffer.from(der.subarray(start, node.end));
}

function fromPkcs1(der: Buffer, node: DerNode): RsaPublicKey {
    const [n, e] = children(der, node);
    if (n?.tag !== 0x02 || e?.tag !== 0x02) throw new Error("Malformed RSA public key");
    return { n: unsigned(der, n), e: unsigned(der, e) };
}

export function rsaPublicKey(pem: string): RsaPublicKey {
    const der = Buffer.from(pem.replace(/-----(BEGIN|END) [A-Z ]+-----/g, "").replace(/\s+/g, ""), "base64");
    const root = readNode(der, 0);
    if (root.tag !== 0x30) throw new Error("Malformed RSA public key");
    const [first, second] = children(der, root);
    if (first?.tag === 0x02) return fromPkcs1(der, root);
    if (first?.tag !== 0x30 || second?.tag !== 0x03) throw new Error("Malformed RSA public key");
    return fromPkcs1(der, readNode(der, second.start + 1));
}
