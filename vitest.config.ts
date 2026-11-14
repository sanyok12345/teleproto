import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            // Tests import from "bun:test" so the same files run under
            // `bun test` and vitest; vitest maps the specifier here.
            "bun:test": "vitest",
        },
    },
    test: {
        include: ["teleproto_tests/**/*.test.ts"],
        environment: "node",
        server: {
            deps: {
                // dist/ is a CJS rolldown build; its require-based interop
                // (Registry, generated api) breaks under vite's SSR transform.
                // Keep it external so Node's own require handles it, exactly
                // like a published package.
                external: [/[/\\]dist[/\\]/],
            },
        },
    },
});
