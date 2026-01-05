import { crc32 } from "../utils";
import { TLObjectDef, ArgConfig } from "./types";

const CORE_TYPES = new Set([
    0xbc799737, // boolFalse#bc799737 = Bool;
    0x997275b5, // boolTrue#997275b5 = Bool;
    0x3fedd339, // true#3fedd339 = True;
    0xc4b9f9bb, // error#c4b9f9bb code:int text:string = Error;
    0x56730bcc, // null#56730bcc = Null;
]);

const AUTH_KEY_TYPES = new Set([
    0x05162463, // resPQ,
    0x83c95aec, // p_q_inner_data
    0xa9f55f95, // p_q_inner_data_dc
    0x3c6a84d4, // p_q_inner_data_temp
    0x56fddf88, // p_q_inner_data_temp_dc
    0xd0e8075c, // server_DH_params_ok
    0xb5890dba, // server_DH_inner_data
    0x6643b654, // client_DH_inner_data
    0xd712e4be, // req_DH_params
    0xf5045f1f, // set_client_DH_params
    0x3072cfa1, // gzip_packed
]);

const snakeToCamelCase = (name: string) => {
    const result = name.replace(/(?:^|_)([a-z])/g, (_, g) => g.toUpperCase());
    return result.replace(/_/g, "");
};

const variableSnakeToCamelCase = (str: string) =>
    str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
    );

const findAll = (regex: RegExp, str: string, matches: string[][] = []) => {
    if (!regex.flags.includes("g")) {
        regex = new RegExp(regex.source, "g");
    }

    const res = regex.exec(str);

    if (res) {
        matches.push(res.slice(1));
        findAll(regex, str, matches);
    }

    return matches;
};

function buildArgConfig(name: string, argType: string): ArgConfig {
    name = name === "self" ? "is_self" : name;
    // Default values
    const currentConfig: ArgConfig = {
        isVector: false,
        isFlag: false,
        skipConstructorId: false,
        flagName: null,
        flagIndex: -1,
        flagIndicator: true,
        type: "",
        useVectorId: null,
    };

    const canBeInferred = name === "random_id";

    if (argType !== "#") {
        currentConfig.flagIndicator = false;
        currentConfig.type = argType.replace(/^!+/, "");

        const flagMatch = currentConfig.type.match(
            /(flags(?:\d+)?).(\d+)\?([\w<>.]+)/
        );

        if (flagMatch) {
            currentConfig.isFlag = true;
            currentConfig.flagName = flagMatch[1];
            currentConfig.flagIndex = Number(flagMatch[2]);
            currentConfig.type = flagMatch[3];
        }

        const vectorMatch = currentConfig.type.match(/[Vv]ector<([\w\d.]+)>/);

        if (vectorMatch) {
            currentConfig.isVector = true;
            currentConfig.useVectorId = currentConfig.type.charAt(0) === "V";
            [, currentConfig.type] = vectorMatch;
        }

        if (/^[a-z]$/.test(currentConfig.type.split(".").pop()!.charAt(0))) {
            currentConfig.skipConstructorId = true;
        }
    }
    if (currentConfig.type == "future_salt") {
        currentConfig.type = "FutureSalt";
    }
    return currentConfig;
}

const fromLine = (line: string, isFunction: boolean): TLObjectDef => {
    const match = line.match(
        /([\w.]+)(?:#([0-9a-fA-F]+))?(?:\s{?\w+:[\w\d<>#.?!]+}?)*\s=\s([\w\d<>#.?]+);$/
    );
    if (!match) {
        throw new Error(`Cannot parse TLObject ${line}`);
    }

    const argsMatch = findAll(/({)?(\w+):([\w\d<>#.?!]+)}?/, line);
    const currentConfig: TLObjectDef = {
        name: match[1],
        constructorId: match[2] ? parseInt(match[2], 16) : 0,
        argsConfig: {},
        subclassOfId: crc32(match[3]),
        result: match[3],
        isFunction: isFunction,
        namespace: undefined,
    };
    
    if (!currentConfig.constructorId) {
        const hexId = "";
        let args = "";
        
        const representation =
            `${currentConfig.name}${hexId}${args} = ${currentConfig.result}`
                .replace(/(:|\?)bytes /g, "$1string ")
                .replace(/</g, " ")
                .replace(/>|{|}/g, "")
                .replace(/ \w+:flags(\d+)?\.\d+\?true/g, "");

        currentConfig.constructorId = crc32(representation);
    }
    
    for (const [brace, name, argType] of argsMatch) {
        if (brace === undefined) {
            currentConfig.argsConfig[variableSnakeToCamelCase(name)] =
                buildArgConfig(name, argType);
        }
    }
    
    if (currentConfig.name.includes(".")) {
        const parts = currentConfig.name.split(/\.(.+)/);
        currentConfig.namespace = parts[0];
        currentConfig.name = parts[1];
    }
    currentConfig.name = snakeToCamelCase(currentConfig.name);
    return currentConfig;
};

export function* parseTl(
    content: string,
    layer: number,
    methods: TLObjectDef[] = [],
    ignoreIds = CORE_TYPES
): Generator<TLObjectDef> {
    const methodInfo = (methods || []).reduce(
        (o, m) => ({ ...o, [m.name]: m }),
        {} as Record<string, TLObjectDef>
    );
    const objAll: TLObjectDef[] = [];
    const objByName: Record<string, TLObjectDef> = {};
    const objByType: Record<string, TLObjectDef[]> = {};

    const file = content;

    let isFunction = false;

    for (let line of file.split("\n")) {
        const commentIndex = line.indexOf("//");

        if (commentIndex !== -1) {
            line = line.slice(0, commentIndex);
        }

        line = line.trim();

        if (!line) {
            continue;
        }

        const match = line.match(/---(\w+)---/);

        if (match) {
            const [, followingTypes] = match;
            isFunction = followingTypes === "functions";
            continue;
        }

        try {
            const result = fromLine(line, isFunction);

            if (ignoreIds.has(result.constructorId)) {
                continue;
            }

            objAll.push(result);

            if (!result.isFunction) {
                if (!objByType[result.result]) {
                    objByType[result.result] = [];
                }

                objByName[result.name] = result;
                objByType[result.result].push(result);
            }
        } catch (e: any) {
            if (!e.toString().includes("vector#1cb5c415")) {
                throw e;
            }
        }
    }

    for (const obj of objAll) {
        if (AUTH_KEY_TYPES.has(obj.constructorId)) {
            for (const arg in obj.argsConfig) {
                if (obj.argsConfig[arg].type === "string") {
                    obj.argsConfig[arg].type = "bytes";
                }
            }
        }
    }

    for (const obj of objAll) {
        yield obj;
    }
};
