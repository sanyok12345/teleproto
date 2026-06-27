import * as fs from "fs";
import * as path from "path";
import { parseTl, TlDefinition } from "./parser";
import { renderApiTypes, ErrorMeta, DocsMap } from "./types/template";

type TlType = {
    namespace?: string;
    name: string;
    constructors: string[];
};

const peersToPatch = [
    "InputPeer",
    "Peer",
    "InputUser",
    "User",
    "UserFull",
    "Chat",
    "ChatFull",
    "InputChannel",
    "InputDialogPeer",
    "InputNotifyPeer",
];

// Mirrors the class-naming in generate-errors.ts so `@throws {XxxError}` links
// resolve to the actually-generated error classes (errors/RPCErrorList.ts).
const ERROR_NAME_OVERRIDES: Record<string, string> = {
    "2FA_CONFIRM_WAIT_%d": "TwoFaConfirmWait",
    SLOWMODE_WAIT_d: "SlowModeWait",
    "FLOOD_PREMIUM_WAIT_%d": "FloodWait",
    MSG_WAIT_FAILED: "MsgWait",
};

function pascalSeg(seg: string): string {
    return seg ? seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase() : "";
}

function errorClassName(raw: string): string {
    const key = raw.replace(/%d/g, "d");
    const override = ERROR_NAME_OVERRIDES[key] || ERROR_NAME_OVERRIDES[raw];
    const base =
        override ||
        raw
            .split("_")
            .map((seg) => (seg === "%d" ? "" : pascalSeg(seg.replace(/%d/g, ""))))
            .join("");
    return base ? `${base}Error` : "";
}

type ErrorsJson = {
    errors: Record<string, Record<string, string[]>>;
    descriptions: Record<string, string>;
    user_only: string[];
    bot_only: string[];
    business_supported: string[];
};

function loadErrorMeta(root: string): ErrorMeta {
    const data: ErrorsJson = JSON.parse(
        fs.readFileSync(
            path.resolve(root, "static/errors/errors.json"),
            "utf-8"
        )
    );

    const byMethod: ErrorMeta["byMethod"] = {};
    const seen: Record<string, Set<string>> = {};

    for (const code of Object.keys(data.errors)) {
        for (const raw of Object.keys(data.errors[code])) {
            const cls = errorClassName(raw);
            if (!cls) continue;
            const desc = (data.descriptions[raw] || raw)
                .replace(/\s+/g, " ")
                .replace(/\*\//g, "*\\/")
                .trim();
            for (const method of data.errors[code][raw]) {
                if (!seen[method]) seen[method] = new Set();
                if (seen[method].has(cls)) continue;
                seen[method].add(cls);
                (byMethod[method] = byMethod[method] || []).push({ cls, desc });
            }
        }
    }

    return {
        byMethod,
        userOnly: new Set(data.user_only),
        botOnly: new Set(data.bot_only),
        business: new Set(data.business_supported),
    };
}

function splitDefinitions(definitions: TlDefinition[]): {
    constructors: TlDefinition[];
    functions: TlDefinition[];
} {
    const constructors: TlDefinition[] = [];
    const functions: TlDefinition[] = [];

    for (const definition of definitions) {
        if (definition.isFunction) {
            functions.push(definition);
        } else {
            constructors.push(definition);
        }
    }

    return { constructors, functions };
}

function buildTypes(constructors: TlDefinition[]): TlType[] {
    const byResult: Record<string, TlType> = {};

    for (const definition of constructors) {
        if (!byResult[definition.result]) {
            const [namespace, rawName] = definition.result.includes(".")
                ? definition.result.split(".")
                : [undefined, definition.result];
            byResult[definition.result] = {
                namespace,
                name: rawName,
                constructors: [],
            };
        }

        byResult[definition.result].constructors.push(
            definition.namespace
                ? `${definition.namespace}.${definition.name}`
                : definition.name
        );
    }

    return Object.values(byResult);
}

function patchMethods(methods: TlDefinition[]): void {
    for (const method of methods) {
        for (const argName in method.argsConfig) {
            const arg = method.argsConfig[argName];
            if (peersToPatch.includes(arg.type || "")) {
                arg.type = "EntityLike";
            } else if (arg.type && argName.toLowerCase().includes("msgid")) {
                if (arg.type !== "long") {
                    arg.type = "MessageIDLike";
                }
            }
        }
    }
}

function loadTlDefinitions(apiTlContent: string, schemaTlContent: string): TlDefinition[] {
    return [...parseTl(apiTlContent), ...parseTl(schemaTlContent)];
}

function loadDocs(root: string): DocsMap {
    const file = path.resolve(root, "static/docs/methods.json");
    if (!fs.existsSync(file)) return {};
    return JSON.parse(fs.readFileSync(file, "utf-8")) as DocsMap;
}

function main(): void {
    const root = __dirname;
    const apiTl = fs.readFileSync(
        path.resolve(root, "static/tl/api.tl"),
        "utf-8"
    );
    const schemaTl = fs.readFileSync(
        path.resolve(root, "static/tl/schema.tl"),
        "utf-8"
    );

    const definitions = loadTlDefinitions(apiTl, schemaTl);
    const { constructors, functions } = splitDefinitions(definitions);

    fs.writeFileSync(
        path.resolve(root, "../teleproto/tl/generated/api-definitions.js"),
        `module.exports = ${JSON.stringify(definitions)};\n`
    );

    patchMethods(functions);

    const types = buildTypes(constructors);
    const errorMeta = loadErrorMeta(root);
    const docs = loadDocs(root);
    const dts = renderApiTypes({ types, constructors, functions, errorMeta, docs });

    fs.writeFileSync(
        path.resolve(root, "../teleproto/tl/generated/api.js"),
        "const { createApiFromDefinitions } = require(\"../runtime/createApi\");\n" +
            "const definitions = require(\"./api-definitions.js\");\n" +
            "const Api = createApiFromDefinitions(definitions);\n" +
            "module.exports = { Api };\n"
    );

    fs.writeFileSync(path.resolve(root, "../teleproto/tl/generated/api.d.ts"), dts);
}

main();
