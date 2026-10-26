export interface FileHandle {
    read(buffer: Uint8Array, offset: number, length: number, position: number): Promise<{ bytesRead: number }>;
    write(buffer: Uint8Array, offset: number, length: number, position: number): Promise<{ bytesWritten: number }>;
    close(): Promise<void>;
}

export interface FileStream {
    readonly path: string | Buffer;
    once(event: "error", listener: (error: Error) => void): unknown;
    end(callback: () => void): unknown;
    destroy(): unknown;
}

export interface FileSystem {
    open(path: string, flags: "r" | "w"): Promise<FileHandle>;
    readFile(path: string): Promise<Buffer>;
    size(path: string): Promise<number>;
    isFile(path: string): Promise<boolean>;
    isDirectory(path: string): boolean;
    exists(path: string): boolean;
    isFileStream(value: unknown): value is FileStream;
    resolve(...paths: string[]): string;
    join(...paths: string[]): string;
    basename(path: string): string;
    isAbsolute(path: string): boolean;
}
