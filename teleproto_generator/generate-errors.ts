import * as fs from "fs";
import * as path from "path";

interface ErrorsJson {
    errors: Record<string, Record<string, string[]>>;
    descriptions: Record<string, string>;
}

const CODE_TO_BASE: Record<number, string> = {
    303: "InvalidDCError",
    400: "BadRequestError",
    401: "UnauthorizedError",
    403: "ForbiddenError",
    404: "NotFoundError",
    406: "AuthKeyError",
    420: "FloodError",
    500: "ServerError",
    503: "TimedOutError",
};

const BASE_IMPORTS = [
    "RPCError",
    "InvalidDCError",
    "BadRequestError",
    "UnauthorizedError",
    "ForbiddenError",
    "NotFoundError",
    "AuthKeyError",
    "FloodError",
    "ServerError",
    "TimedOutError",
];

const NAME_OVERRIDES: Record<string, string> = {
    "2FA_CONFIRM_WAIT_%d": "TwoFaConfirmWait",
    SLOWMODE_WAIT_d: "SlowModeWait",
    "FLOOD_PREMIUM_WAIT_%d": "FloodWait",
    MSG_WAIT_FAILED: "MsgWait",
};

const ATTR_OVERRIDES: Record<string, string> = {
    FLOOD_WAIT_d: "seconds",
    SLOWMODE_WAIT_d: "seconds",
    FLOOD_PREMIUM_WAIT_d: "seconds",
    TAKEOUT_INIT_DELAY_d: "seconds",
    FLOOD_TEST_PHONE_WAIT_d: "seconds",
    USER_MIGRATE_d: "newDc",
    PHONE_MIGRATE_d: "newDc",
    NETWORK_MIGRATE_d: "newDc",
    STATS_MIGRATE_d: "newDc",
    FILE_MIGRATE_d: "newDc",
    EMAIL_UNCONFIRMED_d: "codeLength",
};

const LEGACY_EXTRA: Array<{
    name: string;
    code: number;
    description: string;
}> = [
    {
        name: "FLOOD_TEST_PHONE_WAIT_%d",
        code: 420,
        description:
            "A wait of %d seconds is required in the test servers before repeating the action.",
    },
];

interface ErrorDef {
    raw: string;
    key: string;
    code: number;
    className: string;
    baseClass: string;
    description: string;
    overridden?: boolean;
    param?: {
        regex: string;
        attr: string;
    };
}

interface BuildResult {
    decls: ErrorDef[];
    dict: Array<[string, string]>;
    re: Array<[string, string]>;
}

function normKey(raw: string): string {
    return raw.replace(/%d/g, "d");
}

function pascalSegment(seg: string): string {
    if (!seg) return "";
    return seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase();
}

function deriveClassName(raw: string): string {
    return raw
        .split("_")
        .map((seg) => {
            if (seg === "%d") return "";
            return pascalSegment(seg.replace(/%d/g, ""));
        })
        .join("");
}

function deriveRegex(raw: string): string {
    const body = raw
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/%d/g, "(\\d+)");
    return `^${body}$`;
}

function attrOf(key: string): string {
    return ATTR_OVERRIDES[key] || "value";
}

function legacyDesc(raw: string): string | undefined {
    return LEGACY_EXTRA.find((e) => e.name === raw)?.description;
}

function buildDefs(data: ErrorsJson): BuildResult {
    const byRaw = new Map<string, number>();
    for (const codeStr of Object.keys(data.errors)) {
        const code = Math.abs(parseInt(codeStr, 10));
        for (const raw of Object.keys(data.errors[codeStr])) {
            if (!byRaw.has(raw)) byRaw.set(raw, code);
        }
    }
    for (const extra of LEGACY_EXTRA) {
        if (!byRaw.has(extra.name)) byRaw.set(extra.name, extra.code);
    }

    const candidates: ErrorDef[] = [];
    for (const [raw, code] of byRaw) {
        const key = normKey(raw);
        const parametrized = raw.includes("%d");

        let base = CODE_TO_BASE[code];
        if (!base) {
            console.warn(`  ! unknown code ${code} for ${raw}, using RPCError`);
            base = "RPCError";
        }

        const override = NAME_OVERRIDES[key] || NAME_OVERRIDES[raw];
        const name = override || deriveClassName(raw);
        if (!name) {
            console.warn(`  ! empty class name for ${raw}, skipping`);
            continue;
        }

        candidates.push({
            raw,
            key,
            code,
            className: name + "Error",
            baseClass: base,
            description: data.descriptions[raw] || legacyDesc(raw) || raw,
            overridden: override !== undefined,
            param: parametrized
                ? { regex: deriveRegex(raw), attr: attrOf(key) }
                : undefined,
        });
    }

    const groups = new Map<string, ErrorDef[]>();
    for (const c of candidates) {
        const list = groups.get(c.className);
        if (list) list.push(c);
        else groups.set(c.className, [c]);
    }

    const decls: ErrorDef[] = [];
    const dict: Array<[string, string]> = [];
    const re: Array<[string, string]> = [];

    for (const [className, members] of groups) {
        const primary =
            members.find((m) => !m.overridden && m.param) ||
            members.find((m) => !m.overridden) ||
            members.find((m) => m.param) ||
            members[0];
        decls.push(primary);

        if (members.length > 1) {
            const others = members
                .filter((m) => m.raw !== primary.raw)
                .map((m) => m.raw)
                .join(", ");
            console.warn(`  ~ ${className}: ${primary.raw} also covers ${others}`);
        }

        for (const m of members) {
            if (m.param) re.push([m.param.regex, className]);
            else dict.push([m.raw, className]);
        }
    }

    return { decls, dict, re };
}

