import bigInt from "big-integer";
import { Api } from "../tl";
import { stripText } from "../Helpers";

interface OpenTag {
    readonly name: string;
    readonly start: number;
    readonly entity?: Api.TypeMessageEntity;
}

export class HTMLParser {
    static readonly _tag = /<(\/?)([a-z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
    static readonly _ref = /&(#x?[0-9a-f]+;?|[a-z][a-z0-9]*;?)/gi;
    static readonly _attr = /([a-z0-9-]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s/>]+))?/gi;
    static readonly _esc: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
    };

    static parse(html: string): [string, Api.TypeMessageEntity[]] {
        if (!html) {
            return [html, []];
        }

        const pieces: string[] = [];
        let length = 0;
        const entities: Api.TypeMessageEntity[] = [];
        const open: OpenTag[] = [];

        const append = (chunk: string): void => {
            if (chunk) {
                pieces.push(chunk);
                length += chunk.length;
            }
        };

        let cursor = 0;
        for (const match of html.matchAll(HTMLParser._tag)) {
            const at = match.index ?? 0;
            append(HTMLParser._decode(html.slice(cursor, at)));
            cursor = at + match[0].length;

            const [, slash, rawName, rawAttrs] = match;
            const name = rawName.toLowerCase();

            if (slash) {
                for (let i = open.length - 1; i >= 0; i--) {
                    if (open[i].name === name) {
                        const tag = open.splice(i, 1)[0];
                        if (tag.entity) {
                            tag.entity.length = length - tag.start;
                            entities.push(tag.entity);
                        }
                        break;
                    }
                }
                continue;
            }

            if (name === "br") {
                append("\n");
                continue;
            }
            if (rawAttrs.trimEnd().endsWith("/")) {
                continue;
            }

            const attrs = HTMLParser._readAttributes(rawAttrs);
            open.push({ name, start: length, entity: HTMLParser._entityFor(name, attrs, length, open) });
        }
        append(HTMLParser._decode(html.slice(cursor)));

        return [stripText(pieces.join(""), entities), entities];
    }

    static unparse(
        text: string,
        entities?: Api.TypeMessageEntity[],
        _offset?: number,
        _length?: number
    ): string {
        if (!text) {
            return text;
        }
        if (!entities?.length) {
            return HTMLParser._escapeHtml(text);
        }

        const marks = entities.flatMap((entity, order) => {
            const markup = HTMLParser._markupFor(entity, text);
            if (!markup) {
                return [];
            }
            const end = entity.offset + entity.length;
            return [
                { at: entity.offset, open: true, span: entity.length, order, html: markup[0] },
                { at: end, open: false, span: entity.length, order, html: markup[1] },
            ];
        });

        marks.sort((a, b) => {
            if (a.at !== b.at) return a.at - b.at;
            if (a.open !== b.open) return a.open ? 1 : -1;
            if (a.span !== b.span) return a.open ? b.span - a.span : a.span - b.span;
            return a.open ? a.order - b.order : b.order - a.order;
        });

        const out: string[] = [];
        let last = 0;
        for (const mark of marks) {
            if (mark.at > last) {
                out.push(HTMLParser._escapeHtml(text.slice(last, mark.at)));
                last = mark.at;
            }
            out.push(mark.html);
        }
        out.push(HTMLParser._escapeHtml(text.slice(last)));
        return out.join("");
    }

    static _decode(text: string): string {
        if (!text.includes("&")) {
            return text;
        }
        return text.replace(HTMLParser._ref, (whole, ref: string) => {
            if (ref[0] === "#") {
                const code =
                    ref[1] === "x" || ref[1] === "X"
                        ? parseInt(ref.slice(2), 16)
                        : parseInt(ref.slice(1), 10);
                return code <= 0x10ffff && (code < 0xd800 || code > 0xdfff)
                    ? String.fromCodePoint(code)
                    : whole;
            }
            return ENTITIES.get(ref) ?? whole;
        });
    }

