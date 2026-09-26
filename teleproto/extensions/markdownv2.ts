import { Api } from "../tl";
import { HTMLParser } from "./html";

const delimiters: Record<string, string> = {
    "*": "b",
    "_": "i",
    "__": "u",
    "~": "s",
    "||": "tg-spoiler",
};

function readUntil(source: string, start: number, end: string, escapes?: string) {
    let value = "";
    for (let i = start; i < source.length; i++) {
        if (!escapes && source[i] === "`") {
            const marker = source.startsWith("```", i) ? "```" : "`";
            const code = readUntil(source, i + marker.length, marker, "\\`");
            if (code) {
                value += source.slice(i, code.end);
                i = code.end - 1;
                continue;
            }
        }
        if (source[i] === "\\" && i + 1 < source.length) {
            const next = source[i + 1];
            if (!escapes) {
                value += source.slice(i, i + 2);
                i++;
                continue;
            }
            if (escapes.includes(next)) {
                value += next;
                i++;
                continue;
            }
        }
        if (source.startsWith(end, i)) return { value, end: i + end.length };
        value += source[i];
    }
    return undefined;
}

function toHtml(source: string, links = true, quotes = true): string {
    const parts: string[] = [];
    const opened = new Map<string, number>();
    const escape = HTMLParser._escapeHtml;
    let i = 0;
    while (i < source.length) {
        const char = source[i];
        if (char === "\\" && source.charCodeAt(i + 1) >= 1 && source.charCodeAt(i + 1) <= 126) {
            parts.push(escape(source[i + 1]));
            i += 2;
            continue;
        }
        if (char === "\r") {
            i++;
            continue;
        }
        if (char === "`") {
            const marker = source.startsWith("```", i) ? "```" : "`";
            const code = readUntil(source, i + marker.length, marker, "\\`");
            if (code) {
                let body = code.value;
                let language = "";
                if (marker === "```") {
                    const header = /^([\w.+-]*)\r?\n/.exec(body);
                    if (header) {
                        language = header[1];
                        body = body.slice(header[0].length);
                    }
                }
                parts.push(marker === "`"
                    ? `<code>${escape(body)}</code>`
                    : `<pre><code class="language-${escape(language)}">${escape(body)}</code></pre>`);
                i = code.end;
                continue;
            }
        }
        if (quotes && (i === 0 || source[i - 1] === "\n") &&
            (char === ">" || source.startsWith("**>", i))) {
            const lines: string[] = [];
            let cursor = i + (char === ">" ? 0 : 2);
            while (source[cursor] === ">") {
                const newline = source.indexOf("\n", cursor);
                const end = newline < 0 ? source.length : newline;
                lines.push(source.slice(cursor + 1, end));
                cursor = end;
                if (newline < 0 || source[newline + 1] !== ">") break;
                cursor++;
            }
            let body = lines.join("\n");
            const suffix = /(\\*)\|\|$/.exec(body);
            let html = toHtml(body, links, false);
            const collapsed = !!suffix && suffix[1].length % 2 === 0 && html.endsWith("||");
            if (collapsed) body = body.slice(0, -2);
            if (collapsed) html = toHtml(body, links, false);
            parts.push(`<blockquote${collapsed ? " expandable" : ""}>${html}</blockquote>`);
            i = cursor;
            continue;
        }
        const emoji = source.startsWith("![", i);
        if (links && (char === "[" || emoji)) {
            const label = readUntil(source, i + (emoji ? 2 : 1), "]");
            const url = label && source[label.end] === "("
                ? readUntil(source, label.end + 1, ")", "\\)")
                : undefined;
            if (label && url) {
                const body = toHtml(label.value, false, false);
                const id = /^tg:\/\/emoji\?id=(\d+)$/.exec(url.value);
                if (emoji && id) {
                    parts.push(`<tg-emoji emoji-id="${id[1]}">${body}</tg-emoji>`);
                } else {
                    parts.push(`${emoji ? "!" : ""}<a href="${escape(url.value)}">${body}</a>`);
                }
                i = url.end;
                continue;
            }
        }
        const marker = source.startsWith("__", i) ? "__"
            : source.startsWith("||", i) ? "||" : char;
        if (source.startsWith("**", i) && source[i - 1] === "_" && source[i + 2] === "_") {
            i += 2;
            continue;
        }
        const tag = delimiters[marker];
        if (tag) {
            const at = opened.get(marker);
            if (at === undefined) {
                opened.set(marker, parts.length);
                parts.push(marker);
            } else {
                parts[at] = `<${tag}>`;
                parts.push(`</${tag}>`);
                opened.delete(marker);
            }
            i += marker.length;
            continue;
        }
        parts.push(escape(char));
        i++;
    }
    return parts.join("");
}

