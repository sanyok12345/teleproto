import { TopPeerCategoryBotsPM } from "./TopPeerCategoryBotsPM";
import { TopPeerCategoryBotsInline } from "./TopPeerCategoryBotsInline";
import { TopPeerCategoryCorrespondents } from "./TopPeerCategoryCorrespondents";
import { TopPeerCategoryGroups } from "./TopPeerCategoryGroups";
import { TopPeerCategoryChannels } from "./TopPeerCategoryChannels";
import { TopPeerCategoryPhoneCalls } from "./TopPeerCategoryPhoneCalls";
import { TopPeerCategoryForwardUsers } from "./TopPeerCategoryForwardUsers";
import { TopPeerCategoryForwardChats } from "./TopPeerCategoryForwardChats";
import { TopPeerCategoryBotsApp } from "./TopPeerCategoryBotsApp";

export type TypeTopPeerCategory = TopPeerCategoryBotsPM | TopPeerCategoryBotsInline | TopPeerCategoryCorrespondents | TopPeerCategoryGroups | TopPeerCategoryChannels | TopPeerCategoryPhoneCalls | TopPeerCategoryForwardUsers | TopPeerCategoryForwardChats | TopPeerCategoryBotsApp;