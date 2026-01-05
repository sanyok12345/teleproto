import { InlineQueryPeerTypeSameBotPM } from "./InlineQueryPeerTypeSameBotPM";
import { InlineQueryPeerTypePM } from "./InlineQueryPeerTypePM";
import { InlineQueryPeerTypeChat } from "./InlineQueryPeerTypeChat";
import { InlineQueryPeerTypeMegagroup } from "./InlineQueryPeerTypeMegagroup";
import { InlineQueryPeerTypeBroadcast } from "./InlineQueryPeerTypeBroadcast";
import { InlineQueryPeerTypeBotPM } from "./InlineQueryPeerTypeBotPM";

export type TypeInlineQueryPeerType = InlineQueryPeerTypeSameBotPM | InlineQueryPeerTypePM | InlineQueryPeerTypeChat | InlineQueryPeerTypeMegagroup | InlineQueryPeerTypeBroadcast | InlineQueryPeerTypeBotPM;