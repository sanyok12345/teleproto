// let _level: string | undefined = undefined;

export enum LogLevel {
    NONE = "none",
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug",
}

const NodeColors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    underline: "\x1b[4m",
};

export class Logger {
    private levels = ["error", "warn", "info", "debug"];
    private nodeColors: {
        warn: string;
        debug: string;
        error: string;
        info: string;
        reset: string;
    };
    public messageFormat: string;
    private _logLevel: LogLevel;
    public tzOffset: number;

    constructor(level?: LogLevel) {
        this._logLevel = level || LogLevel.INFO;
        this.nodeColors = {
            warn: NodeColors.magenta,
            info: NodeColors.yellow,
            debug: NodeColors.cyan,
            error: NodeColors.red,
            reset: NodeColors.reset
        };
        this.messageFormat = "[%t] [%l] - [%m]";
        this.tzOffset = new Date().getTimezoneOffset() * 60000;
    }

    /**
     *
     * @param level {string}
     * @returns {boolean}
     */
    canSend(level: LogLevel) {
        return this._logLevel
            ? this.levels.indexOf(this._logLevel) >= this.levels.indexOf(level)
            : false;
    }

    /**
     * @param message {string}
     */
    warn(message: string) {
        this._log(LogLevel.WARN, message);
    }

    /**
     * @param message {string}
     */
    info(message: string) {
        this._log(LogLevel.INFO, message);
    }

    /**
     * @param message {string}
     */
    debug(message: string) {
        this._log(LogLevel.DEBUG, message);
    }

    /**
     * @param message {string}
     */
    error(message: string) {
        this._log(LogLevel.ERROR, message);
    }

    format(message: string, level: string) {
        return this.messageFormat
            .replace("%t", this.getDateTime())
            .replace("%l", level.toUpperCase())
            .replace("%m", message);
    }

    get logLevel() {
        return this._logLevel;
    }

    setLevel(level: LogLevel) {
        this._logLevel = level;
    }

    static setLevel(level: string) {
        console.log(
            "Logger.setLevel is deprecated, it will has no effect. Please, use client.setLogLevel instead."
        );
    }

    /**
     * @param level {string}
     * @param message {string}
     */
    _log(level: LogLevel, message: string) {
        if (this.canSend(level)) {
            this.log(level, message);
        }
    }

    /**
     * Override this function for custom Logger. <br />
     *
     * @param level {string}
     * @param message {string}
     */
    log(level: LogLevel, message: string) {
        let nodeColor: string;
        switch (level) {
            case LogLevel.ERROR:
                nodeColor = this.nodeColors.error;
                break;
            case LogLevel.WARN:
                nodeColor = this.nodeColors.warn;
                break;
            case LogLevel.INFO:
                nodeColor = this.nodeColors.info;
                break;
            case LogLevel.DEBUG:
                nodeColor = this.nodeColors.debug;
                break;
            default:
                nodeColor = "";
        }
        console.log(nodeColor + this.format(message, level) + this.nodeColors.reset);
    }

    getDateTime() {
        return new Date(Date.now() - this.tzOffset).toISOString().slice(0, -1);
    }
}