function escapeText(text: string): string {
    return text.replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

function escapeCode(text: string): string {
    return text.replace(/[\\`]/g, "\\$&");
}

function escapeUrl(url: string): string {
    return url.replace(/[\\)]/g, "\\$&");
}

interface EntityNode {
    entity: Api.TypeMessageEntity;
    children: EntityNode[];
}

function joinMarkup(left: string, right: string): string {
    return left + (left.endsWith("_") && right.startsWith("_") ? "**" : "") + right;
}

function render(text: string, start: number, end: number, nodes: EntityNode[]): string {
    let output = "";
    let cursor = start;
    for (const { entity, children } of nodes) {
        output = joinMarkup(output, escapeText(text.slice(cursor, entity.offset)));
        const raw = text.slice(entity.offset, entity.offset + entity.length);
        const body = render(text, entity.offset, entity.offset + entity.length, children);
        let value: string;
        const wrap = (marker: string) => joinMarkup(joinMarkup(marker, body), marker);
        switch (entity.className) {
            case "MessageEntityBold": value = wrap("*"); break;
            case "MessageEntityItalic": value = wrap("_"); break;
            case "MessageEntityUnderline": value = wrap("__"); break;
            case "MessageEntityStrike": value = wrap("~"); break;
            case "MessageEntitySpoiler": value = wrap("||"); break;
            case "MessageEntityCode": value = "`" + escapeCode(raw) + "`"; break;
            case "MessageEntityPre":
                value = "```" + (entity.language || "") + "\n" + escapeCode(raw) + "```";
                break;
            case "MessageEntityBlockquote":
                value = "**>" + body.replace(/\n/g, "\n>") + (entity.collapsed ? "||" : "");
                break;
            case "MessageEntityTextUrl": value = `[${body}](${escapeUrl(entity.url)})`; break;
            case "MessageEntityUrl": value = `[${body}](${escapeUrl(raw)})`; break;
            case "MessageEntityEmail": value = `[${body}](${escapeUrl("mailto:" + raw)})`; break;
            case "MessageEntityMentionName": value = `[${body}](tg://user?id=${entity.userId})`; break;
            case "MessageEntityCustomEmoji": value = `![${body}](tg://emoji?id=${entity.documentId})`; break;
            default: value = body;
        }
        output = joinMarkup(output, value);
        cursor = entity.offset + entity.length;
    }
    return joinMarkup(output, escapeText(text.slice(cursor, end)));
}

export class MarkdownV2Parser {
    /** Parses Telegram MarkdownV2 into text and UTF-16 entity ranges. */
    static parse(message: string): [string, Api.TypeMessageEntity[]] {
        const [text, entities] = HTMLParser.parse(toHtml(message));
        return [text, entities.filter((entity) => entity.length > 0)];
    }

    /** Serializes entities as MarkdownV2 with context-specific escaping. */
    static unparse(text: string, entities: Api.TypeMessageEntity[] | undefined): string {
        const roots: EntityNode[] = [];
        const stack: EntityNode[] = [];
        const sorted = [...(entities ?? [])].sort((a, b) =>
            a.offset - b.offset || b.length - a.length ||
            Number(b instanceof Api.MessageEntityBlockquote) - Number(a instanceof Api.MessageEntityBlockquote));
        for (const entity of sorted) {
            if (entity.length <= 0 || entity.offset < 0 || entity.offset + entity.length > text.length) continue;
            while (stack.length && entity.offset >= stack[stack.length - 1].entity.offset + stack[stack.length - 1].entity.length) {
                stack.pop();
            }
            const parent = stack[stack.length - 1];
            if (parent && entity.offset + entity.length > parent.entity.offset + parent.entity.length) continue;
            const node: EntityNode = { entity, children: [] };
            (parent ? parent.children : roots).push(node);
            stack.push(node);
        }
        return render(text, 0, text.length, roots);
    }
}
