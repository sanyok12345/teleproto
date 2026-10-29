const V4_SEGMENT = "(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])";
const V4 = `(?:${V4_SEGMENT}\\.){3}${V4_SEGMENT}`;
const V6_SEGMENT = "(?:[0-9a-fA-F]{1,4})";
const IPV4 = new RegExp(`^${V4}$`);
const IPV6 = new RegExp(
    "^(?:" +
    `(?:${V6_SEGMENT}:){7}(?:${V6_SEGMENT}|:)|` +
    `(?:${V6_SEGMENT}:){6}(?:${V4}|:${V6_SEGMENT}|:)|` +
    `(?:${V6_SEGMENT}:){5}(?::${V4}|(?::${V6_SEGMENT}){1,2}|:)|` +
    `(?:${V6_SEGMENT}:){4}(?:(?::${V6_SEGMENT}){0,1}:${V4}|(?::${V6_SEGMENT}){1,3}|:)|` +
    `(?:${V6_SEGMENT}:){3}(?:(?::${V6_SEGMENT}){0,2}:${V4}|(?::${V6_SEGMENT}){1,4}|:)|` +
    `(?:${V6_SEGMENT}:){2}(?:(?::${V6_SEGMENT}){0,3}:${V4}|(?::${V6_SEGMENT}){1,5}|:)|` +
    `(?:${V6_SEGMENT}:){1}(?:(?::${V6_SEGMENT}){0,4}:${V4}|(?::${V6_SEGMENT}){1,6}|:)|` +
    `(?::(?:(?::${V6_SEGMENT}){0,5}:${V4}|(?::${V6_SEGMENT}){1,7}|:))` +
    ")(?:%[0-9a-zA-Z-.:]{1,})?$"
);

export function isIP(host: string): number {
    if (IPV4.test(host)) return 4;
    if (IPV6.test(host)) return 6;
    return 0;
}
