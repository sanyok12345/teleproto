import { WebPageEmpty } from "./WebPageEmpty";
import { WebPagePending } from "./WebPagePending";
import { WebPage } from "./WebPage";
import { WebPageNotModified } from "./WebPageNotModified";

export type TypeWebPage = WebPageEmpty | WebPagePending | WebPage | WebPageNotModified;