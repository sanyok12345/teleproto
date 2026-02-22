import { crc32 } from "./crc32";

const CORE_TYPES = new Set([
    0xbc799737,
    0x997275b5,
    0x3fedd339,
    0xc4b9f9bb,
    0x56730bcc,
]);

const AUTH_KEY_TYPES = new Set([
    0x05162463,
    0x83c95aec,
    0xa9f55f95,
    0x3c6a84d4,
    0x56fddf88,
    0xd0e8075c,
    0xb5890dba,
    0x6643b654,
    0xd712e4be,
    0xf5045f1f,
    0x3072cfa1,
]);

export type ArgConfig = {
    isVector: boolean;
    isFlag: boolean;
    skipConstructorId: boolean;
    flagName: string | null;
    flagIndex: number;
    flagIndicator: boolean;
    type: string | null;
    useVectorId: boolean | null;
};

export type TlDefinition = {
    name: string;
    constructorId: number;
    argsConfig: Record<string, ArgConfig>;
    subclassOfId: number;
    result: string;
    isFunction: boolean;
    namespace?: string;
};

function snakeToCamelCase(name: string): string {
    const result = name.replace(/(?:^|_)([a-z])/g, (_, g: string) =>
        g.toUpperCase()
    );
    return result.replace(/_/g, "");
}

function variableSnakeToCamelCase(value: string): string {
    return value.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
    );
}

function findAll(regex: RegExp, input: string): string[][] {
    const normalized = regex.flags.includes("g")
        ? regex
        : new RegExp(regex.source, "g");
    const results: string[][] = [];
    let match: RegExpExecArray | null = normalized.exec(input);

    while (match) {
        results.push(match.slice(1));
        match = normalized.exec(input);
    }

    return results;
}

function buildArgConfig(name: string, argType: string): ArgConfig {
    name = name === "self" ? "is_self" : name;
    const config: ArgConfig = {
        isVector: false,
        isFlag: false,
        skipConstructorId: false,
        flagName: null,
        flagIndex: -1,
        flagIndicator: true,
        type: null,
        useVectorId: null,
    };

    if (argType !== "#") {
        config.flagIndicator = false;
        config.type = argType.replace(/^!+/, "");

        const flagMatch = config.type.match(/(flags(?:\d+)?).(\d+)\?([\w<>.]+)/);
        if (flagMatch) {
            config.isFlag = true;
            config.flagName = flagMatch[1];
            config.flagIndex = Number(flagMatch[2]);
            config.type = flagMatch[3];
        }

        const vectorMatch = config.type.match(/[Vv]ector<([\w\d.]+)>/);
        if (vectorMatch) {
            config.isVector = true;
            config.useVectorId = config.type.charAt(0) === "V";
            config.type = vectorMatch[1];
        }

        const plain = config.type.split(".").pop() || "";
        if (/^[a-z]$/.test(plain.charAt(0))) {
            config.skipConstructorId = true;
        }
    }

    if (config.type === "future_salt") {
        config.type = "FutureSalt";
    }

    return config;
}

function fromLine(line: string, isFunction: boolean): TlDefinition {
    const match = line.match(
        /([\w.]+)(?:#([0-9a-fA-F]+))?(?:\s{?\w+:[\w\d<>#.?!]+}?)*\s=\s([\w\d<>#.?]+);$/
    );

    if (!match) {
        throw new Error(`Cannot parse TLObject ${line}`);
    }

    const argsMatch = findAll(/({)?(\w+):([\w\d<>#.?!]+)}?/, line);
    const config: TlDefinition = {
        name: match[1],
        constructorId: Number.parseInt(match[2], 16),
        argsConfig: {},
        subclassOfId: crc32(match[3]),
        result: match[3],
        isFunction,
    };

    if (!config.constructorId) {
        const args = Object.keys(config.argsConfig).length
            ? ` ${Object.keys(config.argsConfig).join(" ")}`
            : "";

        const representation = `${config.name}${args} = ${config.result}`
            .replace(/(:|\?)bytes /g, "$1string ")
            .replace(/</g, " ")
            .replace(/>|{|}/g, "")
            .replace(/ \w+:flags(\d+)?\.\d+\?true/g, "");

        config.constructorId = crc32(Buffer.from(representation, "utf8"));
    }

    for (const [brace, name, argType] of argsMatch) {
        if (brace === undefined) {
            config.argsConfig[variableSnakeToCamelCase(name)] = buildArgConfig(
                name,
                argType
            );
        }
    }

    if (config.name.includes(".")) {
        const [namespace, name] = config.name.split(/\.(.+)/);
        config.namespace = namespace;
        config.name = name;
    }

    config.name = snakeToCamelCase(config.name);
    return config;
}

export function parseTl(content: string): TlDefinition[] {
    let isFunction = false;
    const parsed: TlDefinition[] = [];

    for (let line of content.split("\n")) {
        const commentIndex = line.indexOf("//");
        if (commentIndex !== -1) {
            line = line.slice(0, commentIndex);
        }

        line = line.trim();
        if (!line) {
            continue;
        }

        const section = line.match(/---(\w+)---/);
        if (section) {
            isFunction = section[1] === "functions";
            continue;
        }

        try {
            const parsedLine = fromLine(line, isFunction);
            if (CORE_TYPES.has(parsedLine.constructorId)) {
                continue;
            }
            parsed.push(parsedLine);
        } catch (error) {
            if (!String(error).includes("vector#1cb5c415")) {
                throw error;
            }
        }
    }

    for (const object of parsed) {
        if (AUTH_KEY_TYPES.has(object.constructorId)) {
            for (const argName in object.argsConfig) {
                if (object.argsConfig[argName].type === "string") {
                    object.argsConfig[argName].type = "bytes";
                }
            }
        }
    }

    return parsed;
}
