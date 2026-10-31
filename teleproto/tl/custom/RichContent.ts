import { Api } from "../api";
import { getInputDocument, getInputPhoto, getInputUser } from "../../Utils";
import { referencesOf, text, type RichReference, type RichTextLike } from "./richText";

export interface RichContentOptions {
    /** Right-to-left layout. */
    rtl?: boolean;
    /** Do not link URLs, emails and phone numbers automatically. */
    noAutolink?: boolean;
}

/** Nested content: a {@link RichContent}, or a callback that fills a new one. */
export type RichContentLike = RichContent | ((content: RichContent) => unknown);

export interface RichCaptionOptions {
    caption?: RichTextLike;
    credit?: RichTextLike;
}

/** A list item: text, nested content, or either with a checkbox. */
export type RichListItem =
    | RichTextLike
    | RichContent
    | { text: RichTextLike; checked?: boolean }
    | { content: RichContentLike; checked?: boolean };

export interface RichListOptions {
    ordered?: boolean;
    /** Number of the first item of an ordered list. */
    start?: number;
    reversed?: boolean;
}

/** A table cell: text, or text with layout. */
export type RichTableCell =
    | RichTextLike
    | {
          text?: RichTextLike;
          header?: boolean;
          colspan?: number;
          rowspan?: number;
          align?: "left" | "center" | "right";
          valign?: "top" | "middle" | "bottom";
      };

export interface RichTableOptions {
    title?: RichTextLike;
    bordered?: boolean;
    striped?: boolean;
    compact?: boolean;
    /** Render the first row as a header. */
    header?: boolean;
}

type RichPhoto = Api.TypeInputPhoto | Api.TypePhoto;
type RichDocument = Api.TypeInputDocument | Api.TypeDocument;

/**
 * Builds a rich message block by block. Pass it as `richMessage` when sending or editing.
 * Media and users it refers to are attached for you, and {@link block} takes any raw page block.
 */
export class RichContent {
    private readonly blocks: Api.TypePageBlock[] = [];
    private readonly photos = new Map<string, Api.InputPhoto>();
    private readonly documents = new Map<string, Api.InputDocument>();
    private readonly users = new Map<string, Api.InputUser>();

    constructor(private readonly options: RichContentOptions = {}) {}

    title(...parts: RichTextLike[]): this {
        return this.push(new Api.PageBlockTitle({ text: this.text(parts) }));
    }

    subtitle(...parts: RichTextLike[]): this {
        return this.push(new Api.PageBlockSubtitle({ text: this.text(parts) }));
    }

    /** A small line above the title. */
    kicker(...parts: RichTextLike[]): this {
        return this.push(new Api.PageBlockKicker({ text: this.text(parts) }));
    }

    heading(level: 1 | 2 | 3 | 4 | 5 | 6, ...parts: RichTextLike[]): this {
        const Heading = [
            Api.PageBlockHeading1,
            Api.PageBlockHeading2,
            Api.PageBlockHeading3,
            Api.PageBlockHeading4,
            Api.PageBlockHeading5,
            Api.PageBlockHeading6,
        ][level - 1];
        return this.push(new Heading({ text: this.text(parts) }));
    }

    paragraph(...parts: RichTextLike[]): this {
        return this.push(new Api.PageBlockParagraph({ text: this.text(parts) }));
    }

    footer(...parts: RichTextLike[]): this {
        return this.push(new Api.PageBlockFooter({ text: this.text(parts) }));
    }

    byline(author: RichTextLike, published: Date | number): this {
        const seconds = typeof published === "number" ? published : Math.floor(published.getTime() / 1000);
        return this.push(new Api.PageBlockAuthorDate({ author: this.text([author]), publishedDate: seconds }));
    }

    code(source: string, language = ""): this {
        return this.push(new Api.PageBlockPreformatted({ text: text(source), language }));
    }

    /** A TeX formula block. */
    math(source: string): this {
        return this.push(new Api.PageBlockMath({ source }));
    }

    divider(): this {
        return this.push(new Api.PageBlockDivider());
    }

    anchor(name: string): this {
        return this.push(new Api.PageBlockAnchor({ name }));
    }

    /** A quote of text, or of nested blocks. */
    quote(body: RichTextLike | RichContentLike, options: { caption?: RichTextLike; collapsed?: boolean } = {}): this {
        const caption = this.text([options.caption ?? []]);
        if (body instanceof RichContent || typeof body === "function") {
            return this.push(new Api.PageBlockBlockquoteBlocks({ blocks: this.nested(body), caption }));
        }
        return this.push(new Api.PageBlockBlockquote({ text: this.text([body]), caption, collapsed: options.collapsed }));
    }

