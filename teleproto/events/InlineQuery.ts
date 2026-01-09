import { Api } from "../tl";
import type { TelegramClient } from "..";
import type { Entity, EntityLike } from "../define";
import { EventBuilder, EventCommonSender, _intoIdSet } from "./common";
import bigInt from "big-integer";

export interface InlineQueryInterface {
    /**
     * Filter by users. Only inline queries from these users will be handled.
     */
    users?: EntityLike[];
    /**
     * Whether to treat the users as a blacklist.
     */
    blacklistUsers?: boolean;
    /**
     * Pattern to match against the query text.
     * Can be a string (will be compiled to regex) or RegExp.
     */
    pattern?: string | RegExp;
    /**
     * Custom filter function.
     */
    func?: CallableFunction;
}

type InlineQueryUpdate = Api.UpdateBotInlineQuery | Api.UpdateBotInlineSend;

/**
 * Occurs when a user sends an inline query to your bot (e.g., @bot query).
 *
 * @remarks
 * This event only works for bot accounts.
 *
 * @example
 * ```ts
 * client.addEventHandler(async (event: InlineQueryEvent) => {
 *     console.log(`Query: ${event.text}`);
 *
 *     // Respond with results
 *     await event.answer([
 *         event.builder.article("Title", { text: "Content", description: "Description" })
 *     ]);
 * }, new InlineQuery({}));
 *
 * // With pattern matching
 * client.addEventHandler(async (event: InlineQueryEvent) => {
 *     console.log(`Matched: ${event.patternMatch?.[1]}`);
 * }, new InlineQuery({ pattern: /search (.+)/ }));
 * ```
 */
export class InlineQuery extends EventBuilder {
    private _users?: string[];
    private _blacklistUsers: boolean;
    private _pattern?: RegExp;

    constructor(params: InlineQueryInterface = {}) {
        super({
            chats: params.users,
            blacklistChats: params.blacklistUsers,
            func: params.func,
        });
        this._blacklistUsers = params.blacklistUsers ?? false;
        if (params.pattern) {
            this._pattern = typeof params.pattern === "string"
                ? new RegExp(params.pattern)
                : params.pattern;
        }
    }

    async _resolve(client: TelegramClient) {
        await super._resolve(client);
        this._users = this.chats;
    }

    build(update: Api.TypeUpdate): InlineQueryEvent | undefined {
        if (update instanceof Api.UpdateBotInlineQuery) {
            return new InlineQueryEvent(update);
        }
        if (update instanceof Api.UpdateBotInlineSend) {
            return new InlineQueryEvent(update);
        }
        return undefined;
    }

    filter(event: InlineQueryEvent): InlineQueryEvent | undefined {
        // Filter by users
        if (this._users !== undefined) {
            const userIdStr = event.userId?.toString();
            if (!userIdStr) return undefined;
            const inside = this._users.includes(userIdStr);
            if (inside === this._blacklistUsers) {
                return undefined;
            }
        }

        // Apply pattern matching
        if (this._pattern && event.text) {
            const match = event.text.match(this._pattern);
            if (!match) {
                return undefined;
            }
            event._patternMatch = match;
        }

        if (this.func && !this.func(event)) {
            return undefined;
        }

        return event;
    }
}

/**
 * Helper class for building inline query results.
 */
export class InlineBuilder {
    private _resultId: number = 0;

    private _nextId(): string {
        return String(this._resultId++);
    }

    /**
     * Creates an article result.
     */
    article(
        title: string,
        params: {
            id?: string;
            description?: string;
            text?: string;
            parseMode?: string;
            entities?: Api.TypeMessageEntity[];
            url?: string;
            thumb?: Api.TypeInputWebDocument;
            content?: Api.TypeInputWebDocument;
            linkPreview?: boolean;
            replyMarkup?: Api.TypeReplyMarkup;
        } = {}
    ): Api.InputBotInlineResult {
        const sendMessage = new Api.InputBotInlineMessageText({
            message: params.text ?? "",
            entities: params.entities,
            noWebpage: params.linkPreview === false,
            replyMarkup: params.replyMarkup,
        });

        return new Api.InputBotInlineResult({
            id: params.id ?? this._nextId(),
            type: "article",
            title,
            description: params.description,
            url: params.url,
            thumb: params.thumb,
            content: params.content,
            sendMessage,
        });
    }

