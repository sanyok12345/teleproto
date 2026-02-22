import * as fs from "fs";
import * as path from "path";
import { parseTl, TlDefinition } from "./parser";
import { renderApiTypes } from "./types/template";

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
];

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

function main(): void {
    const root = __dirname;
    const apiTl = fs.readFileSync(path.resolve(root, "static/api.tl"), "utf-8");
    const schemaTl = fs.readFileSync(
        path.resolve(root, "static/schema.tl"),
        "utf-8"
    );

    const definitions = loadTlDefinitions(apiTl, schemaTl);
    const { constructors, functions } = splitDefinitions(definitions);
    patchMethods(functions);

    const types = buildTypes(constructors);
    const dts = renderApiTypes({ types, constructors, functions });

    fs.writeFileSync(
        path.resolve(root, "../teleproto/tl/generated/api-definitions.js"),
        `module.exports = ${JSON.stringify(definitions)};\n`
    );

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
