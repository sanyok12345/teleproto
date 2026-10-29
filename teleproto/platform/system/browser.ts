interface NavigatorInfo {
    userAgent?: string;
    platform?: string;
    userAgentData?: { platform?: string };
}

function navigatorInfo(): NavigatorInfo {
    return (globalThis as { navigator?: NavigatorInfo }).navigator ?? {};
}

export function deviceModel(): string {
    return navigatorInfo().userAgent ?? "";
}

export function systemVersion(): string {
    const info = navigatorInfo();
    return info.userAgentData?.platform || info.platform || "";
}