    /**
     * Creates a photo result from an existing photo.
     */
    photo(
        photo: Api.TypeInputPhoto,
        params: {
            id?: string;
            text?: string;
            entities?: Api.TypeMessageEntity[];
            replyMarkup?: Api.TypeReplyMarkup;
        } = {}
    ): Api.InputBotInlineResultPhoto {
        const sendMessage = new Api.InputBotInlineMessageMediaAuto({
            message: params.text ?? "",
            entities: params.entities,
            replyMarkup: params.replyMarkup,
        });

        return new Api.InputBotInlineResultPhoto({
            id: params.id ?? this._nextId(),
            type: "photo",
            photo,
            sendMessage,
        });
    }

    /**
     * Creates a document result.
     */
    document(
        document: Api.TypeInputDocument,
        params: {
            id?: string;
            type?: string;
            title?: string;
            description?: string;
            text?: string;
            entities?: Api.TypeMessageEntity[];
            replyMarkup?: Api.TypeReplyMarkup;
        } = {}
    ): Api.InputBotInlineResultDocument {
        const sendMessage = new Api.InputBotInlineMessageMediaAuto({
            message: params.text ?? "",
            entities: params.entities,
            replyMarkup: params.replyMarkup,
        });

        return new Api.InputBotInlineResultDocument({
            id: params.id ?? this._nextId(),
            type: params.type ?? "file",
            title: params.title,
            description: params.description,
            document,
            sendMessage,
        });
    }

    /**
     * Creates a game result.
     */
    game(
        shortName: string,
        params: {
            id?: string;
            replyMarkup?: Api.TypeReplyMarkup;
        } = {}
    ): Api.InputBotInlineResultGame {
        const sendMessage = new Api.InputBotInlineMessageGame({
            replyMarkup: params.replyMarkup,
        });

        return new Api.InputBotInlineResultGame({
            id: params.id ?? this._nextId(),
            shortName,
            sendMessage,
        });
    }

    /**
     * Creates a geo location result.
     */
    geo(
        geoPoint: Api.TypeInputGeoPoint,
        params: {
            id?: string;
            title?: string;
            description?: string;
            heading?: number;
            period?: number;
            proximityNotificationRadius?: number;
            replyMarkup?: Api.TypeReplyMarkup;
        } = {}
    ): Api.InputBotInlineResult {
        const sendMessage = new Api.InputBotInlineMessageMediaGeo({
            geoPoint,
            heading: params.heading,
            period: params.period,
            proximityNotificationRadius: params.proximityNotificationRadius,
            replyMarkup: params.replyMarkup,
        });

        return new Api.InputBotInlineResult({
            id: params.id ?? this._nextId(),
            type: "geo",
            title: params.title,
            description: params.description,
            sendMessage,
        });
    }

    /**
     * Creates a venue result.
     */
    venue(
        geoPoint: Api.TypeInputGeoPoint,
        title: string,
        address: string,
        params: {
            id?: string;
            description?: string;
            provider?: string;
            venueId?: string;
            venueType?: string;
            replyMarkup?: Api.TypeReplyMarkup;
        } = {}
    ): Api.InputBotInlineResult {
        const sendMessage = new Api.InputBotInlineMessageMediaVenue({
            geoPoint,
            title,
            address,
            provider: params.provider ?? "",
            venueId: params.venueId ?? "",
            venueType: params.venueType ?? "",
            replyMarkup: params.replyMarkup,
        });

        return new Api.InputBotInlineResult({
            id: params.id ?? this._nextId(),
            type: "venue",
            title,
            description: params.description,
            sendMessage,
        });
    }

    /**
     * Creates a contact result.
     */
    contact(
        phoneNumber: string,
        firstName: string,
        params: {
            id?: string;
            lastName?: string;
            vcard?: string;
            description?: string;
            replyMarkup?: Api.TypeReplyMarkup;
        } = {}
    ): Api.InputBotInlineResult {
        const sendMessage = new Api.InputBotInlineMessageMediaContact({
            phoneNumber,
            firstName,
            lastName: params.lastName ?? "",
            vcard: params.vcard ?? "",
            replyMarkup: params.replyMarkup,
        });

        return new Api.InputBotInlineResult({
            id: params.id ?? this._nextId(),
            type: "contact",
            title: firstName,
            description: params.description,
            sendMessage,
        });
    }
}

/**
 * Represents an inline query event.
 */
export class InlineQueryEvent extends EventCommonSender {
    _eventName = "InlineQuery";

    originalUpdate: InlineQueryUpdate & { _entities?: Map<string, Entity> };
    private _userId: bigInt.BigInteger;
    private _queryId?: bigInt.BigInteger;
    private _text: string;
    private _offset: string;
    private _geo?: Api.TypeGeoPoint;
    private _peerType?: Api.TypeInlineQueryPeerType;
    private _resultId?: string;
    private _msgId?: Api.TypeInputBotInlineMessageID;
    private _isChosen: boolean;
    _patternMatch?: RegExpMatchArray;
    private _builder?: InlineBuilder;
    private _answered: boolean = false;

