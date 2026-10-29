import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["teleproto/**/*.ts", "teleproto/tl/generated/*.js", "!teleproto/**/*.d.ts"],
    root: "teleproto",
    outDir: "dist",
    format: "cjs",
    target: "es2022",
    unbundle: true,
    fixedExtension: false,
    hash: false,
    cjsDefault: false,
    dts: false,
    external: [/^#platform\//],
    outputOptions: { exports: "named", esModule: true },
    report: { summary: true },
});
