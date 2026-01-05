import { StarsTransactionPeerUnsupported } from "./StarsTransactionPeerUnsupported";
import { StarsTransactionPeerAppStore } from "./StarsTransactionPeerAppStore";
import { StarsTransactionPeerPlayMarket } from "./StarsTransactionPeerPlayMarket";
import { StarsTransactionPeerPremiumBot } from "./StarsTransactionPeerPremiumBot";
import { StarsTransactionPeerFragment } from "./StarsTransactionPeerFragment";
import { StarsTransactionPeer } from "./StarsTransactionPeer";
import { StarsTransactionPeerAds } from "./StarsTransactionPeerAds";
import { StarsTransactionPeerAPI } from "./StarsTransactionPeerAPI";

export type TypeStarsTransactionPeer = StarsTransactionPeerUnsupported | StarsTransactionPeerAppStore | StarsTransactionPeerPlayMarket | StarsTransactionPeerPremiumBot | StarsTransactionPeerFragment | StarsTransactionPeer | StarsTransactionPeerAds | StarsTransactionPeerAPI;