    constructor(update: InlineQueryUpdate) {
        super({});

        this.originalUpdate = update;
        this._isChosen = update instanceof Api.UpdateBotInlineSend;

        if (update instanceof Api.UpdateBotInlineQuery) {
            this._userId = update.userId;
            this._queryId = update.queryId;
            this._text = update.query;
            this._offset = update.offset;
            this._geo = update.geo;
            this._peerType = update.peerType;
        } else {
            // UpdateBotInlineSend
            this._userId = update.userId;
            this._text = update.query;
            this._offset = "";
            this._geo = update.geo;
            this._resultId = update.id;
            this._msgId = update.msgId;
        }
    }

    /**
     * The unique query ID.
     */
    get id(): bigInt.BigInteger | undefined {
        return this._queryId;
    }

    /**
     * The query text sent by the user.
     */
    get text(): string {
        return this._text;
    }

    /**
     * Alias for text.
     */
    get query(): string {
        return this._text;
    }

    /**
     * The offset for pagination.
     */
    get offset(): string {
        return this._offset;
    }

    /**
     * The user ID who sent the query.
     */
    get userId(): bigInt.BigInteger {
        return this._userId;
    }

    /**
     * The geographic location of the user (if shared).
     */
    get geo(): Api.TypeGeoPoint | undefined {
        return this._geo;
    }

    /**
     * The type of peer from which the query was sent.
     */
    get peerType(): Api.TypeInlineQueryPeerType | undefined {
        return this._peerType;
    }

    /**
     * Whether this is a "chosen result" event (UpdateBotInlineSend).
     */
    get isChosen(): boolean {
        return this._isChosen;
    }

    /**
     * The chosen result ID (only for UpdateBotInlineSend).
     */
    get resultId(): string | undefined {
        return this._resultId;
    }

    /**
     * The message ID of the sent inline message (only for UpdateBotInlineSend).
     */
    get msgId(): Api.TypeInputBotInlineMessageID | undefined {
        return this._msgId;
    }

    /**
     * The regex pattern match result (if pattern was set in InlineQuery).
     */
    get patternMatch(): RegExpMatchArray | undefined {
        return this._patternMatch;
    }

    /**
     * A helper to build inline results.
     */
    get builder(): InlineBuilder {
        if (!this._builder) {
            this._builder = new InlineBuilder();
        }
        return this._builder;
    }

    /**
     * Whether this query has already been answered.
     */
    get answered(): boolean {
        return this._answered;
    }

    /**
     * Answer the inline query with results.
     *
     * @param results - Array of inline results (max 50)
     * @param params - Additional parameters
     */
    async answer(
        results: Api.TypeInputBotInlineResult[] = [],
        params: {
            cacheTime?: number;
            gallery?: boolean;
            private?: boolean;
            nextOffset?: string;
            switchPm?: { text: string; startParam: string };
            switchWebview?: { text: string; url: string };
        } = {}
    ): Promise<boolean> {
        if (!this._client || !this._queryId) {
            return false;
        }

        if (this._answered) {
            return false;
        }

        if (results.length > 50) {
            throw new Error("Cannot send more than 50 inline results");
        }

        let switchPm: Api.InlineBotSwitchPM | undefined;
        if (params.switchPm) {
            switchPm = new Api.InlineBotSwitchPM({
                text: params.switchPm.text,
                startParam: params.switchPm.startParam,
            });
        }

        let switchWebview: Api.InlineBotWebView | undefined;
        if (params.switchWebview) {
            switchWebview = new Api.InlineBotWebView({
                text: params.switchWebview.text,
                url: params.switchWebview.url,
            });
        }

        try {
            await this._client.invoke(
                new Api.messages.SetInlineBotResults({
                    queryId: this._queryId,
                    results,
                    cacheTime: params.cacheTime ?? 0,
                    gallery: params.gallery,
                    private: params.private,
                    nextOffset: params.nextOffset,
                    switchPm,
                    switchWebview,
                })
            );
            this._answered = true;
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get the user who sent the query.
     */
    async getUser(): Promise<Api.User | undefined> {
        if (!this._client) return undefined;
        try {
            const entity = await this._client.getEntity(
                new Api.PeerUser({ userId: this._userId })
            );
            if (entity instanceof Api.User) {
                return entity;
            }
        } catch {
            return undefined;
        }
        return undefined;
    }
}
