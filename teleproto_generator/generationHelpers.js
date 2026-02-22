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

const snakeToCamelCase = (name) => {
    const result = name.replace(/(?:^|_)([a-z])/g, (_, g) => g.toUpperCase());
    return result.replace(/_/g, "");
};

const variableSnakeToCamelCase = (str) =>
    str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
    );

function makeCRCTable() {
    let c;
    const table = [];
    for (let n = 0; n < 256; n++) {
        c = n;
        for (let k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        table[n] = c;
    }
    return table;
}

let crcTable;

function crc32(buf) {
    if (!crcTable) {
        crcTable = makeCRCTable();
    }
    if (!Buffer.isBuffer(buf)) {
        buf = Buffer.from(buf);
    }
    let crc = -1;
    for (let index = 0; index < buf.length; index++) {
        const byte = buf[index];
        crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ -1) >>> 0;
}

const findAll = (regex, str, matches = []) => {
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

function buildArgConfig(name, argType) {
    name = name === "self" ? "is_self" : name;
    const currentConfig = {
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

        if (/^[a-z]$/.test(currentConfig.type.split(".").pop().charAt(0))) {
            currentConfig.skipConstructorId = true;
        }
    }

    if (currentConfig.type === "future_salt") {
        currentConfig.type = "FutureSalt";
    }

    return currentConfig;
}

function fromLine(line, isFunction) {
    const match = line.match(
        /([\w.]+)(?:#([0-9a-fA-F]+))?(?:\s{?\w+:[\w\d<>#.?!]+}?)*\s=\s([\w\d<>#.?]+);$/
    );

    if (!match) {
        throw new Error(`Cannot parse TLObject ${line}`);
    }

    const argsMatch = findAll(/({)?(\w+):([\w\d<>#.?!]+)}?/, line);
    const currentConfig = {
        name: match[1],
        constructorId: parseInt(match[2], 16),
        argsConfig: {},
        subclassOfId: crc32(match[3]),
        result: match[3],
        isFunction,
        namespace: undefined,
    };

    if (!currentConfig.constructorId) {
        const hexId = "";
        const args = Object.values(currentConfig.argsConfig).length
            ? ` ${Object.keys(currentConfig.argsConfig)
                  .map((arg) => arg.toString())
                  .join(" ")}`
            : "";

        const representation = `${currentConfig.name}${hexId}${args} = ${currentConfig.result}`
            .replace(/(:|\?)bytes /g, "$1string ")
            .replace(/</g, " ")
            .replace(/>|{|}/g, "")
            .replace(/ \w+:flags(\d+)?\.\d+\?true/g, "");

        currentConfig.constructorId = crc32(Buffer.from(representation, "utf8"));
    }

    for (const [brace, name, argType] of argsMatch) {
        if (brace === undefined) {
            currentConfig.argsConfig[variableSnakeToCamelCase(name)] =
                buildArgConfig(name, argType);
        }
    }

    if (currentConfig.name.includes(".")) {
        [currentConfig.namespace, currentConfig.name] =
            currentConfig.name.split(/\.(.+)/);
    }

    currentConfig.name = snakeToCamelCase(currentConfig.name);
    return currentConfig;
}

function* parseTl(content, layer, methods = [], ignoreIds = CORE_TYPES) {
    const file = content;
    let isFunction = false;
    const objAll = [];

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
        } catch (e) {
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
}

module.exports = {
    parseTl,
};