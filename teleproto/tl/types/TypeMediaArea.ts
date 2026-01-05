import { MediaAreaVenue } from "./MediaAreaVenue";
import { InputMediaAreaVenue } from "./InputMediaAreaVenue";
import { MediaAreaGeoPoint } from "./MediaAreaGeoPoint";
import { MediaAreaSuggestedReaction } from "./MediaAreaSuggestedReaction";
import { MediaAreaChannelPost } from "./MediaAreaChannelPost";
import { InputMediaAreaChannelPost } from "./InputMediaAreaChannelPost";
import { MediaAreaUrl } from "./MediaAreaUrl";
import { MediaAreaWeather } from "./MediaAreaWeather";
import { MediaAreaStarGift } from "./MediaAreaStarGift";

export type TypeMediaArea = MediaAreaVenue | InputMediaAreaVenue | MediaAreaGeoPoint | MediaAreaSuggestedReaction | MediaAreaChannelPost | InputMediaAreaChannelPost | MediaAreaUrl | MediaAreaWeather | MediaAreaStarGift;