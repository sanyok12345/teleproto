import { ReactionEmpty } from "./ReactionEmpty";
import { ReactionEmoji } from "./ReactionEmoji";
import { ReactionCustomEmoji } from "./ReactionCustomEmoji";
import { ReactionPaid } from "./ReactionPaid";

export type TypeReaction = ReactionEmpty | ReactionEmoji | ReactionCustomEmoji | ReactionPaid;