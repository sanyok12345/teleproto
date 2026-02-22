import bigInt, { BigInteger } from "big-integer";

import {
    generateRandomBytes,
    readBigIntFromBuffer,
    isArrayLike,
    toSignedLittleBuffer,
} from "../../Helpers";
import { serializeBytes, serializeDate } from "./helpers";

type PrimitiveArgType =
    | "int"
    | "long"
    | "int128"
    | "int256"
    | "double"
    | "string"
    | "Bool"
    | "true"
    | "bytes"
    | "date";

type TlReader = {
    readInt: () => number;
    readLong: () => BigInteger;
    readLargeInt: (bits: number) => BigInteger;
    readDouble: () => number;
    tgReadString: () => string;
    tgReadBool: () => boolean;
    tgReadBytes: () => Buffer;
    tgReadDate: () => Date;
    tgReadObject: () => unknown;
};

type TlUtils = {
    getInputPeer: (value: unknown) => unknown;
    getInputChannel: (value: unknown) => unknown;
    getInputUser: (value: unknown) => unknown;
    getInputMedia: (value: unknown) => unknown;
    getInputPhoto: (value: unknown) => unknown;
    getInputMessage: (value: unknown) => unknown;
    getInputDocument: (value: unknown) => unknown;
    getInputChatPhoto: (value: unknown) => unknown;
};

type TlClient = {
    getInputEntity: (value: unknown) => Promise<unknown>;
    _getInputDialog: (value: unknown) => Promise<unknown>;
    _getInputNotify: (value: unknown) => Promise<unknown>;
    getPeerId: (value: unknown, addMark: boolean) => Promise<unknown>;
};

type ArgConfig = {
    isVector: boolean;
    isFlag: boolean;
    skipConstructorId: boolean;
    flagName: string | null;
    flagIndex: number;
    flagIndicator: boolean;
    type: string | null;
    useVectorId: boolean | null;
    name?: string;
};

type Definition = {
    name: string;
    constructorId: number;
    subclassOfId: number;
    argsConfig: Record<string, ArgConfig>;
    namespace?: string;
    isFunction: boolean;
    result: string;
};

type ApiTree = Record<string, unknown>;

const NAMED_AUTO_CASTS = new Set(["chatId,int"]);
const AUTO_CASTS = new Set([
    "InputPeer",
    "InputChannel",
    "InputUser",
    "InputDialogPeer",
    "InputNotifyPeer",
    "InputMedia",
    "InputPhoto",
    "InputMessage",
    "InputDocument",
    "InputChatPhoto",
]);

class CastError extends Error {
    constructor(objectName: string, expected: string, actual: unknown) {
        super(
            "Found wrong type for " +
                objectName +
                ". expected " +
                expected +
                " but received " +
                String(actual) +
                ".If you think this is a mistake please report it."
        );

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CastError);
        }

        this.name = "CastError";
    }
}

function generateRandomBigInt(): BigInteger {
    return readBigIntFromBuffer(generateRandomBytes(8), false, true);
}

function argToBytes(
    value: unknown,
    type: string | null,
    argName: string,
    requestName?: string
): Buffer {
    switch (type as PrimitiveArgType) {
        case "int": {
            const intBuffer = Buffer.alloc(4);
            intBuffer.writeInt32LE(value as number, 0);
            return intBuffer;
        }
        case "long":
            return toSignedLittleBuffer(value as any, 8);
        case "int128":
            return toSignedLittleBuffer(value as any, 16);
        case "int256":
            return toSignedLittleBuffer(value as any, 32);
        case "double": {
            const doubleBuffer = Buffer.alloc(8);
            doubleBuffer.writeDoubleLE(value as number, 0);
            return doubleBuffer;
        }
        case "string":
            return serializeBytes(value as string);
        case "Bool":
            return value
                ? Buffer.from("b5757299", "hex")
                : Buffer.from("379779bc", "hex");
        case "true":
            return Buffer.alloc(0);
        case "bytes":
            return serializeBytes(value as Buffer | string);
        case "date":
            return serializeDate(value as Date | number);
        default: {
            const objectValue = value as { getBytes?: () => Buffer } | undefined;
            if (!objectValue || typeof objectValue.getBytes !== "function") {
                throw new Error(
                    `Required object ${argName} of ${requestName || "request"} is undefined`
                );
            }
            return objectValue.getBytes();
        }
    }
}