function messageExpr(def: ErrorDef): string {
    const fmt = "RPCError._fmtRequest(args.request)";
    if (!def.param) {
        return `${JSON.stringify(def.description)} + ${fmt}`;
    }
    const pieces = def.description.split("%d").map((p) => JSON.stringify(p));
    let expr = pieces[0];
    for (let i = 1; i < pieces.length; i++) {
        expr += ` + ${def.param.attr} + ${pieces[i]}`;
    }
    return `${expr} + ${fmt}`;
}

function renderClass(def: ErrorDef, declared: Set<string>): string {
    if (declared.has(def.className)) return "";
    declared.add(def.className);

    const doc = `/** ${def.description.replace(/\*\//g, "*\\/")} */`;

    if (def.param) {
        return `${doc}
export class ${def.className} extends ${def.baseClass} {
    public ${def.param.attr}: number;

    constructor(args: ErrorArgs) {
        const ${def.param.attr} = Number(args.capture || 0);
        const message = ${messageExpr(def)};
        super(message, args.request);
        this.message = message;
        this.${def.param.attr} = ${def.param.attr};
    }
}
`;
    }

    return `${doc}
export class ${def.className} extends ${def.baseClass} {
    constructor(args: ErrorArgs) {
        const message = ${messageExpr(def)};
        super(message, args.request);
        this.message = message;
        this.errorMessage = ${JSON.stringify(def.raw)};
    }
}
`;
}

function main(): void {
    const root = __dirname;
    const data: ErrorsJson = JSON.parse(
        fs.readFileSync(
            path.resolve(root, "static/errors/errors.json"),
            "utf-8"
        )
    );

    const { decls, dict, re } = buildDefs(data);

    const declared = new Set<string>();
    const classBlocks: string[] = [];
    for (const def of decls) {
        const block = renderClass(def, declared);
        if (block) classBlocks.push(block);
    }

    const dictEntries = dict
        .map(([raw, className]) => `    [${JSON.stringify(raw)}, ${className}],`)
        .join("\n");

    const reLiterals = re
        .map(([regex, className]) => `    [/${regex}/, ${className}],`)
        .join("\n");

    const baseEntries = Object.keys(CODE_TO_BASE)
        .map((c) => `    [${c}, ${CODE_TO_BASE[Number(c)]}],`)
        .join("\n");

    const header = `/* eslint-disable */
import {
${BASE_IMPORTS.map((n) => `    ${n},`).join("\n")}
} from "./RPCBaseErrors";

export interface ErrorArgs {
    request: any;
    capture?: number | null;
}
`;

    const tables = `
export const rpcErrorsDict: Map<string, any> = new Map<string, any>([
${dictEntries}
]);

export const rpcErrorsRe: Map<RegExp, any> = new Map<RegExp, any>([
${reLiterals}
]);

export const rpcErrorRe = rpcErrorsRe;

export const baseErrors: Map<number, any> = new Map<number, any>([
${baseEntries}
]);
`;

    const out = header + "\n" + classBlocks.join("\n") + "\n" + tables;

    const outPath = path.resolve(root, "../teleproto/errors/RPCErrorList.ts");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, out);

    console.log(
        `Generated ${declared.size} error classes ` +
            `(${dict.length} exact, ${re.length} parametrized) -> ${outPath}`
    );
}

main();
