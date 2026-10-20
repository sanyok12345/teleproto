import type { Api } from "../../tl";

export const DC_PORT = 443;

export const PROD_DC_IPV4: { readonly [id: number]: string } = {
    1: "149.154.175.50",
    2: "149.154.167.51",
    3: "149.154.175.100",
    4: "149.154.167.91",
    5: "149.154.171.5",
};

export const PROD_DC_IPV6: { readonly [id: number]: string } = {
    1: "2001:0b28:f23d:f001:0000:0000:0000:000a",
    2: "2001:067c:04e8:f002:0000:0000:0000:000a",
    3: "2001:0b28:f23d:f003:0000:0000:0000:000a",
    4: "2001:067c:04e8:f004:0000:0000:0000:000a",
    5: "2001:0b28:f23f:f005:0000:0000:0000:000a",
};

export const TEST_DC_IPV4: { readonly [id: number]: string } = {
    1: "149.154.175.10",
    2: "149.154.167.40",
    3: "149.154.175.117",
};

export const TEST_DC_IPV6: { readonly [id: number]: string } = {
    1: "2001:0b28:f23d:f001:0000:0000:0000:000e",
    2: "2001:067c:04e8:f002:0000:0000:0000:000e",
    3: "2001:0b28:f23d:f003:0000:0000:0000:000e",
};

export const WEBSOCKET_DC_HOSTS: { readonly [id: number]: string } = {
    1: "pluto",
    2: "venus",
    3: "aurora",
    4: "vesta",
    5: "flora",
};

export function webSocketDcAddress(dcId: number, mediaCluster = false): string | undefined {
    const host = WEBSOCKET_DC_HOSTS[dcId];
    return host ? `${host}${mediaCluster ? "-1" : ""}.web.telegram.org` : undefined;
}

export function isTestDcAddress(address: string): boolean | undefined {
    if (Object.values(TEST_DC_IPV4).includes(address) || Object.values(TEST_DC_IPV6).includes(address)) return true;
    if (Object.values(PROD_DC_IPV4).includes(address) || Object.values(PROD_DC_IPV6).includes(address)) return false;
    return undefined;
}

export interface DcAddress {
    id: number;
    ipAddress: string;
    port: number;
    mediaOnly?: boolean;
}

export interface DcAddressBookOptions {
    testServers: boolean;
    webSocket: boolean;
    proxied: boolean;
    ipv6: () => boolean;
}

export class DcAddressBook {
    private options: Api.TypeDcOption[] = [];
    private readonly failures = new Map<string, number>();

    constructor(private readonly env: DcAddressBookOptions) { }

    get hasConfig() {
        return this.options.length > 0;
    }

    setOptions(options: Api.TypeDcOption[]) {
        this.options = options;
    }

    seed(dcId: number, ipv6 = this.env.ipv6()): DcAddress | undefined {
        if (this.env.webSocket) {
            const host = webSocketDcAddress(dcId);
            return host ? { id: dcId, ipAddress: host, port: DC_PORT } : undefined;
        }
        const table = this.env.testServers ? (ipv6 ? TEST_DC_IPV6 : TEST_DC_IPV4) : ipv6 ? PROD_DC_IPV6 : PROD_DC_IPV4;
        const ipAddress = table[dcId];
        return ipAddress ? { id: dcId, ipAddress, port: DC_PORT } : undefined;
    }

    lookup(dcId: number, media = false): DcAddress | undefined {
        if (this.env.webSocket) {
            const host = webSocketDcAddress(dcId, media);
            return host ? { id: dcId, ipAddress: host, port: DC_PORT } : undefined;
        }
        const ipv6 = this.env.ipv6();
        let candidates = this.options
            .filter((option) => option.id === dcId && !option.cdn && !option.tcpoOnly && !option.secret?.length)
            .filter((option) => media || !option.mediaOnly)
            .sort((a, b) => Number(!!a.ipv6 !== ipv6) - Number(!!b.ipv6 !== ipv6));
        if (media && candidates.some((option) => option.mediaOnly)) candidates = candidates.filter((option) => option.mediaOnly);
        if (this.env.proxied && candidates.some((option) => option.static)) candidates = candidates.filter((option) => option.static);
        if (!candidates.length) return undefined;
        const chosen = candidates[this.failureCount(dcId, media) % candidates.length];
        return { id: chosen.id, ipAddress: chosen.ipAddress, port: chosen.port || DC_PORT, mediaOnly: !!chosen.mediaOnly };
    }

    isCdn(dcId: number): boolean {
        return this.options.some((option) => option.id === dcId && option.cdn);
    }

    cdn(dcId: number): DcAddress | undefined {
        const ipv6 = this.env.ipv6();
        const candidates = this.options
            .filter((option) => option.id === dcId && option.cdn)
            .sort((a, b) => Number(!!a.ipv6 !== ipv6) - Number(!!b.ipv6 !== ipv6));
        if (!candidates.length) return undefined;
        const chosen = candidates[this.failureCount(dcId, false) % candidates.length];
        return { id: chosen.id, ipAddress: chosen.ipAddress, port: chosen.port || DC_PORT };
    }

    resolve(dcId: number, media = false): DcAddress {
        const address = this.lookup(dcId, media) ?? this.seed(dcId);
        if (!address) throw new Error(`Cannot find the DC with the ID of ${dcId}`);
        return address;
    }

    next(dcId: number, current: string): DcAddress {
        const failures = this.fail(dcId, false);
        const fromConfig = this.lookup(dcId, false);
        if (fromConfig || this.env.webSocket) return fromConfig ?? this.resolve(dcId);
        const ipv6 = this.env.ipv6();
        const seeds = [current, this.seed(dcId, ipv6)?.ipAddress].filter(
            (ip, index, all): ip is string => !!ip && all.indexOf(ip) === index
        );
        return { id: dcId, ipAddress: seeds[failures % seeds.length], port: DC_PORT };
    }

    fail(dcId: number, media: boolean): number {
        const key = `${dcId}:${media}`;
        const failures = (this.failures.get(key) ?? 0) + 1;
        this.failures.set(key, failures);
        return failures;
    }

    private failureCount(dcId: number, media: boolean) {
        return this.failures.get(`${dcId}:${media}`) ?? 0;
    }
}
