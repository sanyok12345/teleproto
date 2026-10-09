import type { BigInteger } from "big-integer";
import type { EntityLike } from "../define";
import { Api } from "../tl";
import { RequestIter } from "../requestIter";
import { TotalList, generateRandomLong } from "../Helpers";
import type { TelegramClient } from "./TelegramClient";

const PAGE_LIMIT = 100;

export interface GetWalletAddressesParams {
    addresses?: string[];
    force?: boolean;
}

export interface IterWalletTransactionsParams {
    inbound?: boolean;
    outbound?: boolean;
    offset?: string;
    limit?: number;
    waitTime?: number;
}

export interface IterWalletNftsParams {
    offset?: string;
    limit?: number;
    waitTime?: number;
}

export interface SendWalletTransferParams {
    data: Buffer;
    gaslessData?: Buffer;
    randomId?: BigInteger;
}

export type WalletTransactions = TotalList<Api.WalletTransaction> & {
    balance?: BigInteger;
};

interface WalletPage<T> {
    items: T[];
    next?: string;
    balance?: BigInteger;
}

type WalletPageFetcher<T> = (offset: string, limit: number) => Promise<WalletPage<T>>;

export class WalletCursorIter<T> extends RequestIter {
    balance?: BigInteger;
    private next?: string;
    private fetchPage?: WalletPageFetcher<T>;
    private readonly offsets = new Set<string>();

    async _init({ offset, fetchPage }: { offset: string; fetchPage: WalletPageFetcher<T> }) {
        this.next = offset;
        this.fetchPage = fetchPage;
        this.offsets.clear();
    }

    async _loadNextChunk(): Promise<boolean | undefined> {
        while (this.next !== undefined) {
            const offset = this.next;
            this.offsets.add(offset);
            const page = await this.fetchPage!(offset, Math.min(this.left, PAGE_LIMIT));
            if (page.balance !== undefined) this.balance = page.balance;
            this.buffer!.push(...page.items);
            this.next = page.next && !this.offsets.has(page.next) ? page.next : undefined;
            if (this.next === undefined) return true;
            if (page.items.length) return undefined;
        }
        return true;
    }

    [Symbol.asyncIterator](): AsyncIterator<T> {
        return super[Symbol.asyncIterator]();
    }
}

/** @hidden */
export async function getWallet(client: TelegramClient): Promise<Api.TypeWalletState> {
    return client.invoke(new Api.wallet.GetState());
}

/** @hidden */
export async function getWalletAddresses(
    client: TelegramClient,
    users: EntityLike | EntityLike[],
    params: GetWalletAddressesParams = {}
): Promise<Api.WalletUserAddress[]> {
    const result = await client.invoke(
        new Api.wallet.GetUserAddresses({
            force: params.force,
            id: Array.isArray(users) ? users : [users],
            addresses: params.addresses ?? [],
        })
    );
    return result.addresses;
}

/** @hidden */
export function iterWalletTransactions(
    client: TelegramClient,
    params: IterWalletTransactionsParams = {}
): WalletCursorIter<Api.WalletTransaction> {
    const fetchPage: WalletPageFetcher<Api.WalletTransaction> = async (offset, limit) => {
        const result = await client.invoke(
            new Api.wallet.GetTransactions({
                inbound: params.inbound,
                outbound: params.outbound,
                offset,
                limit,
            })
        );
        return {
            items: result.transactions,
            next: result.nextOffset,
            balance: result.balance,
        };
    };
    return new WalletCursorIter<Api.WalletTransaction>(
        client,
        params.limit,
        { waitTime: params.waitTime },
        { offset: params.offset ?? "", fetchPage }
    );
}

/** @hidden */
export async function getWalletTransactions(
    client: TelegramClient,
    params: IterWalletTransactionsParams = {}
): Promise<WalletTransactions> {
    const iter = iterWalletTransactions(client, params);
    const list = (await iter.collect()) as WalletTransactions;
    list.balance = iter.balance;
    return list;
}

/** @hidden */
export async function getWalletTransactionsById(
    client: TelegramClient,
    ids: string[]
): Promise<Api.WalletTransaction[]> {
    const result = await client.invoke(new Api.wallet.GetTransactionsByIDs({ id: ids }));
    return result.transactions;
}

/** @hidden */
export async function getWalletTransactionsByHash(
    client: TelegramClient,
    hashes: string[]
): Promise<Api.WalletTransaction[]> {
    const result = await client.invoke(
        new Api.wallet.GetTransactionsByMsgHash({ msgHash: hashes })
    );
    return result.transactions;
}

/** @hidden */
export function iterWalletNfts(
    client: TelegramClient,
    params: IterWalletNftsParams = {}
): WalletCursorIter<Api.wallet.NftItem> {
    const fetchPage: WalletPageFetcher<Api.wallet.NftItem> = async (offset, limit) => {
        const result = await client.invoke(new Api.wallet.GetNfts({ offset, limit }));
        return { items: result.items, next: result.nextOffset };
    };
    return new WalletCursorIter<Api.wallet.NftItem>(
        client,
        params.limit,
        { waitTime: params.waitTime },
        { offset: params.offset ?? "", fetchPage }
    );
}

/** @hidden */
export async function getWalletNfts(
    client: TelegramClient,
    params: IterWalletNftsParams = {}
): Promise<TotalList<Api.wallet.NftItem>> {
    return (await iterWalletNfts(client, params).collect()) as TotalList<Api.wallet.NftItem>;
}

/** @hidden */
export async function sendWalletTransfer(
    client: TelegramClient,
    user: EntityLike,
    params: SendWalletTransferParams
): Promise<Api.Message | undefined> {
    const entity = await client.getInputEntity(user);
    const request = new Api.wallet.SendTransfer({
        dataNormal: params.data,
        dataGasless: params.gaslessData,
        userId: entity,
        randomId: params.randomId ?? generateRandomLong(),
    });
    const result = await client.invoke(request);
    return client._getResponseMessage(request, result, entity) as Api.Message | undefined;
}

/** @hidden */
export async function getTonConnectSessions(
    client: TelegramClient
): Promise<Api.TonConnectSession[]> {
    const result = await client.invoke(new Api.wallet.TonConnectGetSessions());
    return result.sessions;
}

/** @hidden */
export async function closeTonConnectSession(
    client: TelegramClient,
    sessionId: BigInteger,
    params: { body?: Buffer } = {}
): Promise<boolean> {
    return client.invoke(
        new Api.wallet.TonConnectCloseSession({ sessionId, body: params.body })
    );
}

/** @hidden */
export async function getCurrencyRates(client: TelegramClient): Promise<Map<string, number>> {
    const result = await client.invoke(new Api.payments.GetCurrencyRates());
    return new Map(result.rates.map((rate) => [rate.currency, rate.rate]));
}
