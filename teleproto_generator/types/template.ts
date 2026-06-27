import type { TlDefinition } from "../parser";

type TlType = {
    namespace?: string;
    name: string;
    constructors: string[];
};

export interface ErrorMeta {
    byMethod: Record<string, Array<{ cls: string; desc: string }>>;
    userOnly: Set<string>;
    botOnly: Set<string>;
    business: Set<string>;
}

export interface MethodDocs {
    summary: string;
    params: Record<string, string>;
}
export type DocsMap = Record<string, MethodDocs>;

function jsdocSafe(text: string): string {
    return text.replace(/\*\//g, "*\\/").trim();
}

const WEIRD_TYPES = new Set(["Bool", "X", "Type"]);

function upperFirst(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

function lowerFirst(str: string): string {
    return str ? `${str[0].toLowerCase()}${str.slice(1)}` : str;
}

function groupByKey<T extends Record<string, unknown>>(
    collection: T[],
    key: string
): Record<string, T[]> {
    return collection.reduce<Record<string, T[]>>((byKey, member) => {
        const keyValue = (member[key] as string) || "_";
        if (!byKey[keyValue]) {
            byKey[keyValue] = [member];
        } else {
            byKey[keyValue].push(member);
        }
        return byKey;
    }, {});
}

function getClassNameWithNamespace(name: string, namespace?: string): string {
    return namespace
        ? `${namespace.toLowerCase()}.${upperFirst(name)}`
        : upperFirst(name);
}

function renderTypeName(typeName: string): string {
    return typeName.includes(".")
        ? typeName.replace(".", ".Type")
        : `Api.Type${typeName}`;
}

function renderValueType(type: string, isVector: boolean, isTlType: boolean): string {
    if (WEIRD_TYPES.has(type)) {
        return isVector ? `${type}[]` : type;
    }

    let resultType = isTlType ? renderTypeName(type) : type;
    if (resultType === "true") {
        resultType = "boolean";
    }
    return isVector ? `${resultType}[]` : resultType;
}

function renderResult(result: string): string {
    const vectorMatch = result.match(/[Vv]ector<([\w\d.]+)>/);
    const isVector = Boolean(vectorMatch);
    const scalarValue = isVector
        ? (vectorMatch as RegExpMatchArray)[1]
        : result;
    const isTlType =
        Boolean(scalarValue.match(/^[A-Z]/)) || scalarValue.includes(".");

    return renderValueType(scalarValue, isVector, isTlType);
}

function renderArg(
    argName: string,
    argConfig: TlDefinition["argsConfig"][string]
): string {
    const { isVector, isFlag, skipConstructorId, flagIndicator, type } = argConfig;

    const valueType = renderValueType(type || "unknown", isVector, !skipConstructorId);
    return `${flagIndicator ? "// " : ""}${argName}${
        isFlag || (argName === "randomId" && type === "long" && !isVector)
            ? "?"
            : ""
    }: ${valueType}`;
}

function renderTypes(types: TlType[], indent: string): string {
    return types
        .map(({ name, constructors }) =>
            `${!constructors.length ? "// " : ""}export type Type${upperFirst(
                name
            )} = ${constructors.join(" | ")};`
        )
        .join(`\n${indent}`);
}

function renderConstructors(items: TlDefinition[], indent: string): string {
    return items
        .map((args) => {
            const { name, namespace, argsConfig, constructorId, subclassOfId } = args;
            if (name === "Message") {
                return `export class Message extends CustomMessage {\n${indent}CONSTRUCTOR_ID: ${constructorId};\n${indent}SUBCLASS_OF_ID: ${subclassOfId};\n${indent}classType: \"request\";\n${indent}className: \"${getClassNameWithNamespace(
                    name,
                    namespace
                )}\";\n${indent}static fromReader(reader: Reader): ${upperFirst(name)};\n}`;
            }

            if (name === "MessageService") {
                return `export class MessageService extends CustomMessage {\n${indent}CONSTRUCTOR_ID: ${constructorId};\n${indent}SUBCLASS_OF_ID: ${subclassOfId};\n${indent}classType: \"request\";\n${indent}className: \"${getClassNameWithNamespace(
                    name,
                    namespace
                )}\";\n${indent}static fromReader(reader: Reader): ${upperFirst(name)};\n}`;
            }

            const argKeys = Object.keys(argsConfig);
            if (!argKeys.length) {
                return `export class ${upperFirst(name)} extends VirtualClass<void> {\n${indent}CONSTRUCTOR_ID: ${constructorId};\n${indent}SUBCLASS_OF_ID: ${subclassOfId};\n${indent}classType: \"constructor\";\n${indent}className: \"${getClassNameWithNamespace(
                    name,
                    namespace
                )}\";\n${indent}static fromReader(reader: Reader): ${upperFirst(name)};\n}`;
            }

            const fields = argKeys
                .map((argName) => `${renderArg(argName, argsConfig[argName])};`)
                .join(`\n${indent}  `);

            return `export class ${upperFirst(name)} extends VirtualClass<{\n${indent}  ${fields}\n${indent}}> {\n${indent}CONSTRUCTOR_ID: ${constructorId};\n${indent}SUBCLASS_OF_ID: ${subclassOfId};\n${indent}classType: \"constructor\";\n${indent}className: \"${getClassNameWithNamespace(
                name,
                namespace
            )}\";\n${indent}static fromReader(reader: Reader): ${upperFirst(name)};\n${indent}  ${fields}\n${indent}}`;
        })
        .join(`\n${indent}`);
}

function renderRequests(items: TlDefinition[], indent: string): string {
    return items
        .map((args) => {
            const {
                name,
                argsConfig,
                result,
                constructorId,
                namespace,
                subclassOfId,
            } = args;
            const argKeys = Object.keys(argsConfig);

            if (!argKeys.length) {
                return `export class ${upperFirst(name)} extends Request<void, ${renderResult(
                    result
                )}> {\n${indent}CONSTRUCTOR_ID: ${constructorId};\n${indent}SUBCLASS_OF_ID: ${subclassOfId};\n${indent}classType: \"request\";\n${indent}className: \"${getClassNameWithNamespace(
                    name,
                    namespace
                )}\";\n${indent}static fromReader(reader: Reader): ${upperFirst(name)};\n}`;
            }

            const fields = argKeys
                .map((argName) => `${renderArg(argName, argsConfig[argName])};`)
                .join(`\n${indent}  `);

            return `export class ${upperFirst(name)} extends Request<Partial<{\n${indent}  ${fields}\n${indent}}>, ${renderResult(
                result
            )}> {\n${indent}CONSTRUCTOR_ID: ${constructorId};\n${indent}SUBCLASS_OF_ID: ${subclassOfId};\n${indent}classType: \"request\";\n${indent}className: \"${getClassNameWithNamespace(
                name,
                namespace
            )}\";\n${indent}static fromReader(reader: Reader): ${upperFirst(name)};\n${indent}  ${fields}\n${indent}}`;
        })
        .join(`\n${indent}`);
}

function methodKeyOf(fn: TlDefinition): string {
    return `${fn.namespace ? `${fn.namespace}.` : ""}${lowerFirst(upperFirst(fn.name))}`;
}

function methodPrefix(fn: TlDefinition): string {
    const pascal = upperFirst(fn.name);
    return fn.namespace ? `${upperFirst(fn.namespace)}${pascal}` : pascal;
}

function realArgNames(fn: TlDefinition): string[] {
    return Object.keys(fn.argsConfig).filter(
        (argName) => !fn.argsConfig[argName].flagIndicator
    );
}

function renderFacadeJsDoc(
    methodKey: string,
    prefix: string,
    indent: string,
    errors: ErrorMeta,
    docs: DocsMap
): string {
    const lines: string[] = [];

    const summary = docs[methodKey]?.summary;
    if (summary) lines.push(`${indent} * ${jsdocSafe(summary)}`);

    const tags: string[] = [];
    if (errors.userOnly.has(methodKey)) tags.push("user-only (bots rejected)");
    if (errors.botOnly.has(methodKey)) tags.push("bots-only");
    if (errors.business.has(methodKey))
        tags.push("works over a business connection");
    if (tags.length) lines.push(`${indent} * @remarks ${tags.join(" · ")}`);

    lines.push(`${indent} * @see https://core.telegram.org/method/${methodKey}`);

    if ((errors.byMethod[methodKey] || []).length) {
        lines.push(`${indent} * @throws {${prefix}Errors}`);
    }

    return `/**\n${lines.join("\n")}\n${indent} */`;
}

function renderFacadeMethod(
    fn: TlDefinition,
    indent: string,
    errors: ErrorMeta,
    docs: DocsMap
): string {
    const methodName = lowerFirst(upperFirst(fn.name));
    const methodKey = methodKeyOf(fn);
    const prefix = methodPrefix(fn);
    const returnType = renderResult(fn.result);
    const jsdoc = renderFacadeJsDoc(methodKey, prefix, indent, errors, docs);

    const params = realArgNames(fn).length
        ? `params: ${prefix}Params, opts?: ApiCallOptions`
        : `opts?: ApiCallOptions`;

    return `${jsdoc}\n${indent}${methodName}(${params}): Promise<${returnType}>;`;
}

const PRIMITIVE_TYPES = new Set([
    "int", "long", "int128", "int256", "double", "string", "Bool", "true",
    "bytes", "date", "#", "X", "Type", "Object",
]);

function isTlType(type: string | null): boolean {
    if (!type) return false;
    const last = type.split(".").pop() || "";
    return (
        /^[A-Z]/.test(last) &&
        !PRIMITIVE_TYPES.has(type) &&
        !PRIMITIVE_TYPES.has(last)
    );
}

interface InputCone {
    ctorsByResult: Map<string, TlDefinition[]>;
    coneTypes: Set<string>;
    coneCtors: TlDefinition[];
}

function computeInputCone(
    functions: TlDefinition[],
    constructors: TlDefinition[]
): InputCone {
    const ctorsByResult = new Map<string, TlDefinition[]>();
    for (const c of constructors) {
        const list = ctorsByResult.get(c.result);
        if (list) list.push(c);
        else ctorsByResult.set(c.result, [c]);
    }
    const tlArgTypes = (d: TlDefinition): string[] =>
        Object.values(d.argsConfig)
            .map((a) => a.type)
            .filter((t): t is string => isTlType(t));

    const coneTypes = new Set<string>();
    const coneCtors: TlDefinition[] = [];
    const visit = (t: string): void => {
        if (coneTypes.has(t)) return;
        const cs = ctorsByResult.get(t);
        if (!cs || !cs.length) return; // leaf (EntityLike, primitives, …)
        coneTypes.add(t);
        for (const c of cs) {
            coneCtors.push(c);
            for (const tt of tlArgTypes(c)) visit(tt);
        }
    };
    for (const f of functions) for (const t of tlArgTypes(f)) visit(t);
    return { ctorsByResult, coneTypes, coneCtors };
}

function ctorInName(c: TlDefinition): string {
    return `${c.namespace ? upperFirst(c.namespace) : ""}${upperFirst(c.name)}In`;
}

function typeInName(type: string): string {
    return `${type.split(".").map(upperFirst).join("")}In`;
}

function renderInputArg(
    argName: string,
    cfg: TlDefinition["argsConfig"][string],
    cone: InputCone
): string {
    const { isVector, isFlag, skipConstructorId, type } = cfg;
    const valueType =
        type && cone.coneTypes.has(type)
            ? isVector
                ? `${typeInName(type)}[]`
                : typeInName(type)
            : renderValueType(type || "unknown", isVector, !skipConstructorId);
    const optional =
        isFlag || (argName === "randomId" && type === "long" && !isVector)
            ? "?"
            : "";
    return `${argName}${optional}: ${valueType}`;
}

function renderInputShapes(cone: InputCone): string {
    const parts: string[] = [];

    for (const c of cone.coneCtors) {
        const poly = (cone.ctorsByResult.get(c.result)?.length || 0) > 1;
        const tag = c.namespace
            ? `${c.namespace}.${lowerFirst(c.name)}`
            : lowerFirst(c.name);
        const fields = realArgNames(c)
            .map((a) => `    ${renderInputArg(a, c.argsConfig[a], cone)};`)
            .join("\n");
        parts.push(
            `  export interface ${ctorInName(c)} {\n` +
                `    _${poly ? "" : "?"}: "${tag}";` +
                (fields ? `\n${fields}` : "") +
                `\n  }`
        );
    }

    for (const t of cone.coneTypes) {
        const members = (cone.ctorsByResult.get(t) || [])
            .map(ctorInName)
            .join(" | ");
        parts.push(`  export type ${typeInName(t)} = ${members};`);
    }

    return parts.join("\n");
}

function renderParamsInterfaces(
    functions: TlDefinition[],
    docs: DocsMap,
    cone: InputCone
): string {
    return functions
        .map((fn) => {
            const argNames = realArgNames(fn);
            if (!argNames.length) return "";
            const paramDocs = docs[methodKeyOf(fn)]?.params || {};
            const fields = argNames
                .map((argName) => {
                    const desc = paramDocs[argName];
                    const lead = desc ? `    /** ${jsdocSafe(desc)} */\n` : "";
                    return `${lead}    ${renderInputArg(argName, fn.argsConfig[argName], cone)};`;
                })
                .join("\n");
            return `  export interface ${methodPrefix(fn)}Params {\n${fields}\n  }`;
        })
        .filter(Boolean)
        .join("\n");
}

function renderErrorUnions(
    functions: TlDefinition[],
    errors: ErrorMeta
): string {
    return functions
        .map((fn) => {
            const list = errors.byMethod[methodKeyOf(fn)] || [];
            if (!list.length) return "";
            const union = list.map((e) => `RpcErrors.${e.cls}`).join(" | ");
            return `  export type ${methodPrefix(fn)}Errors = ${union};`;
        })
        .filter(Boolean)
        .join("\n");
}

function renderApiFacade(
    functions: TlDefinition[],
    errors: ErrorMeta,
    docs: DocsMap,
    cone: InputCone
): string {
    const byNamespace = groupByKey(functions, "namespace");

    const rootMethods = (byNamespace._ || [])
        .map((fn) => renderFacadeMethod(fn as TlDefinition, "    ", errors, docs))
        .join("\n    ");

    const namespacedMethods = Object.keys(byNamespace)
        .filter((namespace) => namespace !== "_")
        .map((namespace) => {
            const methods = byNamespace[namespace]
                .map((fn) =>
                    renderFacadeMethod(fn as TlDefinition, "      ", errors, docs)
                )
                .join("\n      ");
            return `    ${namespace}: {\n      ${methods}\n    };`;
        })
        .join("\n");

    return `export interface ApiCallOptions {
    /** Route this single call to a specific DC. */
    dcId?: number;
    /** Abort the in-flight request (reserved). */
    abortSignal?: AbortSignal;
    /** Auto-sleep & retry on FLOOD_WAIT up to this many seconds (reserved). */
    floodSleepThreshold?: number;
  }

${renderParamsInterfaces(functions, docs, cone)}

${renderErrorUnions(functions, errors)}

${renderInputShapes(cone)}

  /**
   * Typed 1:1 facade over the raw MTProto methods.
   *
   * \`client.api.<namespace>.<method>(params, opts?)\` — no \`new\`, no manual
   * \`invoke\`, full autocomplete and strict typing straight from the schema.
   * Per-method params live in \`<Method>Params\`; throwable errors in
   * \`<Method>Errors\`.
   */
  export interface ApiFacade {
    ${rootMethods}
${namespacedMethods}
  }`;
}

export function renderApiTypes(input: {
    types: TlType[];
    constructors: TlDefinition[];
    functions: TlDefinition[];
    errorMeta: ErrorMeta;
    docs: DocsMap;
}): string {
    const { types, constructors, functions, errorMeta, docs } = input;
    const typesByNs = groupByKey(types, "namespace");
    const constructorsByNs = groupByKey(constructors, "namespace");
    const requestsByNs = groupByKey(functions, "namespace");

    return `
// This file is autogenerated. All changes will be overwritten.
import { BigInteger } from 'big-integer';
import {EntityLike,MessageIDLike} from "../../define";
import { CustomMessage } from "../custom/message";
import type * as RpcErrors from "../../errors";


export namespace Api {
  type AnyLiteral = Record<string, any> | void;
  type Reader = any; // To be defined.
  type Client = any; // To be defined.
  type Utils = any; // To be defined.
  type X = unknown;
  type Type = unknown;
  type Bool = boolean;
  type int = number;
  type double = number;
  type float = number;
  type int128 = BigInteger;
  type int256 = BigInteger;
  type long = BigInteger;
  type bytes = Buffer;
  class VirtualClass<Args extends AnyLiteral> {
    static CONSTRUCTOR_ID: number;
    static SUBCLASS_OF_ID: number;
    static className: string;
    static classType: 'constructor' | 'request';
    static serializeBytes(data: Buffer | string): Buffer;
    static serializeDate(date: Date | number): Buffer;
    getBytes():Buffer;
    CONSTRUCTOR_ID: number;
    SUBCLASS_OF_ID: number;
    className: string;
    classType: 'constructor' | 'request';
    constructor(args: Args);
    originalArgs: Args;
    toJSON(): Args;
  }
  class Request<Args, Response> extends VirtualClass<Partial<Args>> {
    static readResult(reader: Reader): Buffer;
    resolve(client: Client, utils: Utils): Promise<void>;
    __response: Response;
  }
  ${renderConstructors(constructorsByNs._ || [], "  ")}
  ${renderRequests(requestsByNs._ || [], "  ")}
  ${Object.keys(constructorsByNs)
      .map((namespace) =>
          namespace !== "_"
              ? `\n  export namespace ${namespace} {\n    ${renderConstructors(
                    constructorsByNs[namespace],
                    "    "
                )}\n  }`
              : ""
      )
      .join("\n")}
  ${Object.keys(typesByNs)
      .map((namespace) =>
          namespace !== "_"
              ? `\n  export namespace ${namespace} {\n    ${renderTypes(
                    typesByNs[namespace],
                    "    "
                )}\n  }`
              : ""
      )
      .join("\n")}
  ${Object.keys(requestsByNs)
      .map((namespace) =>
          namespace !== "_"
              ? `\n  export namespace ${namespace} {\n    ${renderRequests(
                    requestsByNs[namespace],
                    "    "
                )}\n  }`
              : ""
      )
      .join("\n")}
  ${renderApiFacade(functions, errorMeta, docs, computeInputCone(functions, constructors))}
  export type TypeEntityLike = EntityLike;
  ${renderTypes(typesByNs._ || [], "  ")}
  export type AnyRequest = ${(requestsByNs._ || [])
      .map(({ name }) => upperFirst(name as string))
      .join(" | ")}
    | ${Object.keys(requestsByNs)
        .filter((ns) => ns !== "_")
        .map((ns) =>
            requestsByNs[ns]
                .map(({ name }) => `${ns}.${upperFirst(name as string)}`)
                .join(" | ")
        )
        .join("\n    | ")};
}
`;
}
