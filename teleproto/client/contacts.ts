import type { TelegramClient } from "./TelegramClient";
import type { EntityLike } from "../define";
import { TotalList, returnBigInt } from "../Helpers";
import { Api } from "../tl";
import bigInt from "big-integer";

/** @hidden */
export async function getContacts(
    client: TelegramClient
): Promise<Api.User[]> {
    const result = await client.api.contacts.getContacts({
        hash: bigInt.zero,
    });
    if (result instanceof Api.contacts.ContactsNotModified) {
        return [];
    }
    return result.users.filter(
        (user): user is Api.User => user instanceof Api.User
    );
}

function _toNote(
    note: string | Api.TypeTextWithEntities | undefined
): Api.TypeTextWithEntities | undefined {
    if (note == undefined) {
        return undefined;
    }
    if (typeof note === "string") {
        return new Api.TextWithEntities({ text: note, entities: [] });
    }
    return note;
}

/** Parameters for {@link addContact}. */
export interface AddContactParams {
    /** The contact's first name. */
    firstName: string;
    /** The contact's last name. */
    lastName?: string;
    /** The phone number to assign. Only needed when the user's number is hidden and you know it. */
    phone?: string;
    /** Allow the contact to see your phone number even if your privacy settings would hide it. */
    addPhonePrivacyException?: boolean;
    /** Private note about this contact, visible only to you. */
    note?: string | Api.TypeTextWithEntities;
}

/** @hidden */
export async function addContact(
    client: TelegramClient,
    entity: EntityLike,
    params: AddContactParams
) {
    const user = await client.getInputEntity(entity);
    return client.invoke(
        new Api.contacts.AddContact({
            id: user as unknown as Api.TypeInputUser,
            firstName: params.firstName,
            lastName: params.lastName || "",
            phone: params.phone || "",
            addPhonePrivacyException: params.addPhonePrivacyException,
            note: _toNote(params.note),
        })
    );
}

/** @hidden */
export async function deleteContacts(
    client: TelegramClient,
    users: EntityLike | EntityLike[]
) {
    const list = Array.isArray(users) ? users : [users];
    const ids: Api.TypeInputUser[] = [];
    for (const user of list) {
        ids.push(
            (await client.getInputEntity(
                user
            )) as unknown as Api.TypeInputUser
        );
    }
    return client.invoke(new Api.contacts.DeleteContacts({ id: ids }));
}

/** One phone-book entry for {@link importContacts}. */
export interface ImportContactEntry {
    /** The contact's phone number. */
    phone: string;
    /** The contact's first name. */
    firstName: string;
    /** The contact's last name. */
    lastName?: string;
    /** Private note about this contact, visible only to you. */
    note?: string | Api.TypeTextWithEntities;
    /** Arbitrary 64-bit ID echoed back in the result to map imported entries. Defaults to the array index. */
    clientId?: number;
}

/** @hidden */
export async function importContacts(
    client: TelegramClient,
    contacts: ImportContactEntry[]
): Promise<Api.contacts.ImportedContacts> {
    return client.invoke(
        new Api.contacts.ImportContacts({
            contacts: contacts.map(
                (contact, i) =>
                    new Api.InputPhoneContact({
                        clientId: returnBigInt(contact.clientId ?? i),
                        phone: contact.phone,
                        firstName: contact.firstName,
                        lastName: contact.lastName || "",
                        note: _toNote(contact.note),
                    })
            ),
        })
    );
}

/** @hidden */
export async function block(
    client: TelegramClient,
    entity: EntityLike,
    params: { myStoriesFrom?: boolean } = {}
): Promise<boolean> {
    const peer = await client.getInputEntity(entity);
    return client.api.contacts.block({
        id: peer,
        myStoriesFrom: params.myStoriesFrom,
    });
}

/** @hidden */
export async function unblock(
    client: TelegramClient,
    entity: EntityLike,
    params: { myStoriesFrom?: boolean } = {}
): Promise<boolean> {
    const peer = await client.getInputEntity(entity);
    return client.api.contacts.unblock({
        id: peer,
        myStoriesFrom: params.myStoriesFrom,
    });
}

/** Parameters for {@link getBlocked}. */
export interface GetBlockedParams {
    /** Number of results to skip. */
    offset?: number;
    /** Maximum number of results to return. */
    limit?: number;
    /** Fetch the list of users blocked from seeing your stories instead of the main blocklist. */
    myStoriesFrom?: boolean;
}

/** @hidden */
export async function getBlocked(
    client: TelegramClient,
    params: GetBlockedParams = {}
): Promise<TotalList<Api.TypePeerBlocked>> {
    const result = await client.api.contacts.getBlocked({
        offset: params.offset ?? 0,
        limit: params.limit ?? 100,
        myStoriesFrom: params.myStoriesFrom,
    });
    const blocked = new TotalList<Api.TypePeerBlocked>();
    blocked.push(...result.blocked);
    blocked.total =
        result instanceof Api.contacts.BlockedSlice
            ? result.count
            : result.blocked.length;
    return blocked;
}
