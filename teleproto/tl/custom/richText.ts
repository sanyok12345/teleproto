import bigInt from "big-integer";
import { Api } from "../api";
import { Buffer } from "../../platform";
import { getInputUser } from "../../Utils";
import { returnBigInt } from "../../Helpers";

/** Rich text input: a string, a TL rich text object, or a list of them joined together. */
export type RichTextLike = string | Api.TypeRichTextIn | readonly RichTextLike[];

/** Media and users a rich message refers to by id. */
export type RichReference = Api.InputPhoto | Api.InputDocument | Api.InputUser;

/** Display options of {@link date}. */
export interface RichDateOptions {
    relative?: boolean;
    shortTime?: boolean;
    longTime?: boolean;
    shortDate?: boolean;
    longDate?: boolean;
    dayOfWeek?: boolean;
    /** Text shown by apps that cannot format the date. Defaults to the UTC date and time. */
    text?: RichTextLike;
}

const references = new WeakMap<object, RichReference[]>();

function withReference<T extends object>(value: T, reference: RichReference): T {
    references.set(value, [reference]);
    return value;
}

/** Joins the parts into one rich text: a string becomes plain text, several parts are concatenated. */
export function text(...parts: RichTextLike[]): Api.TypeRichText {
    const flat = parts.flatMap((part) => (Array.isArray(part) ? part : [part])) as Exclude<RichTextLike, readonly unknown[]>[];
    if (!flat.length) return new Api.TextEmpty();
    const texts = flat.map((part) => (typeof part === "string" ? new Api.TextPlain({ text: part }) : (part as Api.TypeRichText)));
    return texts.length === 1 ? texts[0] : new Api.TextConcat({ texts });
}

export function bold(...parts: RichTextLike[]): Api.TextBold {
    return new Api.TextBold({ text: text(...parts) });
}

export function italic(...parts: RichTextLike[]): Api.TextItalic {
    return new Api.TextItalic({ text: text(...parts) });
}

export function underline(...parts: RichTextLike[]): Api.TextUnderline {
    return new Api.TextUnderline({ text: text(...parts) });
}

export function strike(...parts: RichTextLike[]): Api.TextStrike {
    return new Api.TextStrike({ text: text(...parts) });
}

/** Monospace text. */
export function code(...parts: RichTextLike[]): Api.TextFixed {
    return new Api.TextFixed({ text: text(...parts) });
}

export function subscript(...parts: RichTextLike[]): Api.TextSubscript {
    return new Api.TextSubscript({ text: text(...parts) });
}

export function superscript(...parts: RichTextLike[]): Api.TextSuperscript {
    return new Api.TextSuperscript({ text: text(...parts) });
}

/** Highlighted text. */
export function marked(...parts: RichTextLike[]): Api.TextMarked {
    return new Api.TextMarked({ text: text(...parts) });
}

export function spoiler(...parts: RichTextLike[]): Api.TextSpoiler {
    return new Api.TextSpoiler({ text: text(...parts) });
}

export function link(label: RichTextLike, url: string): Api.TextUrl {
    return new Api.TextUrl({ text: text(label), url, webpageId: bigInt.zero });
}

export function email(label: RichTextLike, address: string): Api.TextEmail {
    return new Api.TextEmail({ text: text(label), email: address });
}

export function phone(label: RichTextLike, number: string): Api.TextPhone {
    return new Api.TextPhone({ text: text(label), phone: number });
}

/** @hidden */
export function inputUserOf(user: Api.TypeInputUser | Api.User): Api.InputUser {
    const input = user instanceof Api.User && user.accessHash
        ? new Api.InputUser({ userId: user.id, accessHash: user.accessHash })
        : getInputUser(user);
    if (!(input instanceof Api.InputUser)) throw new Error("A rich message can only refer to users with an id and access hash");
    return input;
}

/** A mention of `user` by id; the user is attached to the message for you. */
export function mention(label: RichTextLike, user: Api.TypeInputUser | Api.User): Api.TextMentionName {
    const input = inputUserOf(user);
    return withReference(new Api.TextMentionName({ text: text(label), userId: input.userId }), input);
}

/** A link target that `link(label, "#name")` can point to. */
export function anchor(label: RichTextLike, name: string): Api.TextAnchor {
    return new Api.TextAnchor({ text: text(label), name });
}

/** An inline TeX formula. */
export function math(source: string): Api.TextMath {
    return new Api.TextMath({ source });
}

/** A date each app formats for its reader. */
export function date(value: Date | number, options: RichDateOptions = {}): Api.TextDate {
    const when = typeof value === "number" ? new Date(value * 1000) : value;
    const { text: label, ...format } = options;
    return new Api.TextDate({
        ...format,
        text: text(label ?? when.toUTCString()),
        date: Math.floor(when.getTime() / 1000),
    });
}

export function customEmoji(documentId: bigInt.BigInteger | string, alt: string): Api.TextCustomEmoji {
    return new Api.TextCustomEmoji({ documentId: returnBigInt(documentId), alt });
}

/** @hidden */
export function referencesOf(value: unknown, found: RichReference[] = []): RichReference[] {
    if (!value || typeof value !== "object" || Buffer.isBuffer(value) || bigInt.isInstance(value) || value instanceof Date) return found;
    if (Array.isArray(value)) {
        for (const item of value) referencesOf(item, found);
        return found;
    }
    const own = references.get(value);
    if (own) found.push(...own);
    for (const field of Object.values(value)) referencesOf(field, found);
    return found;
}
