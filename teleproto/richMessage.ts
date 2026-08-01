/**
 * Helpers for Telegram rich messages (Layer 228): building
 * {@link Api.TypeInputRichMessage} inputs for sending, and rendering received
 * {@link Api.RichMessage} block trees to plain text, Markdown or HTML.
 *
 * Sending — the server parses HTML/Markdown for you:
 * ```ts
 * import { Rich } from "teleproto";
 * await client.sendMessage(chat, {
 *     richMessage: Rich.markdown("# Title\n\nHello **world**"),
 * });
 * ```
 *
 * Reading:
 * ```ts
 * if (message.richMessage) console.log(Rich.toMarkdown(message.richMessage));
 * ```
 */
import { Api } from "./tl";
import { unionId } from "./Helpers";

/**
 * Media referenced from HTML/Markdown content by id: map of id → uploaded
 * photo or document. Reference them from the content by that id
 * (e.g. `<img src="cover">` with `files: { cover: inputPhoto }`).
 */
export type RichFileMap = Record<
    string,
    Api.TypeInputPhoto | Api.TypeInputDocument
>;

/** Common options for the rich input factories. */
export interface RichInputOptions {
    /** Right-to-left layout. */
    rtl?: boolean;
    /** Disable automatic linking of URLs, emails and phone numbers. */
    noAutolink?: boolean;
    /** Media referenced from the content by id, see {@link RichFileMap}. */
    files?: RichFileMap;
}

function _toRichFiles(
    files?: RichFileMap
): Api.TypeInputRichFile[] | undefined {
    if (!files) {
        return undefined;
    }
    const result: Api.TypeInputRichFile[] = [];
    for (const [id, media] of Object.entries(files)) {
        if ((media as any).SUBCLASS_OF_ID === unionId("InputPhoto")) {
            result.push(
                new Api.InputRichFilePhoto({
                    id,
                    photo: media as Api.TypeInputPhoto,
                })
            );
        } else {
            result.push(
                new Api.InputRichFileDocument({
                    id,
                    document: media as Api.TypeInputDocument,
                })
            );
        }
    }
    return result.length ? result : undefined;
}

/** Builds a rich message from HTML. The server parses it into blocks. */
export function html(
    content: string,
    options: RichInputOptions = {}
): Api.InputRichMessageHTML {
    return new Api.InputRichMessageHTML({
        html: content,
        rtl: options.rtl,
        noautolink: options.noAutolink,
        files: _toRichFiles(options.files),
    });
}

/** Builds a rich message from Markdown. The server parses it into blocks. */
export function markdown(
    content: string,
    options: RichInputOptions = {}
): Api.InputRichMessageMarkdown {
    return new Api.InputRichMessageMarkdown({
        markdown: content,
        rtl: options.rtl,
        noautolink: options.noAutolink,
        files: _toRichFiles(options.files),
    });
}

/** Options for {@link blocks} — the raw PageBlock input variant. */
export interface RichBlocksOptions {
    /** Right-to-left layout. */
    rtl?: boolean;
    /** Disable automatic linking of URLs, emails and phone numbers. */
    noAutolink?: boolean;
    /** Photos referenced by `photoId` from within the blocks. */
    photos?: Api.TypeInputPhoto[];
    /** Documents referenced by `documentId` from within the blocks. */
    documents?: Api.TypeInputDocument[];
    /** Users referenced by `userId` from within the blocks. */
    users?: Api.TypeInputUser[];
}

/** Builds a rich message from a raw PageBlock tree. */
export function blocks(
    pageBlocks: Api.TypePageBlock[],
    options: RichBlocksOptions = {}
): Api.InputRichMessage {
    return new Api.InputRichMessage({
        blocks: pageBlocks,
        rtl: options.rtl,
        noautolink: options.noAutolink,
        photos: options.photos,
        documents: options.documents,
        users: options.users,
    });
}

type RenderMode = "text" | "md" | "html";

