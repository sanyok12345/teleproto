import { InputStickerSetEmpty } from "./InputStickerSetEmpty";
import { InputStickerSetID } from "./InputStickerSetID";
import { InputStickerSetShortName } from "./InputStickerSetShortName";
import { InputStickerSetAnimatedEmoji } from "./InputStickerSetAnimatedEmoji";
import { InputStickerSetDice } from "./InputStickerSetDice";
import { InputStickerSetAnimatedEmojiAnimations } from "./InputStickerSetAnimatedEmojiAnimations";
import { InputStickerSetPremiumGifts } from "./InputStickerSetPremiumGifts";
import { InputStickerSetEmojiGenericAnimations } from "./InputStickerSetEmojiGenericAnimations";
import { InputStickerSetEmojiDefaultStatuses } from "./InputStickerSetEmojiDefaultStatuses";
import { InputStickerSetEmojiDefaultTopicIcons } from "./InputStickerSetEmojiDefaultTopicIcons";
import { InputStickerSetEmojiChannelDefaultStatuses } from "./InputStickerSetEmojiChannelDefaultStatuses";
import { InputStickerSetTonGifts } from "./InputStickerSetTonGifts";

export type TypeInputStickerSet = InputStickerSetEmpty | InputStickerSetID | InputStickerSetShortName | InputStickerSetAnimatedEmoji | InputStickerSetDice | InputStickerSetAnimatedEmojiAnimations | InputStickerSetPremiumGifts | InputStickerSetEmojiGenericAnimations | InputStickerSetEmojiDefaultStatuses | InputStickerSetEmojiDefaultTopicIcons | InputStickerSetEmojiChannelDefaultStatuses | InputStickerSetTonGifts;