    pullquote(body: RichTextLike, caption?: RichTextLike): this {
        return this.push(new Api.PageBlockPullquote({ text: this.text([body]), caption: this.text([caption ?? []]) }));
    }

    list(items: readonly RichListItem[], options: RichListOptions = {}): this {
        if (!options.ordered) {
            return this.push(new Api.PageBlockList({ items: items.map((item) => this.listItem(item)) }));
        }
        return this.push(
            new Api.PageBlockOrderedList({
                items: items.map((item) => this.orderedItem(item)),
                start: options.start,
                reversed: options.reversed,
            })
        );
    }

    photo(photo: RichPhoto, options: RichCaptionOptions & { spoiler?: boolean; url?: string } = {}): this {
        const input = this.attachPhoto(photo);
        return this.push(
            new Api.PageBlockPhoto({ photoId: input.id, caption: this.caption(options), spoiler: options.spoiler, url: options.url })
        );
    }

    video(document: RichDocument, options: RichCaptionOptions & { autoplay?: boolean; loop?: boolean; spoiler?: boolean } = {}): this {
        const input = this.attachDocument(document);
        return this.push(
            new Api.PageBlockVideo({
                videoId: input.id,
                caption: this.caption(options),
                autoplay: options.autoplay,
                loop: options.loop,
                spoiler: options.spoiler,
            })
        );
    }

    audio(document: RichDocument, options: RichCaptionOptions = {}): this {
        const input = this.attachDocument(document);
        return this.push(new Api.PageBlockAudio({ audioId: input.id, caption: this.caption(options) }));
    }

    document(document: RichDocument, options: RichCaptionOptions = {}): this {
        const input = this.attachDocument(document);
        return this.push(new Api.PageBlockDocument({ documentId: input.id, caption: this.caption(options) }));
    }

    /** A cover made of the first block of `content`, usually a photo or video. */
    cover(content: RichContentLike): this {
        const [cover] = this.nested(content);
        if (!cover) throw new Error("A rich cover needs a block");
        return this.push(new Api.PageBlockCover({ cover }));
    }

    collage(content: RichContentLike, options: RichCaptionOptions = {}): this {
        return this.push(new Api.PageBlockCollage({ items: this.nested(content), caption: this.caption(options) }));
    }

    slideshow(content: RichContentLike, options: RichCaptionOptions = {}): this {
        return this.push(new Api.PageBlockSlideshow({ items: this.nested(content), caption: this.caption(options) }));
    }

    table(rows: readonly (readonly RichTableCell[])[], options: RichTableOptions = {}): this {
        return this.push(
            new Api.PageBlockTable({
                title: this.text([options.title ?? []]),
                bordered: options.bordered,
                striped: options.striped,
                compact: options.compact,
                rows: rows.map(
                    (row, index) => new Api.PageTableRow({ cells: row.map((cell) => this.tableCell(cell, !!options.header && index === 0)) })
                ),
            })
        );
    }

    /** A collapsible section. */
    details(title: RichTextLike, content: RichContentLike, options: { open?: boolean } = {}): this {
        return this.push(new Api.PageBlockDetails({ title: this.text([title]), blocks: this.nested(content), open: options.open }));
    }

    map(geo: Api.TypeInputGeoPoint, options: RichCaptionOptions & { zoom: number; width: number; height: number }): this {
        return this.push(
            new Api.InputPageBlockMap({ geo, zoom: options.zoom, w: options.width, h: options.height, caption: this.caption(options) })
        );
    }

    embed(
        source: { url: string } | { html: string },
        options: RichCaptionOptions & { width?: number; height?: number; fullWidth?: boolean; allowScrolling?: boolean } = {}
    ): this {
        return this.push(
            new Api.PageBlockEmbed({
                ...source,
                w: options.width,
                h: options.height,
                fullWidth: options.fullWidth,
                allowScrolling: options.allowScrolling,
                caption: this.caption(options),
            })
        );
    }

    /** Adds raw page blocks, for anything without a dedicated method. */
    block(...blocks: Api.TypePageBlockIn[]): this {
        for (const block of blocks) {
            this.collect(referencesOf(block));
            this.blocks.push(block as Api.TypePageBlock);
        }
        return this;
    }

    /** Attaches media or users that raw blocks refer to by id. */
    attach(...items: (RichPhoto | RichDocument | Api.TypeInputUser | Api.User)[]): this {
        for (const item of items) {
            if (item instanceof Api.User || item.SUBCLASS_OF_ID === Api.InputUser.prototype.SUBCLASS_OF_ID) this.attachUser(item as Api.User);
            else if (item instanceof Api.Photo || item.SUBCLASS_OF_ID === Api.InputPhoto.prototype.SUBCLASS_OF_ID) this.attachPhoto(item as RichPhoto);
            else this.attachDocument(item as RichDocument);
        }
        return this;
    }

