function normalize(segments: string[], absolute: boolean): string[] {
    const result: string[] = [];
    for (const segment of segments) {
        if (!segment || segment === ".") continue;
        if (segment !== "..") result.push(segment);
        else if (result.length && result[result.length - 1] !== "..") result.pop();
        else if (!absolute) result.push("..");
    }
    return result;
}

export function isAbsolute(path: string): boolean {
    return path.startsWith("/");
}

export function resolve(...paths: string[]): string {
    let joined = "";
    for (let i = paths.length - 1; i >= 0 && !isAbsolute(joined); i--) {
        if (paths[i]) joined = joined ? `${paths[i]}/${joined}` : paths[i];
    }
    return "/" + normalize(joined.split("/"), true).join("/");
}

export function join(...paths: string[]): string {
    const joined = paths.filter(Boolean).join("/");
    if (!joined) return ".";
    const absolute = isAbsolute(joined);
    const body = normalize(joined.split("/"), absolute).join("/");
    const result = (absolute ? "/" : "") + body || ".";
    return joined.endsWith("/") && result !== "/" ? `${result}/` : result;
}

export function basename(path: string): string {
    const trimmed = path.replace(/\/+$/, "");
    return trimmed.slice(trimmed.lastIndexOf("/") + 1);
}
