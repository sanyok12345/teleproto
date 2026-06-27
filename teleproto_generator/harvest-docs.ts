// Harvests method/parameter descriptions from core.telegram.org into
// static/docs/methods.json (cached/resumable). Joined into JSDoc by generate.ts.

import * as fs from "fs";
import * as path from "path";
import * as https from "https";

const root = __dirname;
const OUT = path.resolve(root, "static/docs/methods.json");
const CONCURRENCY = 8;

type Doc = { summary: string; params: Record<string, string> };

function loadMethodKeys(): string[] {
    const defs = require(
        path.resolve(root, "../teleproto/tl/generated/api-definitions.js")
    ) as Array<{ name: string; namespace?: string; isFunction: boolean }>;
    const keys = new Set<string>();
    for (const d of defs) {
        if (!d.isFunction) continue;
        const name = d.name.charAt(0).toLowerCase() + d.name.slice(1);
        keys.add(d.namespace ? `${d.namespace}.${name}` : name);
    }
    return [...keys].sort();
}

function fetchPage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const req = https.get(
            url,
            { headers: { "User-Agent": "teleproto-docs-harvester" } },
            (res) => {
                if (res.statusCode === 404) {
                    res.resume();
                    return reject(new Error("404"));
                }
                if (res.statusCode !== 200) {
                    res.resume();
                    return reject(new Error(`HTTP ${res.statusCode}`));
                }
                let data = "";
                res.setEncoding("utf8");
                res.on("data", (c) => (data += c));
                res.on("end", () => resolve(data));
            }
        );
        req.on("error", reject);
        req.setTimeout(15000, () => req.destroy(new Error("timeout")));
    });
}

const ENTITIES: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
    nbsp: " ", ndash: "–", mdash: "—", hellip: "…", raquo: "»", laquo: "«",
};
function stripHtml(s: string): string {
    return s
        .replace(/<[^>]+>/g, " ")
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
        .replace(/&([a-z0-9#]+);/gi, (_, e) => ENTITIES[e] ?? " ")
        .replace(/\s+/g, " ")
        .trim();
}
const toCamel = (s: string) =>
    s.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());

function parse(html: string): Doc {
    const m = html.match(/<div id="dev_page_content">([\s\S]*)/);
    const content = m ? m[1] : html;

    // Description: <p> text before the layer dropdown / first heading / first table.
    const head = content.split(/<div class="clearfix"|<h[1-4]|<table/)[0];
    const summary = [...head.matchAll(/<p>([\s\S]*?)<\/p>/g)]
        .map((x) => stripHtml(x[1]))
        .filter(Boolean)
        .join(" ")
        .trim();

    // Parameters: the first table.table (Name | Type | Description).
    const params: Record<string, string> = {};
    const table = content.match(/<table class="table">([\s\S]*?)<\/table>/);
    if (table) {
        for (const row of table[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
            const tds = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((x) =>
                stripHtml(x[1])
            );
            if (tds.length < 3) continue;
            const name = tds[0];
            if (!name || name === "flags" || tds[1] === "#") continue;
            params[toCamel(name)] = tds[2];
        }
    }
    return { summary, params };
}

async function run(): Promise<void> {
    const methods = loadMethodKeys();
    const cache: Record<string, Doc> = fs.existsSync(OUT)
        ? JSON.parse(fs.readFileSync(OUT, "utf8"))
        : {};
    const queue = methods.filter((k) => !cache[k]);
    console.log(
        `methods: ${methods.length}, cached: ${methods.length - queue.length}, to fetch: ${queue.length}`
    );

    let ok = 0;
    let notFound = 0;
    let errored = 0;
    let done = 0;

    const flush = () => {
        fs.mkdirSync(path.dirname(OUT), { recursive: true });
        fs.writeFileSync(OUT, JSON.stringify(cache));
    };

    async function worker(): Promise<void> {
        while (queue.length) {
            const key = queue.shift() as string;
            try {
                cache[key] = parse(
                    await fetchPage(`https://core.telegram.org/method/${key}`)
                );
                ok++;
            } catch (e) {
                if ((e as Error).message === "404") notFound++;
                else errored++;
            }
            if (++done % 50 === 0) {
                flush();
                console.log(
                    `  ${done}/${queue.length + done} (ok ${ok}, 404 ${notFound}, err ${errored})`
                );
            }
        }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    flush();
    console.log(
        `done. ok ${ok}, 404 ${notFound}, err ${errored}, total ${Object.keys(cache).length}`
    );
}

run();
