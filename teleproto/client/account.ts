import type { TelegramClient } from "./TelegramClient";
import type { EntityLike, FileLike } from "../define";
import type { BigInteger } from "big-integer";
import { TotalList } from "../Helpers";
import * as utils from "../Utils";
import { Api } from "../tl";
import { _fileToMedia } from "./uploads";

/** Parameters for {@link updateProfile}. Only the fields you set are changed. */
export interface UpdateProfileParams {
    /** New first name. */
    firstName?: string;
    /** New last name. Pass an empty string to remove it. */
    lastName?: string;
    /** New bio ("about"). Pass an empty string to remove it. */
    about?: string;
}

/** @hidden */
export async function updateProfile(
    client: TelegramClient,
    params: UpdateProfileParams
): Promise<Api.TypeUser> {
    return client.api.account.updateProfile({
        firstName: params.firstName,
        lastName: params.lastName,
        about: params.about,
    });
}

/** @hidden */
export async function updateUsername(
    client: TelegramClient,
    username: string
): Promise<Api.TypeUser> {
    return client.api.account.updateUsername({ username: username });
}

/** @hidden */
export async function updateStatus(
    client: TelegramClient,
    online: boolean = true
): Promise<boolean> {
    return client.api.account.updateStatus({ offline: !online });
}

async function _toInputFile(
    client: TelegramClient,
    file: FileLike
): Promise<Api.TypeInputFile> {
    const { fileHandle } = await _fileToMedia(client, {
        file: file,
        asImage: true,
    });
    if (!fileHandle) {
        throw new Error(`Cannot upload ${file} as a profile photo`);
    }
    return fileHandle;
}

/** Parameters for {@link uploadProfilePhoto}. */
export interface UploadProfilePhotoParams {
    /** The photo to upload (path, Buffer, File, or an uploaded {@link Api.TypeInputFile}). */
    file?: FileLike;
    /** An animated profile video to upload instead of a photo. */
    video?: FileLike;
    /** Timestamp (in seconds) of the video frame to use as the static preview. */
    videoStartTs?: number;
    /** Sticker/custom-emoji markup to generate an animated photo instead of uploading one. */
    videoEmojiMarkup?: Api.TypeVideoSize;
    /** Set as the fallback photo, shown to users prevented from seeing the main one by privacy settings. */
    fallback?: boolean;
    /** Bot owners: change the photo of an owned bot instead. */
    bot?: EntityLike;
}

/** @hidden */
export async function uploadProfilePhoto(
    client: TelegramClient,
    params: UploadProfilePhotoParams
): Promise<Api.photos.Photo> {
    return client.invoke(
        new Api.photos.UploadProfilePhoto({
            file: params.file
                ? await _toInputFile(client, params.file)
                : undefined,
            video: params.video
                ? await _toInputFile(client, params.video)
                : undefined,
            videoStartTs: params.videoStartTs,
            videoEmojiMarkup: params.videoEmojiMarkup,
            fallback: params.fallback,
            bot: params.bot
                ? ((await client.getInputEntity(
                      params.bot
                  )) as unknown as Api.TypeInputUser)
                : undefined,
        })
    );
}

/** @hidden */
export async function updateProfilePhoto(
    client: TelegramClient,
    photo: Api.TypeInputPhoto | Api.TypePhoto,
    params: { fallback?: boolean; bot?: EntityLike } = {}
): Promise<Api.photos.Photo> {
    return client.invoke(
        new Api.photos.UpdateProfilePhoto({
            id: utils.getInputPhoto(photo),
            fallback: params.fallback,
            bot: params.bot
                ? ((await client.getInputEntity(
                      params.bot
                  )) as unknown as Api.TypeInputUser)
                : undefined,
        })
    );
}

/** @hidden */
export async function deleteProfilePhotos(
    client: TelegramClient,
    photos: (Api.TypeInputPhoto | Api.TypePhoto)[]
) {
    return client.invoke(
        new Api.photos.DeletePhotos({
            id: photos.map((photo) => utils.getInputPhoto(photo)),
        })
    );
}

/** Parameters for {@link getUserPhotos}. */
export interface GetUserPhotosParams {
    /** Number of photos to skip. */
    offset?: number;
    /** Only return photos with IDs lower than this one. */
    maxId?: BigInteger;
    /** Maximum number of photos to return (server caps at 100 per request). */
    limit?: number;
}

/** @hidden */
export async function getUserPhotos(
    client: TelegramClient,
    entity: EntityLike,
    params: GetUserPhotosParams = {}
): Promise<TotalList<Api.TypePhoto>> {
    const user = await client.getInputEntity(entity);
    const result = await client.invoke(
        new Api.photos.GetUserPhotos({
            userId: user as unknown as Api.TypeInputUser,
            offset: params.offset ?? 0,
            maxId: params.maxId,
            limit: params.limit ?? 100,
        })
    );
    const photos = new TotalList<Api.TypePhoto>();
    photos.push(...result.photos);
    photos.total =
        result instanceof Api.photos.PhotosSlice
            ? result.count
            : result.photos.length;
    return photos;
}
