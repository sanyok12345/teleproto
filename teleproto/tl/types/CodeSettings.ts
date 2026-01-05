import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class CodeSettings extends TLObject {
    static CONSTRUCTOR_ID = 2904898936;
    static SUBCLASS_OF_ID = 1223539850;
    static className = "CodeSettings";
    static classType = "constructor";

    flags!: number;
    allowFlashcall?: boolean;
    currentNumber?: boolean;
    allowAppHash?: boolean;
    allowMissedCall?: boolean;
    allowFirebase?: boolean;
    unknownNumber?: boolean;
    logoutTokens?: Buffer[];
    token?: string;
    appSandbox?: boolean;

    constructor(args: { flags?: number, allowFlashcall?: boolean, currentNumber?: boolean, allowAppHash?: boolean, allowMissedCall?: boolean, allowFirebase?: boolean, unknownNumber?: boolean, logoutTokens?: Buffer[], token?: string, appSandbox?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.allowFlashcall = args.allowFlashcall;
        this.currentNumber = args.currentNumber;
        this.allowAppHash = args.allowAppHash;
        this.allowMissedCall = args.allowMissedCall;
        this.allowFirebase = args.allowFirebase;
        this.unknownNumber = args.unknownNumber;
        this.logoutTokens = args.logoutTokens;
        this.token = args.token;
        this.appSandbox = args.appSandbox;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2904898936, false);
        let flags = 0;
        if (this.allowFlashcall) { flags |= 1 << 0; }
        if (this.currentNumber) { flags |= 1 << 1; }
        if (this.allowAppHash) { flags |= 1 << 4; }
        if (this.allowMissedCall) { flags |= 1 << 5; }
        if (this.allowFirebase) { flags |= 1 << 7; }
        if (this.unknownNumber) { flags |= 1 << 9; }
        if (this.logoutTokens !== undefined && this.logoutTokens !== null) { flags |= 1 << 6; }
        if (this.token !== undefined && this.token !== null) { flags |= 1 << 8; }
        if (this.appSandbox !== undefined && this.appSandbox !== null) { flags |= 1 << 8; }
        writer.writeInt(flags, false);
        if (this.allowFlashcall !== undefined && this.allowFlashcall !== null) {
        }
        if (this.currentNumber !== undefined && this.currentNumber !== null) {
        }
        if (this.allowAppHash !== undefined && this.allowAppHash !== null) {
        }
        if (this.allowMissedCall !== undefined && this.allowMissedCall !== null) {
        }
        if (this.allowFirebase !== undefined && this.allowFirebase !== null) {
        }
        if (this.unknownNumber !== undefined && this.unknownNumber !== null) {
        }
        if (this.logoutTokens !== undefined && this.logoutTokens !== null) {
            writer.writeVector(this.logoutTokens, (item) => {
                writer.tgWriteBytes(item);
            });
        }
        if (this.token !== undefined && this.token !== null) {
            writer.tgWriteString(this.token);
        }
        if (this.appSandbox !== undefined && this.appSandbox !== null) {
            writer.tgWriteBool(this.appSandbox);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CodeSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _allowFlashcall = true;
            args.allowFlashcall = _allowFlashcall;
        } else {
            args.allowFlashcall = false;
        }
        if (args.flags & (1 << 1)) {
            const _currentNumber = true;
            args.currentNumber = _currentNumber;
        } else {
            args.currentNumber = false;
        }
        if (args.flags & (1 << 4)) {
            const _allowAppHash = true;
            args.allowAppHash = _allowAppHash;
        } else {
            args.allowAppHash = false;
        }
        if (args.flags & (1 << 5)) {
            const _allowMissedCall = true;
            args.allowMissedCall = _allowMissedCall;
        } else {
            args.allowMissedCall = false;
        }
        if (args.flags & (1 << 7)) {
            const _allowFirebase = true;
            args.allowFirebase = _allowFirebase;
        } else {
            args.allowFirebase = false;
        }
        if (args.flags & (1 << 9)) {
            const _unknownNumber = true;
            args.unknownNumber = _unknownNumber;
        } else {
            args.unknownNumber = false;
        }
        if (args.flags & (1 << 6)) {
            const _logoutTokens = reader.readVector((reader) => {
                const item = reader.tgReadBytes();
                return item;
            });
            args.logoutTokens = _logoutTokens;
        } else {
            args.logoutTokens = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _token = reader.tgReadString();
            args.token = _token;
        } else {
            args.token = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _appSandbox = reader.tgReadBool();
            args.appSandbox = _appSandbox;
        } else {
            args.appSandbox = undefined;
        }
        return new CodeSettings(args);
    }
}