export enum LogLevel {
    NONE = "none",
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug",
}

export interface LogRecord {
    readonly level: LogLevel;
    readonly message: string;
    readonly error?: unknown;
    readonly date: Date;
}

export type LogHandler = (record: LogRecord) => void;

const SEVERITY = {
    none: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
} satisfies Record<LogLevel, number>;

const COLOR: Partial<Record<LogLevel, string>> = {
    error: "\x1b[31m",
    warn: "\x1b[35m",
    info: "\x1b[33m",
    debug: "\x1b[36m",
};
const RESET = "\x1b[0m";

export class Logger {
    handler?: LogHandler;
    messageFormat = "[%t] [%l] - [%m]";
    tzOffset = new Date().getTimezoneOffset() * 60000;
    private _logLevel: LogLevel;

    constructor(level: LogLevel = LogLevel.INFO) {
        this._logLevel = level;
    }

    canSend(level: LogLevel): boolean {
        return SEVERITY[this._logLevel] >= SEVERITY[level];
    }

    error(message: string, error?: unknown): void {
        this._log(LogLevel.ERROR, message, error);
    }

    warn(message: string, error?: unknown): void {
        this._log(LogLevel.WARN, message, error);
    }

    info(message: string, error?: unknown): void {
        this._log(LogLevel.INFO, message, error);
    }

    debug(message: string, error?: unknown): void {
        this._log(LogLevel.DEBUG, message, error);
    }

    format(message: string, level: string): string {
        return this.messageFormat
            .replace("%t", this.getDateTime())
            .replace("%l", level.toUpperCase())
            .replace("%m", message);
    }

    getDateTime(): string {
        return new Date(Date.now() - this.tzOffset).toISOString().slice(0, -1);
    }

    get logLevel(): LogLevel {
        return this._logLevel;
    }

    setLevel(level: LogLevel): void {
        this._logLevel = level;
    }

    static setLevel(level: string): void {
        console.log(
            "Logger.setLevel is deprecated, it will has no effect. Please, use client.setLogLevel instead."
        );
    }

    _log(level: LogLevel, message: string, error?: unknown): void {
        if (this.canSend(level)) {
            this.log(level, message, error);
        }
    }

    log(level: LogLevel, message: string, error?: unknown): void {
        if (this.handler) {
            this.handler({
                level,
                message,
                error,
                date: new Date(Date.now() - this.tzOffset),
            });
            return;
        }
        console.log((COLOR[level] ?? "") + this.format(message, level) + RESET);
        if (error !== undefined) {
            console.error(error);
        }
    }
}