async function getInputFromResolve(
    utils: TlUtils,
    client: TlClient,
    peer: unknown,
    peerType: string | null
): Promise<unknown> {
    switch (peerType) {
        case "InputPeer":
            return utils.getInputPeer(await client.getInputEntity(peer));
        case "InputChannel":
            return utils.getInputChannel(await client.getInputEntity(peer));
        case "InputUser":
            return utils.getInputUser(await client.getInputEntity(peer));
        case "InputDialogPeer":
            return client._getInputDialog(peer);
        case "InputNotifyPeer":
            return client._getInputNotify(peer);
        case "InputMedia":
            return utils.getInputMedia(peer);
        case "InputPhoto":
            return utils.getInputPhoto(peer);
        case "InputMessage":
            return utils.getInputMessage(peer);
        case "InputDocument":
            return utils.getInputDocument(peer);
        case "InputChatPhoto":
            return utils.getInputChatPhoto(peer);
        case "chatId,int":
            return client.getPeerId(peer, false);
        default:
            throw new Error("unsupported peer type : " + peerType);
    }
}

function compareType(value: unknown, type: string): boolean {
    switch (type) {
        case "number":
            return typeof value === "number" || value === undefined;
        case "string":
            return typeof value === "string";
        case "boolean":
            return typeof value === "boolean";
        case "bigInt":
            return (
                bigInt.isInstance(value) ||
                typeof value === "bigint" ||
                typeof value === "number" ||
                typeof value === "string" ||
                value === undefined
            );
        case "true":
            return true;
        case "buffer":
            return Buffer.isBuffer(value);
        case "date":
            return (
                ((value as Date | undefined) instanceof Date &&
                    !Number.isNaN((value as Date).getTime())) ||
                typeof value === "number"
            );
        default:
            return true;
    }
}

function createArgFromReader(getApi: () => ApiTree) {
    return function getArgFromReader(reader: TlReader, arg: ArgConfig): unknown {
        if (arg.isVector) {
            if (arg.useVectorId) {
                reader.readInt();
            }

            const values: unknown[] = [];
            const len = reader.readInt();
            arg.isVector = false;
            for (let i = 0; i < len; i += 1) {
                values.push(getArgFromReader(reader, arg));
            }
            arg.isVector = true;
            return values;
        }

        if (arg.flagIndicator) {
            return reader.readInt();
        }

        switch (arg.type as PrimitiveArgType) {
            case "int":
                return reader.readInt();
            case "long":
                return reader.readLong();
            case "int128":
                return reader.readLargeInt(128);
            case "int256":
                return reader.readLargeInt(256);
            case "double":
                return reader.readDouble();
            case "string":
                return reader.tgReadString();
            case "Bool":
                return reader.tgReadBool();
            case "true":
                return true;
            case "bytes":
                return reader.tgReadBytes();
            case "date":
                return reader.tgReadDate();
            default: {
                if (!arg.skipConstructorId) {
                    return reader.tgReadObject();
                }
                const api = getApi() as Record<string, Record<string, { fromReader: (r: TlReader) => unknown }>>;
                return api.constructors[arg.type as string].fromReader(reader);
            }
        }
    };
}

