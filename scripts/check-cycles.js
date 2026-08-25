const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "teleproto");

function sources(dir, acc = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) sources(full, acc);
        else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")) acc.push(full);
    }
    return acc;
}

function resolveImport(from, spec) {
    if (!spec.startsWith(".")) return null;
    const base = path.resolve(path.dirname(from), spec);
    for (const candidate of [base + ".ts", path.join(base, "index.ts")]) {
        if (fs.existsSync(candidate)) return candidate;
    }
    return null;
}

function valueGraph(files) {
    const graph = new Map();
    for (const file of files) {
        const src = fs.readFileSync(file, "utf8");
        const edges = new Set();
        const add = (spec) => {
            const target = resolveImport(file, spec);
            if (target && target !== file) edges.add(target);
        };
        for (const m of src.matchAll(/import\s+(?!type\s)([^"';]*)from\s*["']([^"']+)["']/g)) {
            const clause = m[1];
            const onlyTypes =
                /^\s*\{[^}]*\}\s*$/.test(clause) &&
                clause
                    .replace(/[{}]/g, "")
                    .split(",")
                    .every((part) => part.trim() === "" || part.trim().startsWith("type "));
            if (!onlyTypes) add(m[2]);
        }
        for (const m of src.matchAll(/import\s*["']([^"']+)["']/g)) add(m[1]);
        for (const m of src.matchAll(/require\(\s*["']([^"']+)["']\s*\)/g)) add(m[1]);
        for (const m of src.matchAll(/export\s+\*\s+from\s*["']([^"']+)["']/g)) add(m[1]);
        for (const m of src.matchAll(/export\s+\{[^}]*\}\s+from\s*["']([^"']+)["']/g)) add(m[1]);
        graph.set(file, edges);
    }
    return graph;
}

function findCycles(graph) {
    const cycles = [];
    const state = new Map();
    const stack = [];
    const visit = (node) => {
        state.set(node, 1);
        stack.push(node);
        for (const next of graph.get(node) || []) {
            if (state.get(next) === 1) cycles.push(stack.slice(stack.indexOf(next)).concat(next));
            else if (!state.has(next)) visit(next);
        }
        stack.pop();
        state.set(node, 2);
    };
    for (const node of graph.keys()) if (!state.has(node)) visit(node);
    return cycles;
}

const files = sources(ROOT);
const cycles = findCycles(valueGraph(files));
const unique = new Map();
for (const cycle of cycles) unique.set([...cycle].sort().join("|"), cycle);

if (unique.size === 0) {
    console.log(`check-cycles: ${files.length} files, no runtime import cycles`);
    process.exit(0);
}

console.error(`check-cycles: ${unique.size} runtime import cycle(s)`);
for (const cycle of unique.values()) {
    console.error("  " + cycle.map((f) => path.relative(ROOT, f)).join(" -> "));
}
console.error("\nImport the defining module instead of a barrel, and use `import type` for types.");
process.exit(1);
