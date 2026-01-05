import { RecentMeUrlUnknown } from "./RecentMeUrlUnknown";
import { RecentMeUrlUser } from "./RecentMeUrlUser";
import { RecentMeUrlChat } from "./RecentMeUrlChat";
import { RecentMeUrlChatInvite } from "./RecentMeUrlChatInvite";
import { RecentMeUrlStickerSet } from "./RecentMeUrlStickerSet";

export type TypeRecentMeUrl = RecentMeUrlUnknown | RecentMeUrlUser | RecentMeUrlChat | RecentMeUrlChatInvite | RecentMeUrlStickerSet;