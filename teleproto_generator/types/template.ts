import type { TlDefinition } from "../parser";

type TlType = {
    namespace?: string;
    name: string;
    constructors: string[];
};

const WEIRD_TYPES = new Set(["Bool", "X", "Type"]);

function upperFirst(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
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

export function renderApiTypes(input: {
    types: TlType[];
    constructors: TlDefinition[];
    functions: TlDefinition[];
}): string {
    const { types, constructors, functions } = input;
    const typesByNs = groupByKey(types, "namespace");
    const constructorsByNs = groupByKey(constructors, "namespace");
    const requestsByNs = groupByKey(functions, "namespace");

    return `
// This file is autogenerated. All changes will be overwritten.
import { BigInteger } from 'big-integer';
import {EntityLike,MessageIDLike} from "../../define";
import { CustomMessage } from "../custom/message";


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
