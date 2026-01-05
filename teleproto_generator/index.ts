import * as path from "path";
import * as fs from "fs";

import { parseTl } from "./parsers/tlobject";
import generateTypeScript from "./generators/typescript";
import { TLObjectDef } from "./parsers/types";
import { TLTypeInfo } from "./generators/types";

const INPUT_FILE = path.resolve(__dirname, "data/api.tl");
const SCHEMA_FILE = path.resolve(__dirname, "data/schema.tl");

const OUTPUT_DIR = path.resolve(__dirname, "../teleproto/tl");

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

const optionalFunctionFields = [
    "phoneNumber", "phone_number",
    "phoneCodeHash", "phone_code_hash",
    "lastName", "last_name",
    "minId", "min_id",
    "maxId", "max_id",
    "minDate", "min_date",
    "offsetRate", "offset_rate",
    "channel",
    "fromPeer", "from_peer",
    "id",
    "msgId", "msg_id",
    "hash",
    "cacheTime", "cache_time",
    "queryId", "query_id",
    "peer",
    "bot",
    "flags",
    "langCode", "lang_code",
    "systemLangCode", "system_lang_code",
    "query"
];

const optionalConstructorFields: string[] = [
];

function patchFunctions(methods: TLObjectDef[]) {
    for (const method of methods) {
        for (const arg in method.argsConfig) {
            if (peersToPatch.includes(method.argsConfig[arg].type)) {
                method.argsConfig[arg].type = "EntityLike";
            } else if (
                method.argsConfig[arg].type &&
                (arg === "msg_id" || arg === "msgId")
            ) {
                if (method.argsConfig[arg].type !== "long") {
                    method.argsConfig[arg].type = "MessageIDLike";
                }
            }
            
            if (optionalFunctionFields.includes(arg)) {
                method.argsConfig[arg].isOptionalTS = true;
            }
        }
    }
}

function patchConstructors(constructors: TLObjectDef[]) {
    for (const constructor of constructors) {
        for (const arg in constructor.argsConfig) {
            // Do NOT patch EntityLike for constructors to preserve strict types for properties
            
            if (
                constructor.argsConfig[arg].type &&
                (arg === "msg_id" || arg === "msgId")
            ) {
                if (constructor.argsConfig[arg].type !== "long") {
                    constructor.argsConfig[arg].type = "MessageIDLike";
                }
            }
            
            if (optionalConstructorFields.includes(arg)) {
                constructor.argsConfig[arg].isOptionalTS = true;
            }
        }
    }
}

function stripTl(tl: string) {
    return tl
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
        .replace(/\n\s*\n/g, "\n")
        .replace(/`/g, "\\`");
}

function extractParams(fileContent: string) {
    const defInterator = parseTl(fileContent, 109);
    const types: Record<string, TLTypeInfo> = {};
    const constructors: TLObjectDef[] = [];
    const functions: TLObjectDef[] = [];

    for (const def of defInterator) {
        if (def.isFunction) {
            functions.push(def);
        } else {
            if (!types[def.result]) {
                const resultName = def.result.match(/^vector<(\w+)>$/)
                        ? def.result.match(/^vector<(\w+)>$/)![1]
                        : def.result;
                
                let namespace: string | undefined;
                let name = resultName;
                if (resultName.includes('.')) {
                    const parts = resultName.split('.');
                    namespace = parts[0];
                    name = parts[1];
                }

                types[def.result] = {
                    name: name,
                    namespace: namespace,
                    constructors: [],
                };
            }
            types[def.result].constructors.push(def.namespace ? `${def.namespace}.${def.name}` : def.name);
            constructors.push(def);
        }
    }
    return { types: Object.values(types), functions, constructors };
}

function main() {
    console.log("Generating TL files...");
    
    const apiTl = fs.readFileSync(INPUT_FILE, "utf-8");
    const schemaTl = fs.readFileSync(SCHEMA_FILE, "utf-8");

    // Generate api.d.ts
    const apiConfig = extractParams(apiTl);
    const schemeConfig = extractParams(schemaTl);
    const types = [...apiConfig.types, ...schemeConfig.types];
    const functions = [...apiConfig.functions, ...schemeConfig.functions];
    const constructors = [
        ...apiConfig.constructors,
        ...schemeConfig.constructors,
    ];
    
    patchFunctions(functions);
    patchConstructors(constructors);
    
    const files = generateTypeScript({
        types: types,
        functions: functions,
        constructors: constructors,
    });

    console.log(`Writing ${files.length} files to ${OUTPUT_DIR}`);
    for (const file of files) {
        const fullPath = path.join(OUTPUT_DIR, file.path);
        if (file.path.includes("StoryItemDeleted")) {
            console.log(`Writing StoryItemDeleted to ${fullPath}`);
            console.log(`Content length: ${file.content.length}`);
            console.log(`Content preview: ${file.content.substring(0, 200)}`);
        }
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, file.content);
    }

    console.log("Done!");
}

main();