function createClasses(
    params: Definition[],
    helpers: { getArgFromReader: (reader: TlReader, arg: ArgConfig) => unknown }
): ApiTree {
    const classes: Record<string, unknown> = {};
    const { getArgFromReader } = helpers;

    for (const classParams of params) {
        const {
            name,
            constructorId,
            subclassOfId,
            argsConfig,
            namespace,
            isFunction,
            result,
        } = classParams;
        const fullName = [namespace, name].join(".").replace(/^\./, "");

        class VirtualClass {
            static CONSTRUCTOR_ID = constructorId;
            static SUBCLASS_OF_ID = subclassOfId;
            static className = fullName;
            static classType = isFunction ? "request" : "constructor";

            CONSTRUCTOR_ID = constructorId;
            SUBCLASS_OF_ID = subclassOfId;
            className = fullName;
            classType = isFunction ? "request" : "constructor";
            originalArgs: Record<string, unknown> = {};

            constructor(args?: Record<string, unknown>) {
                args = args || {};
                this.originalArgs = args;
                this.init(args);
                for (const argName in argsConfig) {
                    if (argName === "randomId" && !args[argName]) {
                        if (argsConfig[argName].isVector) {
                            const randomIds: BigInteger[] = [];
                            const baseIds = (args.id as unknown[]) || [];
                            for (let i = 0; i < baseIds.length; i += 1) {
                                randomIds.push(generateRandomBigInt());
                            }
                            (this as Record<string, unknown>)[argName] = randomIds;
                        } else {
                            (this as Record<string, unknown>)[argName] =
                                generateRandomBigInt();
                        }
                    } else {
                        (this as Record<string, unknown>)[argName] = args[argName];
                    }
                }
            }

            init(_args: Record<string, unknown>): void {}

            static fromReader(reader: TlReader): unknown {
                const args: Record<string, unknown> = {};

                for (const argName in argsConfig) {
                    if (!Object.prototype.hasOwnProperty.call(argsConfig, argName)) {
                        continue;
                    }

                    const arg = argsConfig[argName];
                    if (arg.isFlag) {
                        if (arg.type === "true") {
                            args[argName] = Boolean(
                                (args[arg.flagName as string] as number) &
                                    (1 << (arg.flagIndex as number))
                            );
                            continue;
                        }
                        if (
                            (args[arg.flagName as string] as number) &
                            (1 << (arg.flagIndex as number))
                        ) {
                            args[argName] = getArgFromReader(reader, arg);
                        } else {
                            args[argName] = null;
                        }
                    } else {
                        if (arg.flagIndicator) {
                            arg.name = argName;
                        }
                        args[argName] = getArgFromReader(reader, arg);
                    }
                }
                return new this(args);
            }

            validate(): void {
                for (const arg in argsConfig) {
                    if (!Object.prototype.hasOwnProperty.call(argsConfig, arg)) {
                        continue;
                    }
                    if (argsConfig[arg].flagIndicator || argsConfig[arg].isFlag) {
                        continue;
                    }
                    const currentValue = (this as Record<string, unknown>)[arg];
                    this.assertType(arg, argsConfig[arg], currentValue);
                }
            }

            assertType(objectName: string, object: ArgConfig, value: unknown): void {
                let expected: string;
                if (object.isVector) {
                    if (!isArrayLike(value)) {
                        console.error(new CastError(objectName, "array", value));
                    }
                    const vectorValue = value ?? [];
                    for (const item of vectorValue as unknown[]) {
                        this.assertType(objectName, { ...object, isVector: false }, item);
                    }
                    return;
                }

                switch (object.type) {
                    case "int":
                    case "double":
                        expected = "number";
                        break;
                    case "long":
                    case "int128":
                    case "int256":
                        expected = "bigInt";
                        break;
                    case "string":
                        expected = "string";
                        break;
                    case "Bool":
                        expected = "boolean";
                        break;
                    case "true":
                        expected = "true";
                        break;
                    case "bytes":
                        expected = "buffer";
                        break;
                    case "date":
                        expected = "date";
                        break;
                    default:
                        expected = "object";
                }

                if (expected !== "object" && !compareType(value, expected)) {
                    console.error(new CastError(objectName, expected, value));
                }
            }

            getBytes(): Buffer {
                try {
                    this.validate();
                } catch {}

                const constructorBuffer = Buffer.alloc(4);
                constructorBuffer.writeUInt32LE(this.CONSTRUCTOR_ID, 0);
                const buffers: Buffer[] = [constructorBuffer];

                for (const arg in argsConfig) {
                    if (!Object.prototype.hasOwnProperty.call(argsConfig, arg)) {
                        continue;
                    }

                    if (argsConfig[arg].isFlag) {
                        const flagValue = (this as Record<string, unknown>)[arg];
                        if (
                            (flagValue === false && argsConfig[arg].type !== "Bool") ||
                            flagValue === null ||
                            flagValue === undefined ||
                            argsConfig[arg].type === "true"
                        ) {
                            continue;
                        }
                    }

                    if (argsConfig[arg].isVector) {
                        if (argsConfig[arg].useVectorId) {
                            buffers.push(Buffer.from("15c4b51c", "hex"));
                        }
                        const list = ((this as Record<string, unknown>)[arg] || []) as unknown[];
                        const lengthBuffer = Buffer.alloc(4);
                        lengthBuffer.writeInt32LE(list.length, 0);
                        buffers.push(
                            lengthBuffer,
                            Buffer.concat(
                                list.map((item) =>
                                    argToBytes(item, argsConfig[arg].type, arg, fullName)
                                )
                            )
                        );
                        continue;
                    }

                    if (argsConfig[arg].flagIndicator) {
                        if (!Object.values(argsConfig).some((f) => f.isFlag)) {
                            buffers.push(Buffer.alloc(4));
                            continue;
                        }
                        let flagValue = 0;
                        for (const flagArg in argsConfig) {
                            if (
                                argsConfig[flagArg].isFlag &&
                                arg === argsConfig[flagArg].flagName
                            ) {
                                const currentValue =
                                    (this as Record<string, unknown>)[flagArg];
                                if (
                                    (currentValue === false &&
                                        argsConfig[flagArg].type !== "Bool") ||
                                    currentValue === undefined ||
                                    currentValue === null
                                ) {
                                    flagValue |= 0;
                                } else {
                                    flagValue |=
                                        1 << (argsConfig[flagArg].flagIndex as number);
                                }
                            }
                        }
                        const flagBuffer = Buffer.alloc(4);
                        flagBuffer.writeUInt32LE(flagValue, 0);
                        buffers.push(flagBuffer);
                        continue;
                    }

                    const serializedArg = argToBytes(
                        (this as Record<string, unknown>)[arg],
                        argsConfig[arg].type,
                        arg,
                        fullName
                    );
                    buffers.push(serializedArg);

                    const objectArg = (this as Record<string, unknown>)[arg] as {
                        getBytes?: () => Buffer;
                    };
                    if (objectArg && typeof objectArg.getBytes === "function") {
                        let boxed = argsConfig[arg].type?.charAt(
                            (argsConfig[arg].type as string).indexOf(".") + 1
                        );
                        boxed = boxed === boxed?.toUpperCase() ? boxed : "";
                        if (!boxed) {
                            buffers.shift();
                        }
                    }
                }

                return Buffer.concat(buffers);
            }

            readResult(reader: TlReader): unknown {
                if (!isFunction) {
                    throw new Error("`readResult()` called for non-request instance");
                }

                const match = result.match(/Vector<(int|long)>/);
                if (match) {
                    reader.readInt();
                    const values: Array<number | BigInteger> = [];
                    const len = reader.readInt();
                    if (match[1] === "int") {
                        for (let i = 0; i < len; i += 1) {
                            values.push(reader.readInt());
                        }
                    } else {
                        for (let i = 0; i < len; i += 1) {
                            values.push(reader.readLong());
                        }
                    }
                    return values;
                }

                return reader.tgReadObject();
            }

            async resolve(client: TlClient, utils: TlUtils): Promise<void> {
                if (!isFunction) {
                    throw new Error("`resolve()` called for non-request instance");
                }

                for (const arg in argsConfig) {
                    if (!Object.prototype.hasOwnProperty.call(argsConfig, arg)) {
                        continue;
                    }

                    const argConfig = argsConfig[arg];
                    if (
                        !AUTO_CASTS.has(argConfig.type as string) &&
                        !NAMED_AUTO_CASTS.has(`${argConfig.name},${argConfig.type}`)
                    ) {
                        continue;
                    }
                    if (argConfig.isFlag && !(this as Record<string, unknown>)[arg]) {
                        continue;
                    }

                    if (argConfig.isVector) {
                        const currentValues =
                            ((this as Record<string, unknown>)[arg] as unknown[]) || [];
                        const resolvedValues: unknown[] = [];
                        for (const value of currentValues) {
                            resolvedValues.push(
                                await getInputFromResolve(
                                    utils,
                                    client,
                                    value,
                                    argConfig.type
                                )
                            );
                        }
                        (this as Record<string, unknown>)[arg] = resolvedValues;
                    } else {
                        (this as Record<string, unknown>)[arg] = await getInputFromResolve(
                            utils,
                            client,
                            (this as Record<string, unknown>)[arg],
                            argConfig.type
                        );
                    }
                }
            }

            toJSON(): Record<string, unknown> {
                return { ...this.originalArgs, className: fullName };
            }
        }

        if (namespace) {
            if (!classes[namespace]) {
                classes[namespace] = {};
            }
            (classes[namespace] as Record<string, unknown>)[name] = VirtualClass;
        } else {
            classes[name] = VirtualClass;
        }
    }

    return classes;
}

export function createApiFromDefinitions(definitions: Definition[]): ApiTree {
    let api: ApiTree;
    const getArgFromReader = createArgFromReader(() => api);
    api = createClasses(definitions, { getArgFromReader });
    return api;
}