    /** The `InputRichMessage` to send. */
    build(): Api.InputRichMessage {
        return new Api.InputRichMessage({
            blocks: [...this.blocks],
            rtl: this.options.rtl,
            noautolink: this.options.noAutolink,
            photos: this.photos.size ? [...this.photos.values()] : undefined,
            documents: this.documents.size ? [...this.documents.values()] : undefined,
            users: this.users.size ? [...this.users.values()] : undefined,
        });
    }

    private push(block: Api.TypePageBlock): this {
        this.blocks.push(block);
        return this;
    }

    private text(parts: readonly RichTextLike[]): Api.TypeRichText {
        const value = text(...parts);
        this.collect(referencesOf(value));
        return value;
    }

    private caption(options: RichCaptionOptions): Api.PageCaption {
        return new Api.PageCaption({ text: this.text([options.caption ?? []]), credit: this.text([options.credit ?? []]) });
    }

    private nested(content: RichContentLike): Api.TypePageBlock[] {
        const child = content instanceof RichContent ? content : new RichContent();
        if (typeof content === "function") content(child);
        for (const photo of child.photos.values()) this.photos.set(photo.id.toString(), photo);
        for (const document of child.documents.values()) this.documents.set(document.id.toString(), document);
        for (const user of child.users.values()) this.users.set(user.userId.toString(), user);
        return [...child.blocks];
    }

    private listItem(item: RichListItem): Api.TypePageListItem {
        const checkbox = typeof item === "object" && item !== null && "checked" in item && item.checked !== undefined;
        const checked = checkbox ? (item as { checked?: boolean }).checked : undefined;
        if (item instanceof RichContent) return new Api.PageListItemBlocks({ blocks: this.nested(item) });
        if (typeof item === "object" && item !== null && "content" in item) {
            return new Api.PageListItemBlocks({ blocks: this.nested(item.content), checkbox, checked });
        }
        if (typeof item === "object" && item !== null && !Array.isArray(item) && "text" in item && !("_" in item) && !("className" in item)) {
            return new Api.PageListItemText({ text: this.text([item.text]), checkbox, checked });
        }
        return new Api.PageListItemText({ text: this.text([item as RichTextLike]) });
    }

    private orderedItem(item: RichListItem): Api.TypePageListOrderedItem {
        const plain = this.listItem(item);
        return plain instanceof Api.PageListItemBlocks
            ? new Api.PageListOrderedItemBlocks({ blocks: plain.blocks, checkbox: plain.checkbox, checked: plain.checked })
            : new Api.PageListOrderedItemText({ text: plain.text, checkbox: plain.checkbox, checked: plain.checked });
    }

    private tableCell(cell: RichTableCell, header: boolean): Api.PageTableCell {
        const layout = typeof cell === "object" && cell !== null && !Array.isArray(cell) && !("_" in cell) && !("className" in cell);
        if (!layout) return new Api.PageTableCell({ text: this.text([cell as RichTextLike]), header: header || undefined });
        const options = cell as Exclude<RichTableCell, RichTextLike>;
        return new Api.PageTableCell({
            text: options.text === undefined ? undefined : this.text([options.text]),
            header: options.header ?? (header || undefined),
            colspan: options.colspan,
            rowspan: options.rowspan,
            alignCenter: options.align === "center" || undefined,
            alignRight: options.align === "right" || undefined,
            valignMiddle: options.valign === "middle" || undefined,
            valignBottom: options.valign === "bottom" || undefined,
        });
    }

    private attachPhoto(photo: RichPhoto): Api.InputPhoto {
        const input = getInputPhoto(photo);
        if (!(input instanceof Api.InputPhoto)) throw new Error("A rich photo needs a photo with an id");
        this.photos.set(input.id.toString(), input);
        return input;
    }

    private attachDocument(document: RichDocument): Api.InputDocument {
        const input = getInputDocument(document);
        if (!(input instanceof Api.InputDocument)) throw new Error("A rich media block needs a document with an id");
        this.documents.set(input.id.toString(), input);
        return input;
    }

    private attachUser(user: Api.TypeInputUser | Api.User): Api.InputUser {
        const input = getInputUser(user);
        if (!(input instanceof Api.InputUser)) throw new Error("A rich message can only refer to users with an id and access hash");
        this.users.set(input.userId.toString(), input);
        return input;
    }

    private collect(found: RichReference[]): void {
        for (const reference of found) {
            if (reference instanceof Api.InputPhoto) this.photos.set(reference.id.toString(), reference);
            else if (reference instanceof Api.InputDocument) this.documents.set(reference.id.toString(), reference);
            else this.users.set(reference.userId.toString(), reference);
        }
    }
}