    static _escapeHtml(text: string): string {
        return text.replace(/[&<>"']/g, (c) => HTMLParser._esc[c]);
    }

    static _readAttributes(source: string): Record<string, string> {
        const attrs: Record<string, string> = {};
        for (const m of source.matchAll(HTMLParser._attr)) {
            const raw = m[2] ?? "";
            const value = raw[0] === '"' || raw[0] === "'" ? raw.slice(1, -1) : raw;
            attrs[m[1].toLowerCase()] = HTMLParser._decode(value);
        }
        return attrs;
    }

    static _entityFor(
        name: string,
        attrs: Record<string, string>,
        offset: number,
        stack: OpenTag[]
    ): Api.TypeMessageEntity | undefined {
        switch (name) {
            case "b":
            case "strong":
                return new Api.MessageEntityBold({ offset, length: 0 });
            case "i":
            case "em":
                return new Api.MessageEntityItalic({ offset, length: 0 });
            case "u":
                return new Api.MessageEntityUnderline({ offset, length: 0 });
            case "s":
            case "del":
                return new Api.MessageEntityStrike({ offset, length: 0 });
            case "spoiler":
                return new Api.MessageEntitySpoiler({ offset, length: 0 });
            case "blockquote":
                return new Api.MessageEntityBlockquote(
                    attrs.expandable !== undefined
                        ? { offset, length: 0, collapsed: true }
                        : { offset, length: 0 }
                );
            case "pre":
                return new Api.MessageEntityPre({ offset, length: 0, language: "" });
            case "code": {
                const pre = stack.find((t) => t.entity instanceof Api.MessageEntityPre);
                if (pre) {
                    const cls = attrs.class;
                    if (cls?.startsWith("language-")) {
                        (pre.entity as Api.MessageEntityPre).language = cls.slice("language-".length);
                    }
                    return undefined;
                }
                return new Api.MessageEntityCode({ offset, length: 0 });
            }
            case "a": {
                const href = attrs.href;
                if (!href) {
                    return undefined;
                }
                if (href.startsWith("mailto:")) {
                    return new Api.MessageEntityEmail({ offset, length: 0 });
                }
                const mention = href.match(/^tg:\/\/user\?id=(\d+)/);
                if (mention) {
                    return new Api.MessageEntityMentionName({
                        offset,
                        length: 0,
                        userId: bigInt(mention[1]),
                    });
                }
                return new Api.MessageEntityTextUrl({ offset, length: 0, url: href });
            }
            case "tg-emoji":
                return new Api.MessageEntityCustomEmoji({
                    offset,
                    length: 0,
                    documentId: bigInt(attrs["emoji-id"] || "0"),
                });
            case "tg-date":
                return new Api.MessageEntityFormattedDate({
                    offset,
                    length: 0,
                    date: parseInt(attrs.timestamp ?? "0", 10) || 0,
                    relative: attrs.relative !== undefined,
                    shortTime: attrs["short-time"] !== undefined,
                    longTime: attrs["long-time"] !== undefined,
                    shortDate: attrs["short-date"] !== undefined,
                    longDate: attrs["long-date"] !== undefined,
                    dayOfWeek: attrs["day-of-week"] !== undefined,
                });
            default:
                return undefined;
        }
    }

    static _markupFor(
        entity: Api.TypeMessageEntity,
        text: string
    ): readonly [string, string] | null {
        const body = (): string =>
            HTMLParser._escapeHtml(text.slice(entity.offset, entity.offset + entity.length));
        switch (entity.className) {
            case "MessageEntityBold":
                return ["<strong>", "</strong>"];
            case "MessageEntitySpoiler":
                return ["<spoiler>", "</spoiler>"];
            case "MessageEntityItalic":
                return ["<em>", "</em>"];
            case "MessageEntityCode":
                return ["<code>", "</code>"];
            case "MessageEntityUnderline":
                return ["<u>", "</u>"];
            case "MessageEntityStrike":
                return ["<del>", "</del>"];
            case "MessageEntityBlockquote":
                return ["<blockquote>", "</blockquote>"];
            case "MessageEntityPre":
                return entity.language
                    ? [`<pre><code class="language-${HTMLParser._escapeHtml(entity.language)}">`, "</code></pre>"]
                    : ["<pre>", "</pre>"];
            case "MessageEntityEmail":
                return [`<a href="mailto:${body()}">`, "</a>"];
            case "MessageEntityUrl":
                return [`<a href="${body()}">`, "</a>"];
            case "MessageEntityTextUrl":
                return [`<a href="${HTMLParser._escapeHtml(entity.url)}">`, "</a>"];
            case "MessageEntityMentionName":
                return [`<a href="tg://user?id=${entity.userId}">`, "</a>"];
            case "MessageEntityCustomEmoji":
                return [`<tg-emoji emoji-id="${entity.documentId}">`, "</tg-emoji>"];
            case "MessageEntityFormattedDate": {
                const flags = [
                    entity.relative && "relative",
                    entity.shortTime && "short-time",
                    entity.longTime && "long-time",
                    entity.shortDate && "short-date",
                    entity.longDate && "long-date",
                    entity.dayOfWeek && "day-of-week",
                ]
                    .filter(Boolean)
                    .join(" ");
                return [`<tg-date timestamp="${entity.date}"${flags ? " " + flags : ""}>`, "</tg-date>"];
            }
            default:
                return null;
        }
    }
}

const ENTITIES = new Map<string, string>(Object.entries({
    "AElig": "Æ", "AElig;": "Æ", "AMP": "&", "AMP;": "&", "Aacute": "Á", "Aacute;": "Á",
    "Abreve;": "Ă", "Acirc": "Â", "Acirc;": "Â", "Acy;": "А", "Afr;": "𝔄", "Agrave": "À",
    "Agrave;": "À", "Alpha;": "Α", "Amacr;": "Ā", "And;": "⩓", "Aogon;": "Ą", "Aopf;": "𝔸",
    "ApplyFunction;": "⁡", "Aring": "Å", "Aring;": "Å", "Ascr;": "𝒜", "Assign;": "≔",
    "Atilde": "Ã", "Atilde;": "Ã", "Auml": "Ä", "Auml;": "Ä", "Backslash;": "∖", "Barv;": "⫧",
    "Barwed;": "⌆", "Bcy;": "Б", "Because;": "∵", "Bernoullis;": "ℬ", "Beta;": "Β",
    "Bfr;": "𝔅", "Bopf;": "𝔹", "Breve;": "˘", "Bscr;": "ℬ", "Bumpeq;": "≎", "CHcy;": "Ч",
    "COPY": "©", "COPY;": "©", "Cacute;": "Ć", "Cap;": "⋒", "CapitalDifferentialD;": "ⅅ",
    "Cayleys;": "ℭ", "Ccaron;": "Č", "Ccedil": "Ç", "Ccedil;": "Ç", "Ccirc;": "Ĉ",
    "Cconint;": "∰", "Cdot;": "Ċ", "Cedilla;": "¸", "CenterDot;": "·", "Cfr;": "ℭ",
    "Chi;": "Χ", "CircleDot;": "⊙", "CircleMinus;": "⊖", "CirclePlus;": "⊕",
    "CircleTimes;": "⊗", "ClockwiseContourIntegral;": "∲", "CloseCurlyDoubleQuote;": "”",
    "CloseCurlyQuote;": "’", "Colon;": "∷", "Colone;": "⩴", "Congruent;": "≡", "Conint;": "∯",
    "ContourIntegral;": "∮", "Copf;": "ℂ", "Coproduct;": "∐",
    "CounterClockwiseContourIntegral;": "∳", "Cross;": "⨯", "Cscr;": "𝒞", "Cup;": "⋓",
    "CupCap;": "≍", "DD;": "ⅅ", "DDotrahd;": "⤑", "DJcy;": "Ђ", "DScy;": "Ѕ", "DZcy;": "Џ",
    "Dagger;": "‡", "Darr;": "↡", "Dashv;": "⫤", "Dcaron;": "Ď", "Dcy;": "Д", "Del;": "∇",
    "Delta;": "Δ", "Dfr;": "𝔇", "DiacriticalAcute;": "´", "DiacriticalDot;": "˙",
    "DiacriticalDoubleAcute;": "˝", "DiacriticalGrave;": "`", "DiacriticalTilde;": "˜",
    "Diamond;": "⋄", "DifferentialD;": "ⅆ", "Dopf;": "𝔻", "Dot;": "¨", "DotDot;": "⃜",
    "DotEqual;": "≐", "DoubleContourIntegral;": "∯", "DoubleDot;": "¨",
    "DoubleDownArrow;": "⇓", "DoubleLeftArrow;": "⇐", "DoubleLeftRightArrow;": "⇔",
    "DoubleLeftTee;": "⫤", "DoubleLongLeftArrow;": "⟸", "DoubleLongLeftRightArrow;": "⟺",
    "DoubleLongRightArrow;": "⟹", "DoubleRightArrow;": "⇒", "DoubleRightTee;": "⊨",
    "DoubleUpArrow;": "⇑", "DoubleUpDownArrow;": "⇕", "DoubleVerticalBar;": "∥",
    "DownArrow;": "↓", "DownArrowBar;": "⤓", "DownArrowUpArrow;": "⇵", "DownBreve;": "̑",
    "DownLeftRightVector;": "⥐", "DownLeftTeeVector;": "⥞", "DownLeftVector;": "↽",
    "DownLeftVectorBar;": "⥖", "DownRightTeeVector;": "⥟", "DownRightVector;": "⇁",
    "DownRightVectorBar;": "⥗", "DownTee;": "⊤", "DownTeeArrow;": "↧", "Downarrow;": "⇓",
    "Dscr;": "𝒟", "Dstrok;": "Đ", "ENG;": "Ŋ", "ETH": "Ð", "ETH;": "Ð", "Eacute": "É",
    "Eacute;": "É", "Ecaron;": "Ě", "Ecirc": "Ê", "Ecirc;": "Ê", "Ecy;": "Э", "Edot;": "Ė",
    "Efr;": "𝔈", "Egrave": "È", "Egrave;": "È", "Element;": "∈", "Emacr;": "Ē",
    "EmptySmallSquare;": "◻", "EmptyVerySmallSquare;": "▫", "Eogon;": "Ę", "Eopf;": "𝔼",
    "Epsilon;": "Ε", "Equal;": "⩵", "EqualTilde;": "≂", "Equilibrium;": "⇌", "Escr;": "ℰ",
    "Esim;": "⩳", "Eta;": "Η", "Euml": "Ë", "Euml;": "Ë", "Exists;": "∃", "ExponentialE;": "ⅇ",
    "Fcy;": "Ф", "Ffr;": "𝔉", "FilledSmallSquare;": "◼", "FilledVerySmallSquare;": "▪",
    "Fopf;": "𝔽", "ForAll;": "∀", "Fouriertrf;": "ℱ", "Fscr;": "ℱ", "GJcy;": "Ѓ", "GT": ">",
    "GT;": ">", "Gamma;": "Γ", "Gammad;": "Ϝ", "Gbreve;": "Ğ", "Gcedil;": "Ģ", "Gcirc;": "Ĝ",
    "Gcy;": "Г", "Gdot;": "Ġ", "Gfr;": "𝔊", "Gg;": "⋙", "Gopf;": "𝔾", "GreaterEqual;": "≥",
    "GreaterEqualLess;": "⋛", "GreaterFullEqual;": "≧", "GreaterGreater;": "⪢",
    "GreaterLess;": "≷", "GreaterSlantEqual;": "⩾", "GreaterTilde;": "≳", "Gscr;": "𝒢",
    "Gt;": "≫", "HARDcy;": "Ъ", "Hacek;": "ˇ", "Hat;": "^", "Hcirc;": "Ĥ", "Hfr;": "ℌ",
    "HilbertSpace;": "ℋ", "Hopf;": "ℍ", "HorizontalLine;": "─", "Hscr;": "ℋ", "Hstrok;": "Ħ",
    "HumpDownHump;": "≎", "HumpEqual;": "≏", "IEcy;": "Е", "IJlig;": "Ĳ", "IOcy;": "Ё",
    "Iacute": "Í", "Iacute;": "Í", "Icirc": "Î", "Icirc;": "Î", "Icy;": "И", "Idot;": "İ",
    "Ifr;": "ℑ", "Igrave": "Ì", "Igrave;": "Ì", "Im;": "ℑ", "Imacr;": "Ī", "ImaginaryI;": "ⅈ",
    "Implies;": "⇒", "Int;": "∬", "Integral;": "∫", "Intersection;": "⋂",
    "InvisibleComma;": "⁣", "InvisibleTimes;": "⁢", "Iogon;": "Į", "Iopf;": "𝕀", "Iota;": "Ι",
    "Iscr;": "ℐ", "Itilde;": "Ĩ", "Iukcy;": "І", "Iuml": "Ï", "Iuml;": "Ï", "Jcirc;": "Ĵ",
    "Jcy;": "Й", "Jfr;": "𝔍", "Jopf;": "𝕁", "Jscr;": "𝒥", "Jsercy;": "Ј", "Jukcy;": "Є",
    "KHcy;": "Х", "KJcy;": "Ќ", "Kappa;": "Κ", "Kcedil;": "Ķ", "Kcy;": "К", "Kfr;": "𝔎",
    "Kopf;": "𝕂", "Kscr;": "𝒦", "LJcy;": "Љ", "LT": "<", "LT;": "<", "Lacute;": "Ĺ",
    "Lambda;": "Λ", "Lang;": "⟪", "Laplacetrf;": "ℒ", "Larr;": "↞", "Lcaron;": "Ľ",
    "Lcedil;": "Ļ", "Lcy;": "Л", "LeftAngleBracket;": "⟨", "LeftArrow;": "←",
    "LeftArrowBar;": "⇤", "LeftArrowRightArrow;": "⇆", "LeftCeiling;": "⌈",
    "LeftDoubleBracket;": "⟦", "LeftDownTeeVector;": "⥡", "LeftDownVector;": "⇃",
    "LeftDownVectorBar;": "⥙", "LeftFloor;": "⌊", "LeftRightArrow;": "↔",
    "LeftRightVector;": "⥎", "LeftTee;": "⊣", "LeftTeeArrow;": "↤", "LeftTeeVector;": "⥚",
    "LeftTriangle;": "⊲", "LeftTriangleBar;": "⧏", "LeftTriangleEqual;": "⊴",
    "LeftUpDownVector;": "⥑", "LeftUpTeeVector;": "⥠", "LeftUpVector;": "↿",
    "LeftUpVectorBar;": "⥘", "LeftVector;": "↼", "LeftVectorBar;": "⥒", "Leftarrow;": "⇐",
    "Leftrightarrow;": "⇔", "LessEqualGreater;": "⋚", "LessFullEqual;": "≦",
    "LessGreater;": "≶", "LessLess;": "⪡", "LessSlantEqual;": "⩽", "LessTilde;": "≲",
    "Lfr;": "𝔏", "Ll;": "⋘", "Lleftarrow;": "⇚", "Lmidot;": "Ŀ", "LongLeftArrow;": "⟵",
    "LongLeftRightArrow;": "⟷", "LongRightArrow;": "⟶", "Longleftarrow;": "⟸",
    "Longleftrightarrow;": "⟺", "Longrightarrow;": "⟹", "Lopf;": "𝕃", "LowerLeftArrow;": "↙",
    "LowerRightArrow;": "↘", "Lscr;": "ℒ", "Lsh;": "↰", "Lstrok;": "Ł", "Lt;": "≪",
    "Map;": "⤅", "Mcy;": "М", "MediumSpace;": " ", "Mellintrf;": "ℳ", "Mfr;": "𝔐",
    "MinusPlus;": "∓", "Mopf;": "𝕄", "Mscr;": "ℳ", "Mu;": "Μ", "NJcy;": "Њ", "Nacute;": "Ń",
    "Ncaron;": "Ň", "Ncedil;": "Ņ", "Ncy;": "Н", "NegativeMediumSpace;": "​",
    "NegativeThickSpace;": "​", "NegativeThinSpace;": "​", "NegativeVeryThinSpace;": "​",
    "NestedGreaterGreater;": "≫", "NestedLessLess;": "≪", "NewLine;": "\n", "Nfr;": "𝔑",
    "NoBreak;": "⁠", "NonBreakingSpace;": " ", "Nopf;": "ℕ", "Not;": "⫬", "NotCongruent;": "≢",
    "NotCupCap;": "≭", "NotDoubleVerticalBar;": "∦", "NotElement;": "∉", "NotEqual;": "≠",
    "NotEqualTilde;": "≂̸", "NotExists;": "∄", "NotGreater;": "≯", "NotGreaterEqual;": "≱",
    "NotGreaterFullEqual;": "≧̸", "NotGreaterGreater;": "≫̸", "NotGreaterLess;": "≹",
    "NotGreaterSlantEqual;": "⩾̸", "NotGreaterTilde;": "≵", "NotHumpDownHump;": "≎̸",
    "NotHumpEqual;": "≏̸", "NotLeftTriangle;": "⋪", "NotLeftTriangleBar;": "⧏̸",
    "NotLeftTriangleEqual;": "⋬", "NotLess;": "≮", "NotLessEqual;": "≰",
    "NotLessGreater;": "≸", "NotLessLess;": "≪̸", "NotLessSlantEqual;": "⩽̸",
    "NotLessTilde;": "≴", "NotNestedGreaterGreater;": "⪢̸", "NotNestedLessLess;": "⪡̸",
    "NotPrecedes;": "⊀", "NotPrecedesEqual;": "⪯̸", "NotPrecedesSlantEqual;": "⋠",
    "NotReverseElement;": "∌", "NotRightTriangle;": "⋫", "NotRightTriangleBar;": "⧐̸",
    "NotRightTriangleEqual;": "⋭", "NotSquareSubset;": "⊏̸", "NotSquareSubsetEqual;": "⋢",
    "NotSquareSuperset;": "⊐̸", "NotSquareSupersetEqual;": "⋣", "NotSubset;": "⊂⃒",
    "NotSubsetEqual;": "⊈", "NotSucceeds;": "⊁", "NotSucceedsEqual;": "⪰̸",
    "NotSucceedsSlantEqual;": "⋡", "NotSucceedsTilde;": "≿̸", "NotSuperset;": "⊃⃒",
    "NotSupersetEqual;": "⊉", "NotTilde;": "≁", "NotTildeEqual;": "≄",
    "NotTildeFullEqual;": "≇", "NotTildeTilde;": "≉", "NotVerticalBar;": "∤", "Nscr;": "𝒩",
    "Ntilde": "Ñ", "Ntilde;": "Ñ", "Nu;": "Ν", "OElig;": "Œ", "Oacute": "Ó", "Oacute;": "Ó",
    "Ocirc": "Ô", "Ocirc;": "Ô", "Ocy;": "О", "Odblac;": "Ő", "Ofr;": "𝔒", "Ograve": "Ò",
    "Ograve;": "Ò", "Omacr;": "Ō", "Omega;": "Ω", "Omicron;": "Ο", "Oopf;": "𝕆",
    "OpenCurlyDoubleQuote;": "“", "OpenCurlyQuote;": "‘", "Or;": "⩔", "Oscr;": "𝒪",
    "Oslash": "Ø", "Oslash;": "Ø", "Otilde": "Õ", "Otilde;": "Õ", "Otimes;": "⨷", "Ouml": "Ö",
    "Ouml;": "Ö", "OverBar;": "‾", "OverBrace;": "⏞", "OverBracket;": "⎴",
    "OverParenthesis;": "⏜", "PartialD;": "∂", "Pcy;": "П", "Pfr;": "𝔓", "Phi;": "Φ",
    "Pi;": "Π", "PlusMinus;": "±", "Poincareplane;": "ℌ", "Popf;": "ℙ", "Pr;": "⪻",
    "Precedes;": "≺", "PrecedesEqual;": "⪯", "PrecedesSlantEqual;": "≼", "PrecedesTilde;": "≾",
    "Prime;": "″", "Product;": "∏", "Proportion;": "∷", "Proportional;": "∝", "Pscr;": "𝒫",
    "Psi;": "Ψ", "QUOT": "\"", "QUOT;": "\"", "Qfr;": "𝔔", "Qopf;": "ℚ", "Qscr;": "𝒬",
    "RBarr;": "⤐", "REG": "®", "REG;": "®", "Racute;": "Ŕ", "Rang;": "⟫", "Rarr;": "↠",
    "Rarrtl;": "⤖", "Rcaron;": "Ř", "Rcedil;": "Ŗ", "Rcy;": "Р", "Re;": "ℜ",
    "ReverseElement;": "∋", "ReverseEquilibrium;": "⇋", "ReverseUpEquilibrium;": "⥯",
    "Rfr;": "ℜ", "Rho;": "Ρ", "RightAngleBracket;": "⟩", "RightArrow;": "→",
    "RightArrowBar;": "⇥", "RightArrowLeftArrow;": "⇄", "RightCeiling;": "⌉",
    "RightDoubleBracket;": "⟧", "RightDownTeeVector;": "⥝", "RightDownVector;": "⇂",
    "RightDownVectorBar;": "⥕", "RightFloor;": "⌋", "RightTee;": "⊢", "RightTeeArrow;": "↦",
    "RightTeeVector;": "⥛", "RightTriangle;": "⊳", "RightTriangleBar;": "⧐",
    "RightTriangleEqual;": "⊵", "RightUpDownVector;": "⥏", "RightUpTeeVector;": "⥜",
    "RightUpVector;": "↾", "RightUpVectorBar;": "⥔", "RightVector;": "⇀",
    "RightVectorBar;": "⥓", "Rightarrow;": "⇒", "Ropf;": "ℝ", "RoundImplies;": "⥰",
    "Rrightarrow;": "⇛", "Rscr;": "ℛ", "Rsh;": "↱", "RuleDelayed;": "⧴", "SHCHcy;": "Щ",
    "SHcy;": "Ш", "SOFTcy;": "Ь", "Sacute;": "Ś", "Sc;": "⪼", "Scaron;": "Š", "Scedil;": "Ş",
    "Scirc;": "Ŝ", "Scy;": "С", "Sfr;": "𝔖", "ShortDownArrow;": "↓", "ShortLeftArrow;": "←",
    "ShortRightArrow;": "→", "ShortUpArrow;": "↑", "Sigma;": "Σ", "SmallCircle;": "∘",
    "Sopf;": "𝕊", "Sqrt;": "√", "Square;": "□", "SquareIntersection;": "⊓",
    "SquareSubset;": "⊏", "SquareSubsetEqual;": "⊑", "SquareSuperset;": "⊐",
    "SquareSupersetEqual;": "⊒", "SquareUnion;": "⊔", "Sscr;": "𝒮", "Star;": "⋆", "Sub;": "⋐",
    "Subset;": "⋐", "SubsetEqual;": "⊆", "Succeeds;": "≻", "SucceedsEqual;": "⪰",
    "SucceedsSlantEqual;": "≽", "SucceedsTilde;": "≿", "SuchThat;": "∋", "Sum;": "∑",
    "Sup;": "⋑", "Superset;": "⊃", "SupersetEqual;": "⊇", "Supset;": "⋑", "THORN": "Þ",
    "THORN;": "Þ", "TRADE;": "™", "TSHcy;": "Ћ", "TScy;": "Ц", "Tab;": "\t", "Tau;": "Τ",
    "Tcaron;": "Ť", "Tcedil;": "Ţ", "Tcy;": "Т", "Tfr;": "𝔗", "Therefore;": "∴",
    "Theta;": "Θ", "ThickSpace;": "  ", "ThinSpace;": " ", "Tilde;": "∼", "TildeEqual;": "≃",
    "TildeFullEqual;": "≅", "TildeTilde;": "≈", "Topf;": "𝕋", "TripleDot;": "⃛",
    "Tscr;": "𝒯", "Tstrok;": "Ŧ", "Uacute": "Ú", "Uacute;": "Ú", "Uarr;": "↟",
    "Uarrocir;": "⥉", "Ubrcy;": "Ў", "Ubreve;": "Ŭ", "Ucirc": "Û", "Ucirc;": "Û", "Ucy;": "У",
    "Udblac;": "Ű", "Ufr;": "𝔘", "Ugrave": "Ù", "Ugrave;": "Ù", "Umacr;": "Ū",
    "UnderBar;": "_", "UnderBrace;": "⏟", "UnderBracket;": "⎵", "UnderParenthesis;": "⏝",
    "Union;": "⋃", "UnionPlus;": "⊎", "Uogon;": "Ų", "Uopf;": "𝕌", "UpArrow;": "↑",
    "UpArrowBar;": "⤒", "UpArrowDownArrow;": "⇅", "UpDownArrow;": "↕", "UpEquilibrium;": "⥮",
    "UpTee;": "⊥", "UpTeeArrow;": "↥", "Uparrow;": "⇑", "Updownarrow;": "⇕",
    "UpperLeftArrow;": "↖", "UpperRightArrow;": "↗", "Upsi;": "ϒ", "Upsilon;": "Υ",
    "Uring;": "Ů", "Uscr;": "𝒰", "Utilde;": "Ũ", "Uuml": "Ü", "Uuml;": "Ü", "VDash;": "⊫",
    "Vbar;": "⫫", "Vcy;": "В", "Vdash;": "⊩", "Vdashl;": "⫦", "Vee;": "⋁", "Verbar;": "‖",
    "Vert;": "‖", "VerticalBar;": "∣", "VerticalLine;": "|", "VerticalSeparator;": "❘",
    "VerticalTilde;": "≀", "VeryThinSpace;": " ", "Vfr;": "𝔙", "Vopf;": "𝕍", "Vscr;": "𝒱",
    "Vvdash;": "⊪", "Wcirc;": "Ŵ", "Wedge;": "⋀", "Wfr;": "𝔚", "Wopf;": "𝕎", "Wscr;": "𝒲",
    "Xfr;": "𝔛", "Xi;": "Ξ", "Xopf;": "𝕏", "Xscr;": "𝒳", "YAcy;": "Я", "YIcy;": "Ї",
    "YUcy;": "Ю", "Yacute": "Ý", "Yacute;": "Ý", "Ycirc;": "Ŷ", "Ycy;": "Ы", "Yfr;": "𝔜",
    "Yopf;": "𝕐", "Yscr;": "𝒴", "Yuml;": "Ÿ", "ZHcy;": "Ж", "Zacute;": "Ź", "Zcaron;": "Ž",
    "Zcy;": "З", "Zdot;": "Ż", "ZeroWidthSpace;": "​", "Zeta;": "Ζ", "Zfr;": "ℨ", "Zopf;": "ℤ",
    "Zscr;": "𝒵", "aacute": "á", "aacute;": "á", "abreve;": "ă", "ac;": "∾", "acE;": "∾̳",
    "acd;": "∿", "acirc": "â", "acirc;": "â", "acute": "´", "acute;": "´", "acy;": "а",
    "aelig": "æ", "aelig;": "æ", "af;": "⁡", "afr;": "𝔞", "agrave": "à", "agrave;": "à",
    "alefsym;": "ℵ", "aleph;": "ℵ", "alpha;": "α", "amacr;": "ā", "amalg;": "⨿", "amp": "&",
    "amp;": "&", "and;": "∧", "andand;": "⩕", "andd;": "⩜", "andslope;": "⩘", "andv;": "⩚",
    "ang;": "∠", "ange;": "⦤", "angle;": "∠", "angmsd;": "∡", "angmsdaa;": "⦨",
    "angmsdab;": "⦩", "angmsdac;": "⦪", "angmsdad;": "⦫", "angmsdae;": "⦬", "angmsdaf;": "⦭",
    "angmsdag;": "⦮", "angmsdah;": "⦯", "angrt;": "∟", "angrtvb;": "⊾", "angrtvbd;": "⦝",
    "angsph;": "∢", "angst;": "Å", "angzarr;": "⍼", "aogon;": "ą", "aopf;": "𝕒", "ap;": "≈",
    "apE;": "⩰", "apacir;": "⩯", "ape;": "≊", "apid;": "≋", "apos;": "'", "approx;": "≈",
    "approxeq;": "≊", "aring": "å", "aring;": "å", "ascr;": "𝒶", "ast;": "*", "asymp;": "≈",
    "asympeq;": "≍", "atilde": "ã", "atilde;": "ã", "auml": "ä", "auml;": "ä",
    "awconint;": "∳", "awint;": "⨑", "bNot;": "⫭", "backcong;": "≌", "backepsilon;": "϶",
    "backprime;": "‵", "backsim;": "∽", "backsimeq;": "⋍", "barvee;": "⊽", "barwed;": "⌅",
    "barwedge;": "⌅", "bbrk;": "⎵", "bbrktbrk;": "⎶", "bcong;": "≌", "bcy;": "б",
    "bdquo;": "„", "becaus;": "∵", "because;": "∵", "bemptyv;": "⦰", "bepsi;": "϶",
    "bernou;": "ℬ", "beta;": "β", "beth;": "ℶ", "between;": "≬", "bfr;": "𝔟", "bigcap;": "⋂",
    "bigcirc;": "◯", "bigcup;": "⋃", "bigodot;": "⨀", "bigoplus;": "⨁", "bigotimes;": "⨂",
    "bigsqcup;": "⨆", "bigstar;": "★", "bigtriangledown;": "▽", "bigtriangleup;": "△",
    "biguplus;": "⨄", "bigvee;": "⋁", "bigwedge;": "⋀", "bkarow;": "⤍", "blacklozenge;": "⧫",
    "blacksquare;": "▪", "blacktriangle;": "▴", "blacktriangledown;": "▾",
    "blacktriangleleft;": "◂", "blacktriangleright;": "▸", "blank;": "␣", "blk12;": "▒",
    "blk14;": "░", "blk34;": "▓", "block;": "█", "bne;": "=⃥", "bnequiv;": "≡⃥", "bnot;": "⌐",
    "bopf;": "𝕓", "bot;": "⊥", "bottom;": "⊥", "bowtie;": "⋈", "boxDL;": "╗", "boxDR;": "╔",
    "boxDl;": "╖", "boxDr;": "╓", "boxH;": "═", "boxHD;": "╦", "boxHU;": "╩", "boxHd;": "╤",
    "boxHu;": "╧", "boxUL;": "╝", "boxUR;": "╚", "boxUl;": "╜", "boxUr;": "╙", "boxV;": "║",
    "boxVH;": "╬", "boxVL;": "╣", "boxVR;": "╠", "boxVh;": "╫", "boxVl;": "╢", "boxVr;": "╟",
    "boxbox;": "⧉", "boxdL;": "╕", "boxdR;": "╒", "boxdl;": "┐", "boxdr;": "┌", "boxh;": "─",
    "boxhD;": "╥", "boxhU;": "╨", "boxhd;": "┬", "boxhu;": "┴", "boxminus;": "⊟",
    "boxplus;": "⊞", "boxtimes;": "⊠", "boxuL;": "╛", "boxuR;": "╘", "boxul;": "┘",
    "boxur;": "└", "boxv;": "│", "boxvH;": "╪", "boxvL;": "╡", "boxvR;": "╞", "boxvh;": "┼",
    "boxvl;": "┤", "boxvr;": "├", "bprime;": "‵", "breve;": "˘", "brvbar": "¦", "brvbar;": "¦",
    "bscr;": "𝒷", "bsemi;": "⁏", "bsim;": "∽", "bsime;": "⋍", "bsol;": "\\", "bsolb;": "⧅",
    "bsolhsub;": "⟈", "bull;": "•", "bullet;": "•", "bump;": "≎", "bumpE;": "⪮", "bumpe;": "≏",
    "bumpeq;": "≏", "cacute;": "ć", "cap;": "∩", "capand;": "⩄", "capbrcup;": "⩉",
    "capcap;": "⩋", "capcup;": "⩇", "capdot;": "⩀", "caps;": "∩︀", "caret;": "⁁",
    "caron;": "ˇ", "ccaps;": "⩍", "ccaron;": "č", "ccedil": "ç", "ccedil;": "ç", "ccirc;": "ĉ",
    "ccups;": "⩌", "ccupssm;": "⩐", "cdot;": "ċ", "cedil": "¸", "cedil;": "¸", "cemptyv;": "⦲",
    "cent": "¢", "cent;": "¢", "centerdot;": "·", "cfr;": "𝔠", "chcy;": "ч", "check;": "✓",
    "checkmark;": "✓", "chi;": "χ", "cir;": "○", "cirE;": "⧃", "circ;": "ˆ", "circeq;": "≗",
    "circlearrowleft;": "↺", "circlearrowright;": "↻", "circledR;": "®", "circledS;": "Ⓢ",
    "circledast;": "⊛", "circledcirc;": "⊚", "circleddash;": "⊝", "cire;": "≗",
    "cirfnint;": "⨐", "cirmid;": "⫯", "cirscir;": "⧂", "clubs;": "♣", "clubsuit;": "♣",
    "colon;": ":", "colone;": "≔", "coloneq;": "≔", "comma;": ",", "commat;": "@",
    "comp;": "∁", "compfn;": "∘", "complement;": "∁", "complexes;": "ℂ", "cong;": "≅",
    "congdot;": "⩭", "conint;": "∮", "copf;": "𝕔", "coprod;": "∐", "copy": "©", "copy;": "©",
    "copysr;": "℗", "crarr;": "↵", "cross;": "✗", "cscr;": "𝒸", "csub;": "⫏", "csube;": "⫑",
    "csup;": "⫐", "csupe;": "⫒", "ctdot;": "⋯", "cudarrl;": "⤸", "cudarrr;": "⤵",
    "cuepr;": "⋞", "cuesc;": "⋟", "cularr;": "↶", "cularrp;": "⤽", "cup;": "∪",
    "cupbrcap;": "⩈", "cupcap;": "⩆", "cupcup;": "⩊", "cupdot;": "⊍", "cupor;": "⩅",
    "cups;": "∪︀", "curarr;": "↷", "curarrm;": "⤼", "curlyeqprec;": "⋞", "curlyeqsucc;": "⋟",
    "curlyvee;": "⋎", "curlywedge;": "⋏", "curren": "¤", "curren;": "¤",
    "curvearrowleft;": "↶", "curvearrowright;": "↷", "cuvee;": "⋎", "cuwed;": "⋏",
    "cwconint;": "∲", "cwint;": "∱", "cylcty;": "⌭", "dArr;": "⇓", "dHar;": "⥥",
    "dagger;": "†", "daleth;": "ℸ", "darr;": "↓", "dash;": "‐", "dashv;": "⊣", "dbkarow;": "⤏",
    "dblac;": "˝", "dcaron;": "ď", "dcy;": "д", "dd;": "ⅆ", "ddagger;": "‡", "ddarr;": "⇊",
    "ddotseq;": "⩷", "deg": "°", "deg;": "°", "delta;": "δ", "demptyv;": "⦱", "dfisht;": "⥿",
    "dfr;": "𝔡", "dharl;": "⇃", "dharr;": "⇂", "diam;": "⋄", "diamond;": "⋄",
    "diamondsuit;": "♦", "diams;": "♦", "die;": "¨", "digamma;": "ϝ", "disin;": "⋲",
    "div;": "÷", "divide": "÷", "divide;": "÷", "divideontimes;": "⋇", "divonx;": "⋇",
    "djcy;": "ђ", "dlcorn;": "⌞", "dlcrop;": "⌍", "dollar;": "$", "dopf;": "𝕕", "dot;": "˙",
    "doteq;": "≐", "doteqdot;": "≑", "dotminus;": "∸", "dotplus;": "∔", "dotsquare;": "⊡",
    "doublebarwedge;": "⌆", "downarrow;": "↓", "downdownarrows;": "⇊", "downharpoonleft;": "⇃",
    "downharpoonright;": "⇂", "drbkarow;": "⤐", "drcorn;": "⌟", "drcrop;": "⌌", "dscr;": "𝒹",
    "dscy;": "ѕ", "dsol;": "⧶", "dstrok;": "đ", "dtdot;": "⋱", "dtri;": "▿", "dtrif;": "▾",
    "duarr;": "⇵", "duhar;": "⥯", "dwangle;": "⦦", "dzcy;": "џ", "dzigrarr;": "⟿",
    "eDDot;": "⩷", "eDot;": "≑", "eacute": "é", "eacute;": "é", "easter;": "⩮", "ecaron;": "ě",
    "ecir;": "≖", "ecirc": "ê", "ecirc;": "ê", "ecolon;": "≕", "ecy;": "э", "edot;": "ė",
    "ee;": "ⅇ", "efDot;": "≒", "efr;": "𝔢", "eg;": "⪚", "egrave": "è", "egrave;": "è",
    "egs;": "⪖", "egsdot;": "⪘", "el;": "⪙", "elinters;": "⏧", "ell;": "ℓ", "els;": "⪕",
    "elsdot;": "⪗", "emacr;": "ē", "empty;": "∅", "emptyset;": "∅", "emptyv;": "∅",
    "emsp13;": " ", "emsp14;": " ", "emsp;": " ", "eng;": "ŋ", "ensp;": " ", "eogon;": "ę",
    "eopf;": "𝕖", "epar;": "⋕", "eparsl;": "⧣", "eplus;": "⩱", "epsi;": "ε", "epsilon;": "ε",
    "epsiv;": "ϵ", "eqcirc;": "≖", "eqcolon;": "≕", "eqsim;": "≂", "eqslantgtr;": "⪖",
    "eqslantless;": "⪕", "equals;": "=", "equest;": "≟", "equiv;": "≡", "equivDD;": "⩸",
    "eqvparsl;": "⧥", "erDot;": "≓", "erarr;": "⥱", "escr;": "ℯ", "esdot;": "≐", "esim;": "≂",
    "eta;": "η", "eth": "ð", "eth;": "ð", "euml": "ë", "euml;": "ë", "euro;": "€",
    "excl;": "!", "exist;": "∃", "expectation;": "ℰ", "exponentiale;": "ⅇ",
    "fallingdotseq;": "≒", "fcy;": "ф", "female;": "♀", "ffilig;": "ﬃ", "fflig;": "ﬀ",
    "ffllig;": "ﬄ", "ffr;": "𝔣", "filig;": "ﬁ", "fjlig;": "fj", "flat;": "♭", "fllig;": "ﬂ",
    "fltns;": "▱", "fnof;": "ƒ", "fopf;": "𝕗", "forall;": "∀", "fork;": "⋔", "forkv;": "⫙",
    "fpartint;": "⨍", "frac12": "½", "frac12;": "½", "frac13;": "⅓", "frac14": "¼",
    "frac14;": "¼", "frac15;": "⅕", "frac16;": "⅙", "frac18;": "⅛", "frac23;": "⅔",
    "frac25;": "⅖", "frac34": "¾", "frac34;": "¾", "frac35;": "⅗", "frac38;": "⅜",
    "frac45;": "⅘", "frac56;": "⅚", "frac58;": "⅝", "frac78;": "⅞", "frasl;": "⁄",
    "frown;": "⌢", "fscr;": "𝒻", "gE;": "≧", "gEl;": "⪌", "gacute;": "ǵ", "gamma;": "γ",
    "gammad;": "ϝ", "gap;": "⪆", "gbreve;": "ğ", "gcirc;": "ĝ", "gcy;": "г", "gdot;": "ġ",
    "ge;": "≥", "gel;": "⋛", "geq;": "≥", "geqq;": "≧", "geqslant;": "⩾", "ges;": "⩾",
    "gescc;": "⪩", "gesdot;": "⪀", "gesdoto;": "⪂", "gesdotol;": "⪄", "gesl;": "⋛︀",
    "gesles;": "⪔", "gfr;": "𝔤", "gg;": "≫", "ggg;": "⋙", "gimel;": "ℷ", "gjcy;": "ѓ",
    "gl;": "≷", "glE;": "⪒", "gla;": "⪥", "glj;": "⪤", "gnE;": "≩", "gnap;": "⪊",
    "gnapprox;": "⪊", "gne;": "⪈", "gneq;": "⪈", "gneqq;": "≩", "gnsim;": "⋧", "gopf;": "𝕘",
    "grave;": "`", "gscr;": "ℊ", "gsim;": "≳", "gsime;": "⪎", "gsiml;": "⪐", "gt": ">",
    "gt;": ">", "gtcc;": "⪧", "gtcir;": "⩺", "gtdot;": "⋗", "gtlPar;": "⦕", "gtquest;": "⩼",
    "gtrapprox;": "⪆", "gtrarr;": "⥸", "gtrdot;": "⋗", "gtreqless;": "⋛", "gtreqqless;": "⪌",
    "gtrless;": "≷", "gtrsim;": "≳", "gvertneqq;": "≩︀", "gvnE;": "≩︀", "hArr;": "⇔",
    "hairsp;": " ", "half;": "½", "hamilt;": "ℋ", "hardcy;": "ъ", "harr;": "↔",
    "harrcir;": "⥈", "harrw;": "↭", "hbar;": "ℏ", "hcirc;": "ĥ", "hearts;": "♥",
    "heartsuit;": "♥", "hellip;": "…", "hercon;": "⊹", "hfr;": "𝔥", "hksearow;": "⤥",
    "hkswarow;": "⤦", "hoarr;": "⇿", "homtht;": "∻", "hookleftarrow;": "↩",
    "hookrightarrow;": "↪", "hopf;": "𝕙", "horbar;": "―", "hscr;": "𝒽", "hslash;": "ℏ",
    "hstrok;": "ħ", "hybull;": "⁃", "hyphen;": "‐", "iacute": "í", "iacute;": "í", "ic;": "⁣",
    "icirc": "î", "icirc;": "î", "icy;": "и", "iecy;": "е", "iexcl": "¡", "iexcl;": "¡",
    "iff;": "⇔", "ifr;": "𝔦", "igrave": "ì", "igrave;": "ì", "ii;": "ⅈ", "iiiint;": "⨌",
    "iiint;": "∭", "iinfin;": "⧜", "iiota;": "℩", "ijlig;": "ĳ", "imacr;": "ī", "image;": "ℑ",
    "imagline;": "ℐ", "imagpart;": "ℑ", "imath;": "ı", "imof;": "⊷", "imped;": "Ƶ", "in;": "∈",
    "incare;": "℅", "infin;": "∞", "infintie;": "⧝", "inodot;": "ı", "int;": "∫",
    "intcal;": "⊺", "integers;": "ℤ", "intercal;": "⊺", "intlarhk;": "⨗", "intprod;": "⨼",
    "iocy;": "ё", "iogon;": "į", "iopf;": "𝕚", "iota;": "ι", "iprod;": "⨼", "iquest": "¿",
    "iquest;": "¿", "iscr;": "𝒾", "isin;": "∈", "isinE;": "⋹", "isindot;": "⋵", "isins;": "⋴",
    "isinsv;": "⋳", "isinv;": "∈", "it;": "⁢", "itilde;": "ĩ", "iukcy;": "і", "iuml": "ï",
    "iuml;": "ï", "jcirc;": "ĵ", "jcy;": "й", "jfr;": "𝔧", "jmath;": "ȷ", "jopf;": "𝕛",
    "jscr;": "𝒿", "jsercy;": "ј", "jukcy;": "є", "kappa;": "κ", "kappav;": "ϰ",
    "kcedil;": "ķ", "kcy;": "к", "kfr;": "𝔨", "kgreen;": "ĸ", "khcy;": "х", "kjcy;": "ќ",
    "kopf;": "𝕜", "kscr;": "𝓀", "lAarr;": "⇚", "lArr;": "⇐", "lAtail;": "⤛", "lBarr;": "⤎",
    "lE;": "≦", "lEg;": "⪋", "lHar;": "⥢", "lacute;": "ĺ", "laemptyv;": "⦴", "lagran;": "ℒ",
    "lambda;": "λ", "lang;": "⟨", "langd;": "⦑", "langle;": "⟨", "lap;": "⪅", "laquo": "«",
    "laquo;": "«", "larr;": "←", "larrb;": "⇤", "larrbfs;": "⤟", "larrfs;": "⤝",
    "larrhk;": "↩", "larrlp;": "↫", "larrpl;": "⤹", "larrsim;": "⥳", "larrtl;": "↢",
    "lat;": "⪫", "latail;": "⤙", "late;": "⪭", "lates;": "⪭︀", "lbarr;": "⤌", "lbbrk;": "❲",
    "lbrace;": "{", "lbrack;": "[", "lbrke;": "⦋", "lbrksld;": "⦏", "lbrkslu;": "⦍",
    "lcaron;": "ľ", "lcedil;": "ļ", "lceil;": "⌈", "lcub;": "{", "lcy;": "л", "ldca;": "⤶",
    "ldquo;": "“", "ldquor;": "„", "ldrdhar;": "⥧", "ldrushar;": "⥋", "ldsh;": "↲", "le;": "≤",
    "leftarrow;": "←", "leftarrowtail;": "↢", "leftharpoondown;": "↽", "leftharpoonup;": "↼",
    "leftleftarrows;": "⇇", "leftrightarrow;": "↔", "leftrightarrows;": "⇆",
    "leftrightharpoons;": "⇋", "leftrightsquigarrow;": "↭", "leftthreetimes;": "⋋",
    "leg;": "⋚", "leq;": "≤", "leqq;": "≦", "leqslant;": "⩽", "les;": "⩽", "lescc;": "⪨",
    "lesdot;": "⩿", "lesdoto;": "⪁", "lesdotor;": "⪃", "lesg;": "⋚︀", "lesges;": "⪓",
    "lessapprox;": "⪅", "lessdot;": "⋖", "lesseqgtr;": "⋚", "lesseqqgtr;": "⪋",
    "lessgtr;": "≶", "lesssim;": "≲", "lfisht;": "⥼", "lfloor;": "⌊", "lfr;": "𝔩", "lg;": "≶",
    "lgE;": "⪑", "lhard;": "↽", "lharu;": "↼", "lharul;": "⥪", "lhblk;": "▄", "ljcy;": "љ",
    "ll;": "≪", "llarr;": "⇇", "llcorner;": "⌞", "llhard;": "⥫", "lltri;": "◺", "lmidot;": "ŀ",
    "lmoust;": "⎰", "lmoustache;": "⎰", "lnE;": "≨", "lnap;": "⪉", "lnapprox;": "⪉",
    "lne;": "⪇", "lneq;": "⪇", "lneqq;": "≨", "lnsim;": "⋦", "loang;": "⟬", "loarr;": "⇽",
    "lobrk;": "⟦", "longleftarrow;": "⟵", "longleftrightarrow;": "⟷", "longmapsto;": "⟼",
    "longrightarrow;": "⟶", "looparrowleft;": "↫", "looparrowright;": "↬", "lopar;": "⦅",
    "lopf;": "𝕝", "loplus;": "⨭", "lotimes;": "⨴", "lowast;": "∗", "lowbar;": "_",
    "loz;": "◊", "lozenge;": "◊", "lozf;": "⧫", "lpar;": "(", "lparlt;": "⦓", "lrarr;": "⇆",
    "lrcorner;": "⌟", "lrhar;": "⇋", "lrhard;": "⥭", "lrm;": "‎", "lrtri;": "⊿",
    "lsaquo;": "‹", "lscr;": "𝓁", "lsh;": "↰", "lsim;": "≲", "lsime;": "⪍", "lsimg;": "⪏",
    "lsqb;": "[", "lsquo;": "‘", "lsquor;": "‚", "lstrok;": "ł", "lt": "<", "lt;": "<",
    "ltcc;": "⪦", "ltcir;": "⩹", "ltdot;": "⋖", "lthree;": "⋋", "ltimes;": "⋉", "ltlarr;": "⥶",
    "ltquest;": "⩻", "ltrPar;": "⦖", "ltri;": "◃", "ltrie;": "⊴", "ltrif;": "◂",
    "lurdshar;": "⥊", "luruhar;": "⥦", "lvertneqq;": "≨︀", "lvnE;": "≨︀", "mDDot;": "∺",
    "macr": "¯", "macr;": "¯", "male;": "♂", "malt;": "✠", "maltese;": "✠", "map;": "↦",
    "mapsto;": "↦", "mapstodown;": "↧", "mapstoleft;": "↤", "mapstoup;": "↥", "marker;": "▮",
    "mcomma;": "⨩", "mcy;": "м", "mdash;": "—", "measuredangle;": "∡", "mfr;": "𝔪",
    "mho;": "℧", "micro": "µ", "micro;": "µ", "mid;": "∣", "midast;": "*", "midcir;": "⫰",
    "middot": "·", "middot;": "·", "minus;": "−", "minusb;": "⊟", "minusd;": "∸",
    "minusdu;": "⨪", "mlcp;": "⫛", "mldr;": "…", "mnplus;": "∓", "models;": "⊧", "mopf;": "𝕞",
    "mp;": "∓", "mscr;": "𝓂", "mstpos;": "∾", "mu;": "μ", "multimap;": "⊸", "mumap;": "⊸",
    "nGg;": "⋙̸", "nGt;": "≫⃒", "nGtv;": "≫̸", "nLeftarrow;": "⇍", "nLeftrightarrow;": "⇎",
    "nLl;": "⋘̸", "nLt;": "≪⃒", "nLtv;": "≪̸", "nRightarrow;": "⇏", "nVDash;": "⊯",
    "nVdash;": "⊮", "nabla;": "∇", "nacute;": "ń", "nang;": "∠⃒", "nap;": "≉", "napE;": "⩰̸",
    "napid;": "≋̸", "napos;": "ŉ", "napprox;": "≉", "natur;": "♮", "natural;": "♮",
    "naturals;": "ℕ", "nbsp": " ", "nbsp;": " ", "nbump;": "≎̸", "nbumpe;": "≏̸", "ncap;": "⩃",
    "ncaron;": "ň", "ncedil;": "ņ", "ncong;": "≇", "ncongdot;": "⩭̸", "ncup;": "⩂",
    "ncy;": "н", "ndash;": "–", "ne;": "≠", "neArr;": "⇗", "nearhk;": "⤤", "nearr;": "↗",
    "nearrow;": "↗", "nedot;": "≐̸", "nequiv;": "≢", "nesear;": "⤨", "nesim;": "≂̸",
    "nexist;": "∄", "nexists;": "∄", "nfr;": "𝔫", "ngE;": "≧̸", "nge;": "≱", "ngeq;": "≱",
    "ngeqq;": "≧̸", "ngeqslant;": "⩾̸", "nges;": "⩾̸", "ngsim;": "≵", "ngt;": "≯",
    "ngtr;": "≯", "nhArr;": "⇎", "nharr;": "↮", "nhpar;": "⫲", "ni;": "∋", "nis;": "⋼",
    "nisd;": "⋺", "niv;": "∋", "njcy;": "њ", "nlArr;": "⇍", "nlE;": "≦̸", "nlarr;": "↚",
    "nldr;": "‥", "nle;": "≰", "nleftarrow;": "↚", "nleftrightarrow;": "↮", "nleq;": "≰",
    "nleqq;": "≦̸", "nleqslant;": "⩽̸", "nles;": "⩽̸", "nless;": "≮", "nlsim;": "≴",
    "nlt;": "≮", "nltri;": "⋪", "nltrie;": "⋬", "nmid;": "∤", "nopf;": "𝕟", "not": "¬",
    "not;": "¬", "notin;": "∉", "notinE;": "⋹̸", "notindot;": "⋵̸", "notinva;": "∉",
    "notinvb;": "⋷", "notinvc;": "⋶", "notni;": "∌", "notniva;": "∌", "notnivb;": "⋾",
    "notnivc;": "⋽", "npar;": "∦", "nparallel;": "∦", "nparsl;": "⫽⃥", "npart;": "∂̸",
    "npolint;": "⨔", "npr;": "⊀", "nprcue;": "⋠", "npre;": "⪯̸", "nprec;": "⊀",
    "npreceq;": "⪯̸", "nrArr;": "⇏", "nrarr;": "↛", "nrarrc;": "⤳̸", "nrarrw;": "↝̸",
    "nrightarrow;": "↛", "nrtri;": "⋫", "nrtrie;": "⋭", "nsc;": "⊁", "nsccue;": "⋡",
    "nsce;": "⪰̸", "nscr;": "𝓃", "nshortmid;": "∤", "nshortparallel;": "∦", "nsim;": "≁",
    "nsime;": "≄", "nsimeq;": "≄", "nsmid;": "∤", "nspar;": "∦", "nsqsube;": "⋢",
    "nsqsupe;": "⋣", "nsub;": "⊄", "nsubE;": "⫅̸", "nsube;": "⊈", "nsubset;": "⊂⃒",
    "nsubseteq;": "⊈", "nsubseteqq;": "⫅̸", "nsucc;": "⊁", "nsucceq;": "⪰̸", "nsup;": "⊅",
    "nsupE;": "⫆̸", "nsupe;": "⊉", "nsupset;": "⊃⃒", "nsupseteq;": "⊉", "nsupseteqq;": "⫆̸",
    "ntgl;": "≹", "ntilde": "ñ", "ntilde;": "ñ", "ntlg;": "≸", "ntriangleleft;": "⋪",
    "ntrianglelefteq;": "⋬", "ntriangleright;": "⋫", "ntrianglerighteq;": "⋭", "nu;": "ν",
    "num;": "#", "numero;": "№", "numsp;": " ", "nvDash;": "⊭", "nvHarr;": "⤄", "nvap;": "≍⃒",
    "nvdash;": "⊬", "nvge;": "≥⃒", "nvgt;": ">⃒", "nvinfin;": "⧞", "nvlArr;": "⤂",
    "nvle;": "≤⃒", "nvlt;": "<⃒", "nvltrie;": "⊴⃒", "nvrArr;": "⤃", "nvrtrie;": "⊵⃒",
    "nvsim;": "∼⃒", "nwArr;": "⇖", "nwarhk;": "⤣", "nwarr;": "↖", "nwarrow;": "↖",
    "nwnear;": "⤧", "oS;": "Ⓢ", "oacute": "ó", "oacute;": "ó", "oast;": "⊛", "ocir;": "⊚",
    "ocirc": "ô", "ocirc;": "ô", "ocy;": "о", "odash;": "⊝", "odblac;": "ő", "odiv;": "⨸",
    "odot;": "⊙", "odsold;": "⦼", "oelig;": "œ", "ofcir;": "⦿", "ofr;": "𝔬", "ogon;": "˛",
    "ograve": "ò", "ograve;": "ò", "ogt;": "⧁", "ohbar;": "⦵", "ohm;": "Ω", "oint;": "∮",
    "olarr;": "↺", "olcir;": "⦾", "olcross;": "⦻", "oline;": "‾", "olt;": "⧀", "omacr;": "ō",
    "omega;": "ω", "omicron;": "ο", "omid;": "⦶", "ominus;": "⊖", "oopf;": "𝕠", "opar;": "⦷",
    "operp;": "⦹", "oplus;": "⊕", "or;": "∨", "orarr;": "↻", "ord;": "⩝", "order;": "ℴ",
    "orderof;": "ℴ", "ordf": "ª", "ordf;": "ª", "ordm": "º", "ordm;": "º", "origof;": "⊶",
    "oror;": "⩖", "orslope;": "⩗", "orv;": "⩛", "oscr;": "ℴ", "oslash": "ø", "oslash;": "ø",
    "osol;": "⊘", "otilde": "õ", "otilde;": "õ", "otimes;": "⊗", "otimesas;": "⨶", "ouml": "ö",
    "ouml;": "ö", "ovbar;": "⌽", "par;": "∥", "para": "¶", "para;": "¶", "parallel;": "∥",
    "parsim;": "⫳", "parsl;": "⫽", "part;": "∂", "pcy;": "п", "percnt;": "%", "period;": ".",
    "permil;": "‰", "perp;": "⊥", "pertenk;": "‱", "pfr;": "𝔭", "phi;": "φ", "phiv;": "ϕ",
    "phmmat;": "ℳ", "phone;": "☎", "pi;": "π", "pitchfork;": "⋔", "piv;": "ϖ", "planck;": "ℏ",
    "planckh;": "ℎ", "plankv;": "ℏ", "plus;": "+", "plusacir;": "⨣", "plusb;": "⊞",
    "pluscir;": "⨢", "plusdo;": "∔", "plusdu;": "⨥", "pluse;": "⩲", "plusmn": "±",
    "plusmn;": "±", "plussim;": "⨦", "plustwo;": "⨧", "pm;": "±", "pointint;": "⨕",
    "popf;": "𝕡", "pound": "£", "pound;": "£", "pr;": "≺", "prE;": "⪳", "prap;": "⪷",
    "prcue;": "≼", "pre;": "⪯", "prec;": "≺", "precapprox;": "⪷", "preccurlyeq;": "≼",
    "preceq;": "⪯", "precnapprox;": "⪹", "precneqq;": "⪵", "precnsim;": "⋨", "precsim;": "≾",
    "prime;": "′", "primes;": "ℙ", "prnE;": "⪵", "prnap;": "⪹", "prnsim;": "⋨", "prod;": "∏",
    "profalar;": "⌮", "profline;": "⌒", "profsurf;": "⌓", "prop;": "∝", "propto;": "∝",
    "prsim;": "≾", "prurel;": "⊰", "pscr;": "𝓅", "psi;": "ψ", "puncsp;": " ", "qfr;": "𝔮",
    "qint;": "⨌", "qopf;": "𝕢", "qprime;": "⁗", "qscr;": "𝓆", "quaternions;": "ℍ",
    "quatint;": "⨖", "quest;": "?", "questeq;": "≟", "quot": "\"", "quot;": "\"",
    "rAarr;": "⇛", "rArr;": "⇒", "rAtail;": "⤜", "rBarr;": "⤏", "rHar;": "⥤", "race;": "∽̱",
    "racute;": "ŕ", "radic;": "√", "raemptyv;": "⦳", "rang;": "⟩", "rangd;": "⦒",
    "range;": "⦥", "rangle;": "⟩", "raquo": "»", "raquo;": "»", "rarr;": "→", "rarrap;": "⥵",
    "rarrb;": "⇥", "rarrbfs;": "⤠", "rarrc;": "⤳", "rarrfs;": "⤞", "rarrhk;": "↪",
    "rarrlp;": "↬", "rarrpl;": "⥅", "rarrsim;": "⥴", "rarrtl;": "↣", "rarrw;": "↝",
    "ratail;": "⤚", "ratio;": "∶", "rationals;": "ℚ", "rbarr;": "⤍", "rbbrk;": "❳",
    "rbrace;": "}", "rbrack;": "]", "rbrke;": "⦌", "rbrksld;": "⦎", "rbrkslu;": "⦐",
    "rcaron;": "ř", "rcedil;": "ŗ", "rceil;": "⌉", "rcub;": "}", "rcy;": "р", "rdca;": "⤷",
    "rdldhar;": "⥩", "rdquo;": "”", "rdquor;": "”", "rdsh;": "↳", "real;": "ℜ",
    "realine;": "ℛ", "realpart;": "ℜ", "reals;": "ℝ", "rect;": "▭", "reg": "®", "reg;": "®",
    "rfisht;": "⥽", "rfloor;": "⌋", "rfr;": "𝔯", "rhard;": "⇁", "rharu;": "⇀", "rharul;": "⥬",
    "rho;": "ρ", "rhov;": "ϱ", "rightarrow;": "→", "rightarrowtail;": "↣",
    "rightharpoondown;": "⇁", "rightharpoonup;": "⇀", "rightleftarrows;": "⇄",
    "rightleftharpoons;": "⇌", "rightrightarrows;": "⇉", "rightsquigarrow;": "↝",
    "rightthreetimes;": "⋌", "ring;": "˚", "risingdotseq;": "≓", "rlarr;": "⇄", "rlhar;": "⇌",
    "rlm;": "‏", "rmoust;": "⎱", "rmoustache;": "⎱", "rnmid;": "⫮", "roang;": "⟭",
    "roarr;": "⇾", "robrk;": "⟧", "ropar;": "⦆", "ropf;": "𝕣", "roplus;": "⨮",
    "rotimes;": "⨵", "rpar;": ")", "rpargt;": "⦔", "rppolint;": "⨒", "rrarr;": "⇉",
    "rsaquo;": "›", "rscr;": "𝓇", "rsh;": "↱", "rsqb;": "]", "rsquo;": "’", "rsquor;": "’",
    "rthree;": "⋌", "rtimes;": "⋊", "rtri;": "▹", "rtrie;": "⊵", "rtrif;": "▸",
    "rtriltri;": "⧎", "ruluhar;": "⥨", "rx;": "℞", "sacute;": "ś", "sbquo;": "‚", "sc;": "≻",
    "scE;": "⪴", "scap;": "⪸", "scaron;": "š", "sccue;": "≽", "sce;": "⪰", "scedil;": "ş",
    "scirc;": "ŝ", "scnE;": "⪶", "scnap;": "⪺", "scnsim;": "⋩", "scpolint;": "⨓",
    "scsim;": "≿", "scy;": "с", "sdot;": "⋅", "sdotb;": "⊡", "sdote;": "⩦", "seArr;": "⇘",
    "searhk;": "⤥", "searr;": "↘", "searrow;": "↘", "sect": "§", "sect;": "§", "semi;": ";",
    "seswar;": "⤩", "setminus;": "∖", "setmn;": "∖", "sext;": "✶", "sfr;": "𝔰",
    "sfrown;": "⌢", "sharp;": "♯", "shchcy;": "щ", "shcy;": "ш", "shortmid;": "∣",
    "shortparallel;": "∥", "shy": "­", "shy;": "­", "sigma;": "σ", "sigmaf;": "ς",
    "sigmav;": "ς", "sim;": "∼", "simdot;": "⩪", "sime;": "≃", "simeq;": "≃", "simg;": "⪞",
    "simgE;": "⪠", "siml;": "⪝", "simlE;": "⪟", "simne;": "≆", "simplus;": "⨤",
    "simrarr;": "⥲", "slarr;": "←", "smallsetminus;": "∖", "smashp;": "⨳", "smeparsl;": "⧤",
    "smid;": "∣", "smile;": "⌣", "smt;": "⪪", "smte;": "⪬", "smtes;": "⪬︀", "softcy;": "ь",
    "sol;": "/", "solb;": "⧄", "solbar;": "⌿", "sopf;": "𝕤", "spades;": "♠",
    "spadesuit;": "♠", "spar;": "∥", "sqcap;": "⊓", "sqcaps;": "⊓︀", "sqcup;": "⊔",
    "sqcups;": "⊔︀", "sqsub;": "⊏", "sqsube;": "⊑", "sqsubset;": "⊏", "sqsubseteq;": "⊑",
    "sqsup;": "⊐", "sqsupe;": "⊒", "sqsupset;": "⊐", "sqsupseteq;": "⊒", "squ;": "□",
    "square;": "□", "squarf;": "▪", "squf;": "▪", "srarr;": "→", "sscr;": "𝓈", "ssetmn;": "∖",
    "ssmile;": "⌣", "sstarf;": "⋆", "star;": "☆", "starf;": "★", "straightepsilon;": "ϵ",
    "straightphi;": "ϕ", "strns;": "¯", "sub;": "⊂", "subE;": "⫅", "subdot;": "⪽",
    "sube;": "⊆", "subedot;": "⫃", "submult;": "⫁", "subnE;": "⫋", "subne;": "⊊",
    "subplus;": "⪿", "subrarr;": "⥹", "subset;": "⊂", "subseteq;": "⊆", "subseteqq;": "⫅",
    "subsetneq;": "⊊", "subsetneqq;": "⫋", "subsim;": "⫇", "subsub;": "⫕", "subsup;": "⫓",
    "succ;": "≻", "succapprox;": "⪸", "succcurlyeq;": "≽", "succeq;": "⪰", "succnapprox;": "⪺",
    "succneqq;": "⪶", "succnsim;": "⋩", "succsim;": "≿", "sum;": "∑", "sung;": "♪",
    "sup1": "¹", "sup1;": "¹", "sup2": "²", "sup2;": "²", "sup3": "³", "sup3;": "³",
    "sup;": "⊃", "supE;": "⫆", "supdot;": "⪾", "supdsub;": "⫘", "supe;": "⊇", "supedot;": "⫄",
    "suphsol;": "⟉", "suphsub;": "⫗", "suplarr;": "⥻", "supmult;": "⫂", "supnE;": "⫌",
    "supne;": "⊋", "supplus;": "⫀", "supset;": "⊃", "supseteq;": "⊇", "supseteqq;": "⫆",
    "supsetneq;": "⊋", "supsetneqq;": "⫌", "supsim;": "⫈", "supsub;": "⫔", "supsup;": "⫖",
    "swArr;": "⇙", "swarhk;": "⤦", "swarr;": "↙", "swarrow;": "↙", "swnwar;": "⤪",
    "szlig": "ß", "szlig;": "ß", "target;": "⌖", "tau;": "τ", "tbrk;": "⎴", "tcaron;": "ť",
    "tcedil;": "ţ", "tcy;": "т", "tdot;": "⃛", "telrec;": "⌕", "tfr;": "𝔱", "there4;": "∴",
    "therefore;": "∴", "theta;": "θ", "thetasym;": "ϑ", "thetav;": "ϑ", "thickapprox;": "≈",
    "thicksim;": "∼", "thinsp;": " ", "thkap;": "≈", "thksim;": "∼", "thorn": "þ",
    "thorn;": "þ", "tilde;": "˜", "times": "×", "times;": "×", "timesb;": "⊠",
    "timesbar;": "⨱", "timesd;": "⨰", "tint;": "∭", "toea;": "⤨", "top;": "⊤", "topbot;": "⌶",
    "topcir;": "⫱", "topf;": "𝕥", "topfork;": "⫚", "tosa;": "⤩", "tprime;": "‴",
    "trade;": "™", "triangle;": "▵", "triangledown;": "▿", "triangleleft;": "◃",
    "trianglelefteq;": "⊴", "triangleq;": "≜", "triangleright;": "▹", "trianglerighteq;": "⊵",
    "tridot;": "◬", "trie;": "≜", "triminus;": "⨺", "triplus;": "⨹", "trisb;": "⧍",
    "tritime;": "⨻", "trpezium;": "⏢", "tscr;": "𝓉", "tscy;": "ц", "tshcy;": "ћ",
    "tstrok;": "ŧ", "twixt;": "≬", "twoheadleftarrow;": "↞", "twoheadrightarrow;": "↠",
    "uArr;": "⇑", "uHar;": "⥣", "uacute": "ú", "uacute;": "ú", "uarr;": "↑", "ubrcy;": "ў",
    "ubreve;": "ŭ", "ucirc": "û", "ucirc;": "û", "ucy;": "у", "udarr;": "⇅", "udblac;": "ű",
    "udhar;": "⥮", "ufisht;": "⥾", "ufr;": "𝔲", "ugrave": "ù", "ugrave;": "ù", "uharl;": "↿",
    "uharr;": "↾", "uhblk;": "▀", "ulcorn;": "⌜", "ulcorner;": "⌜", "ulcrop;": "⌏",
    "ultri;": "◸", "umacr;": "ū", "uml": "¨", "uml;": "¨", "uogon;": "ų", "uopf;": "𝕦",
    "uparrow;": "↑", "updownarrow;": "↕", "upharpoonleft;": "↿", "upharpoonright;": "↾",
    "uplus;": "⊎", "upsi;": "υ", "upsih;": "ϒ", "upsilon;": "υ", "upuparrows;": "⇈",
    "urcorn;": "⌝", "urcorner;": "⌝", "urcrop;": "⌎", "uring;": "ů", "urtri;": "◹",
    "uscr;": "𝓊", "utdot;": "⋰", "utilde;": "ũ", "utri;": "▵", "utrif;": "▴", "uuarr;": "⇈",
    "uuml": "ü", "uuml;": "ü", "uwangle;": "⦧", "vArr;": "⇕", "vBar;": "⫨", "vBarv;": "⫩",
    "vDash;": "⊨", "vangrt;": "⦜", "varepsilon;": "ϵ", "varkappa;": "ϰ", "varnothing;": "∅",
    "varphi;": "ϕ", "varpi;": "ϖ", "varpropto;": "∝", "varr;": "↕", "varrho;": "ϱ",
    "varsigma;": "ς", "varsubsetneq;": "⊊︀", "varsubsetneqq;": "⫋︀", "varsupsetneq;": "⊋︀",
    "varsupsetneqq;": "⫌︀", "vartheta;": "ϑ", "vartriangleleft;": "⊲",
    "vartriangleright;": "⊳", "vcy;": "в", "vdash;": "⊢", "vee;": "∨", "veebar;": "⊻",
    "veeeq;": "≚", "vellip;": "⋮", "verbar;": "|", "vert;": "|", "vfr;": "𝔳", "vltri;": "⊲",
    "vnsub;": "⊂⃒", "vnsup;": "⊃⃒", "vopf;": "𝕧", "vprop;": "∝", "vrtri;": "⊳", "vscr;": "𝓋",
    "vsubnE;": "⫋︀", "vsubne;": "⊊︀", "vsupnE;": "⫌︀", "vsupne;": "⊋︀", "vzigzag;": "⦚",
    "wcirc;": "ŵ", "wedbar;": "⩟", "wedge;": "∧", "wedgeq;": "≙", "weierp;": "℘", "wfr;": "𝔴",
    "wopf;": "𝕨", "wp;": "℘", "wr;": "≀", "wreath;": "≀", "wscr;": "𝓌", "xcap;": "⋂",
    "xcirc;": "◯", "xcup;": "⋃", "xdtri;": "▽", "xfr;": "𝔵", "xhArr;": "⟺", "xharr;": "⟷",
    "xi;": "ξ", "xlArr;": "⟸", "xlarr;": "⟵", "xmap;": "⟼", "xnis;": "⋻", "xodot;": "⨀",
    "xopf;": "𝕩", "xoplus;": "⨁", "xotime;": "⨂", "xrArr;": "⟹", "xrarr;": "⟶", "xscr;": "𝓍",
    "xsqcup;": "⨆", "xuplus;": "⨄", "xutri;": "△", "xvee;": "⋁", "xwedge;": "⋀", "yacute": "ý",
    "yacute;": "ý", "yacy;": "я", "ycirc;": "ŷ", "ycy;": "ы", "yen": "¥", "yen;": "¥",
    "yfr;": "𝔶", "yicy;": "ї", "yopf;": "𝕪", "yscr;": "𝓎", "yucy;": "ю", "yuml": "ÿ",
    "yuml;": "ÿ", "zacute;": "ź", "zcaron;": "ž", "zcy;": "з", "zdot;": "ż", "zeetrf;": "ℨ",
    "zeta;": "ζ", "zfr;": "𝔷", "zhcy;": "ж", "zigrarr;": "⇝", "zopf;": "𝕫", "zscr;": "𝓏",
    "zwj;": "‍", "zwnj;": "‌",
}));