function _escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function _escapeMd(text: string): string {
    return text.replace(/([\\`*_[\]|~])/g, "\\$1");
}

function _plain(text: string, mode: RenderMode): string {
    if (mode === "html") {
        return _escapeHtml(text);
    }
    if (mode === "md") {
        return _escapeMd(text);
    }
    return text;
}

function _tag(inner: string, mode: RenderMode, htmlTag: string, md: string) {
    if (mode === "html") {
        return `<${htmlTag}>${inner}</${htmlTag}>`;
    }
    if (mode === "md") {
        return `${md}${inner}${md}`;
    }
    return inner;
}

/** Renders a {@link Api.TypeRichText} tree to plain text, Markdown or HTML. */
export function renderRichText(
    text: Api.TypeRichText | undefined,
    mode: RenderMode = "text"
): string {
    if (!text || text instanceof Api.TextEmpty) {
        return "";
    }
    if (text instanceof Api.TextPlain) {
        return _plain(text.text, mode);
    }
    if (text instanceof Api.TextConcat) {
        return text.texts.map((t) => renderRichText(t, mode)).join("");
    }
    if (text instanceof Api.TextBold) {
        return _tag(renderRichText(text.text, mode), mode, "b", "**");
    }
    if (text instanceof Api.TextItalic) {
        return _tag(renderRichText(text.text, mode), mode, "i", "_");
    }
    if (text instanceof Api.TextUnderline) {
        return mode === "html"
            ? `<u>${renderRichText(text.text, mode)}</u>`
            : renderRichText(text.text, mode);
    }
    if (text instanceof Api.TextStrike) {
        return _tag(renderRichText(text.text, mode), mode, "s", "~~");
    }
    if (text instanceof Api.TextFixed) {
        return _tag(renderRichText(text.text, mode), mode, "code", "`");
    }
    if (text instanceof Api.TextMarked) {
        return mode === "html"
            ? `<mark>${renderRichText(text.text, mode)}</mark>`
            : renderRichText(text.text, mode);
    }
    if (text instanceof Api.TextSpoiler) {
        const inner = renderRichText(text.text, mode);
        if (mode === "html") {
            return `<span class="spoiler">${inner}</span>`;
        }
        if (mode === "md") {
            return `||${inner}||`;
        }
        return inner;
    }
    if (text instanceof Api.TextSubscript) {
        return mode === "html"
            ? `<sub>${renderRichText(text.text, mode)}</sub>`
            : renderRichText(text.text, mode);
    }
    if (text instanceof Api.TextSuperscript) {
        return mode === "html"
            ? `<sup>${renderRichText(text.text, mode)}</sup>`
            : renderRichText(text.text, mode);
    }
    if (text instanceof Api.TextUrl) {
        const inner = renderRichText(text.text, mode);
        if (mode === "html") {
            return `<a href="${_escapeHtml(text.url)}">${inner}</a>`;
        }
        if (mode === "md") {
            return `[${inner}](${text.url})`;
        }
        return inner;
    }
    if (text instanceof Api.TextEmail) {
        const inner = renderRichText(text.text, mode);
        if (mode === "html") {
            return `<a href="mailto:${_escapeHtml(text.email)}">${inner}</a>`;
        }
        return inner;
    }
    if (text instanceof Api.TextPhone) {
        return renderRichText(text.text, mode);
    }
    if (text instanceof Api.TextAnchor) {
        const inner = renderRichText(text.text, mode);
        return mode === "html"
            ? `<a id="${_escapeHtml(text.name)}">${inner}</a>`
            : inner;
    }
    if (text instanceof Api.TextMentionName) {
        const inner = renderRichText(text.text, mode);
        if (mode === "html") {
            return `<a href="tg://user?id=${text.userId}">${inner}</a>`;
        }
        return inner;
    }
    if (text instanceof Api.TextCustomEmoji) {
        return _plain(text.alt, mode);
    }
    if (text instanceof Api.TextImage) {
        return mode === "html"
            ? `<img data-document-id="${text.documentId}">`
            : "";
    }
    if (text instanceof Api.TextMath) {
        return _tag(_plain(text.source, mode), mode, "code", "`");
    }
    if (text instanceof Api.TextDiff) {
        return renderRichText(text.text, mode);
    }
    const nested = (text as any).text;
    if (nested && typeof nested === "object") {
        return renderRichText(nested, mode);
    }
    return "";
}

function _renderCaption(
    caption: Api.TypePageCaption | undefined,
    mode: RenderMode
): string {
    if (!caption || !(caption instanceof Api.PageCaption)) {
        return "";
    }
    const parts = [
        renderRichText(caption.text, mode),
        renderRichText(caption.credit, mode),
    ].filter(Boolean);
    return parts.join(mode === "html" ? " — " : " — ");
}

function _checkbox(item: { checkbox?: boolean; checked?: boolean }): string {
    if (!item.checkbox) {
        return "";
    }
    return item.checked ? "[x] " : "[ ] ";
}

function _renderBlock(block: Api.TypePageBlock, mode: RenderMode): string {
    if (block instanceof Api.PageBlockTitle) {
        const inner = renderRichText(block.text, mode);
        if (mode === "html") return `<h1>${inner}</h1>`;
        if (mode === "md") return `# ${inner}`;
        return inner;
    }
    if (block instanceof Api.PageBlockSubtitle) {
        const inner = renderRichText(block.text, mode);
        if (mode === "html") return `<h2>${inner}</h2>`;
        if (mode === "md") return `## ${inner}`;
        return inner;
    }
    if (block instanceof Api.PageBlockHeader) {
        const inner = renderRichText(block.text, mode);
        if (mode === "html") return `<h3>${inner}</h3>`;
        if (mode === "md") return `### ${inner}`;
        return inner;
    }
    if (block instanceof Api.PageBlockSubheader) {
        const inner = renderRichText(block.text, mode);
        if (mode === "html") return `<h4>${inner}</h4>`;
        if (mode === "md") return `#### ${inner}`;
        return inner;
    }
    for (const [cls, level] of [
        [Api.PageBlockHeading1, 1],
        [Api.PageBlockHeading2, 2],
        [Api.PageBlockHeading3, 3],
        [Api.PageBlockHeading4, 4],
        [Api.PageBlockHeading5, 5],
        [Api.PageBlockHeading6, 6],
    ] as const) {
        if (block instanceof cls) {
            const inner = renderRichText((block as any).text, mode);
            if (mode === "html") return `<h${level}>${inner}</h${level}>`;
            if (mode === "md") return `${"#".repeat(level)} ${inner}`;
            return inner;
        }
    }
    if (block instanceof Api.PageBlockParagraph) {
        const inner = renderRichText(block.text, mode);
        return mode === "html" ? `<p>${inner}</p>` : inner;
    }
    if (block instanceof Api.PageBlockKicker) {
        const inner = renderRichText(block.text, mode);
        return mode === "html" ? `<p>${inner}</p>` : inner;
    }
    if (block instanceof Api.PageBlockFooter) {
        const inner = renderRichText(block.text, mode);
        return mode === "html" ? `<footer>${inner}</footer>` : inner;
    }
    if (block instanceof Api.PageBlockPreformatted) {
        if (mode === "html") {
            return `<pre>${renderRichText(block.text, "html")}</pre>`;
        }
        const raw = renderRichText(block.text, "text");
        if (mode === "md") {
            return "```" + (block.language || "") + "\n" + raw + "\n```";
        }
        return raw;
    }
    if (
        block instanceof Api.PageBlockBlockquote ||
        block instanceof Api.PageBlockPullquote
    ) {
        const inner = renderRichText(block.text, mode);
        const caption = renderRichText(block.caption, mode);
        if (mode === "html") {
            return `<blockquote>${inner}${
                caption ? `<footer>${caption}</footer>` : ""
            }</blockquote>`;
        }
        if (mode === "md") {
            const quoted = inner
                .split("\n")
                .map((line) => `> ${line}`)
                .join("\n");
            return caption ? `${quoted}\n> — ${caption}` : quoted;
        }
        return caption ? `${inner} — ${caption}` : inner;
    }
    if (block instanceof Api.PageBlockBlockquoteBlocks) {
        const inner = renderBlocks(block.blocks, mode);
        const caption = renderRichText(block.caption, mode);
        if (mode === "html") {
            return `<blockquote>${inner}${
                caption ? `<footer>${caption}</footer>` : ""
            }</blockquote>`;
        }
        if (mode === "md") {
            const quoted = inner
                .split("\n")
                .map((line) => `> ${line}`)
                .join("\n");
            return caption ? `${quoted}\n> — ${caption}` : quoted;
        }
        return caption ? `${inner} — ${caption}` : inner;
    }
    if (block instanceof Api.PageBlockDivider) {
        if (mode === "html") return "<hr>";
        if (mode === "md") return "---";
        return "———";
    }
    if (block instanceof Api.PageBlockAnchor) {
        return mode === "html" ? `<a id="${_escapeHtml(block.name)}"></a>` : "";
    }
    if (block instanceof Api.PageBlockList) {
        const items = block.items.map((item) => {
            let inner = "";
            let check = "";
            if (item instanceof Api.PageListItemText) {
                inner = renderRichText(item.text, mode);
                check = _checkbox(item);
            } else if (item instanceof Api.PageListItemBlocks) {
                inner = renderBlocks(item.blocks, mode);
                check = _checkbox(item);
            }
            if (mode === "html") return `<li>${check}${inner}</li>`;
            return `- ${check}${inner}`;
        });
        if (mode === "html") return `<ul>${items.join("")}</ul>`;
        return items.join("\n");
    }
    if (block instanceof Api.PageBlockOrderedList) {
        const items = block.items.map((item, index) => {
            let inner = "";
            let check = "";
            let num: string | undefined;
            if (item instanceof Api.PageListOrderedItemText) {
                inner = renderRichText(item.text, mode);
                check = _checkbox(item);
                num = item.num;
            } else if (item instanceof Api.PageListOrderedItemBlocks) {
                inner = renderBlocks(item.blocks, mode);
                check = _checkbox(item);
                num = item.num;
            }
            if (mode === "html") return `<li>${check}${inner}</li>`;
            return `${num ?? index + 1}. ${check}${inner}`;
        });
        if (mode === "html") {
            const start =
                block.start != undefined ? ` start="${block.start}"` : "";
            return `<ol${start}>${items.join("")}</ol>`;
        }
        return items.join("\n");
    }
    if (block instanceof Api.PageBlockTable) {
        const title = renderRichText(block.title, mode);
        const rows = block.rows.map((row) =>
            row.cells.map((cell) =>
                cell.text ? renderRichText(cell.text, mode) : ""
            )
        );
        if (mode === "html") {
            const body = block.rows
                .map((row, i) => {
                    const cells = row.cells
                        .map((cell) => {
                            const tag = cell.header ? "th" : "td";
                            const attrs = [
                                cell.colspan ? ` colspan="${cell.colspan}"` : "",
                                cell.rowspan ? ` rowspan="${cell.rowspan}"` : "",
                            ].join("");
                            const inner = cell.text
                                ? renderRichText(cell.text, "html")
                                : "";
                            return `<${tag}${attrs}>${inner}</${tag}>`;
                        })
                        .join("");
                    return `<tr>${cells}</tr>`;
                })
                .join("");
            return `${title ? `<p>${title}</p>` : ""}<table>${body}</table>`;
        }
        if (mode === "md" && rows.length) {
            const header = rows[0];
            const lines = [
                `| ${header.join(" | ")} |`,
                `| ${header.map(() => "---").join(" | ")} |`,
                ...rows
                    .slice(1)
                    .map((cells) => `| ${cells.join(" | ")} |`),
            ];
            return (title ? `${title}\n` : "") + lines.join("\n");
        }
        return [title, ...rows.map((cells) => cells.join(" | "))]
            .filter(Boolean)
            .join("\n");
    }
    if (block instanceof Api.PageBlockPhoto) {
        const caption = _renderCaption(block.caption, mode);
        if (mode === "html") {
            return `<figure><img data-photo-id="${block.photoId}">${
                caption ? `<figcaption>${caption}</figcaption>` : ""
            }</figure>`;
        }
        return caption ? `[photo: ${caption}]` : "[photo]";
    }
    if (block instanceof Api.PageBlockVideo) {
        const caption = _renderCaption(block.caption, mode);
        if (mode === "html") {
            return `<figure><video data-document-id="${block.videoId}"></video>${
                caption ? `<figcaption>${caption}</figcaption>` : ""
            }</figure>`;
        }
        return caption ? `[video: ${caption}]` : "[video]";
    }
    if (block instanceof Api.PageBlockAudio) {
        const caption = _renderCaption(block.caption, mode);
        if (mode === "html") {
            return `<audio data-document-id="${block.audioId}"></audio>`;
        }
        return caption ? `[audio: ${caption}]` : "[audio]";
    }
    if (
        block instanceof Api.PageBlockCollage ||
        block instanceof Api.PageBlockSlideshow
    ) {
        const inner = renderBlocks(block.items, mode);
        const caption = _renderCaption(block.caption, mode);
        if (mode === "html") {
            return `<div>${inner}${
                caption ? `<figcaption>${caption}</figcaption>` : ""
            }</div>`;
        }
        return [inner, caption].filter(Boolean).join("\n");
    }
    if (block instanceof Api.PageBlockCover) {
        return _renderBlock(block.cover, mode);
    }
    if (block instanceof Api.PageBlockDetails) {
        const title = renderRichText(block.title, mode);
        const inner = renderBlocks(block.blocks, mode);
        if (mode === "html") {
            return `<details${block.open ? " open" : ""}><summary>${title}</summary>${inner}</details>`;
        }
        return [title, inner].filter(Boolean).join("\n");
    }
    if (block instanceof Api.PageBlockMath) {
        if (mode === "html") return `<code>${_escapeHtml(block.source)}</code>`;
        if (mode === "md") return "```\n" + block.source + "\n```";
        return block.source;
    }
    if (block instanceof Api.PageBlockThinking) {
        return renderRichText(block.text, mode);
    }
    if (block instanceof Api.PageBlockAuthorDate) {
        return renderRichText(block.author, mode);
    }
    if (block instanceof Api.PageBlockUnsupported) {
        return "";
    }
    const anyBlock = block as any;
    if (anyBlock.text && typeof anyBlock.text === "object") {
        return renderRichText(anyBlock.text, mode);
    }
    if (Array.isArray(anyBlock.blocks)) {
        return renderBlocks(anyBlock.blocks, mode);
    }
    if (Array.isArray(anyBlock.items)) {
        return renderBlocks(anyBlock.items, mode);
    }
    return "";
}

/** @hidden */
export function renderBlocks(
    pageBlocks: Api.TypePageBlock[],
    mode: RenderMode
): string {
    const parts = pageBlocks
        .map((block) => _renderBlock(block, mode))
        .filter((part) => part !== "");
    if (mode === "html") {
        return parts.join("");
    }
    return parts.join("\n\n");
}

type RichSource = Api.RichMessage | Api.TypePageBlock[];

function _blocksOf(source: RichSource): Api.TypePageBlock[] {
    return Array.isArray(source) ? source : source.blocks;
}

/** Renders a rich message to plain text. */
export function toPlainText(source: RichSource): string {
    return renderBlocks(_blocksOf(source), "text");
}

/** Renders a rich message to Markdown. */
export function toMarkdown(source: RichSource): string {
    return renderBlocks(_blocksOf(source), "md");
}

/** Renders a rich message to HTML. Media are emitted as tags with `data-photo-id`/`data-document-id` attributes pointing into `richMessage.photos`/`documents`. */
export function toHtml(source: RichSource): string {
    return renderBlocks(_blocksOf(source), "html");
}
