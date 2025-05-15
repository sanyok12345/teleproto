import { Api } from "../tl";
import { helpers } from "../index";

export class HTMLParser {
    static parse(html: string): [string, Api.TypeMessageEntity[]] {
        if (!html) {
            return [html, []];
        }
        
        const text: string[] = [];
        const entities: Api.TypeMessageEntity[] = [];
        const openTags: {name: string, meta?: string}[] = [];
        const buildingEntities = new Map<string, Api.TypeMessageEntity>();
        
        let pos = 0;
        let textPos = 0;
        
        while (pos < html.length) {
            const tagStart = html.indexOf('<', pos);
            
            if (tagStart === -1) {
                const textContent = html.substring(pos);
                text.push(textContent);

                for (const [_, entity] of buildingEntities) {
                    entity.length += textContent.length;
                }
                break;
            }
            
            if (tagStart > pos) {
                const textContent = html.substring(pos, tagStart);
                text.push(textContent);
                
                for (const [_, entity] of buildingEntities) {
                    entity.length += textContent.length;
                }
                textPos += textContent.length;
            }
            
            const tagEnd = html.indexOf('>', tagStart);
            if (tagEnd === -1) {
                text.push(html.substring(tagStart));
                break;
            }
            
            const tagContent = html.substring(tagStart + 1, tagEnd);
            
            if (tagContent.startsWith('/')) {
                const tagName = tagContent.substring(1).trim().toLowerCase();
                
                const entity = buildingEntities.get(tagName);
                if (entity) {
                    buildingEntities.delete(tagName);
                    entities.push(entity);
                }
                
                const index = openTags.findIndex(t => t.name === tagName);
                if (index !== -1) {
                    openTags.splice(index, 1);
                }
            } else {
                let tagName = tagContent;
                let attributes: Record<string, string> = {};
                
                const spaceIndex = tagContent.indexOf(' ');
                if (spaceIndex !== -1) {
                    tagName = tagContent.substring(0, spaceIndex).toLowerCase();
                    
                    const attrStr = tagContent.substring(spaceIndex + 1);
                    const attrRegex = /([^\s=]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]*)))?/g;
                    let match;
                    
                    while ((match = attrRegex.exec(attrStr)) !== null) {
                        const name = match[1];
                        const value = match[2] || match[3] || match[4] || '';
                        attributes[name] = value;
                    }
                } else {
                    tagName = tagContent.toLowerCase();
                }
                
                if (tagName.endsWith('/')) {
                    tagName = tagName.slice(0, -1);
                    pos = tagEnd + 1;
                    continue;
                }
                
                let tagMeta: string | undefined = undefined;
                openTags.unshift({name: tagName, meta: tagMeta});
                
                let EntityType;
                const args: any = {};
                
                if (tagName === "strong" || tagName === "b") {
                    EntityType = Api.MessageEntityBold;
                } else if (tagName === "spoiler") {
                    EntityType = Api.MessageEntitySpoiler;
                } else if (tagName === "em" || tagName === "i") {
                    EntityType = Api.MessageEntityItalic;
                } else if (tagName === "u") {
                    EntityType = Api.MessageEntityUnderline;
                } else if (tagName === "del" || tagName === "s") {
                    EntityType = Api.MessageEntityStrike;
                } else if (tagName === "blockquote") {
                    EntityType = Api.MessageEntityBlockquote;
                    if (attributes.expandable !== undefined) {
                        args.collapsed = true;
                    }
                } else if (tagName === "code") {
                    const pre = buildingEntities.get("pre");
                    if (pre && pre instanceof Api.MessageEntityPre) {
                        if (attributes.class && attributes.class.startsWith('language-')) {
                            pre.language = attributes.class.slice("language-".length);
                        }
                    } else {
                        EntityType = Api.MessageEntityCode;
                    }
                } else if (tagName === "pre") {
                    EntityType = Api.MessageEntityPre;
                    args["language"] = "";
                } else if (tagName === "a") {
                    let url: string | undefined = attributes.href;
                    if (url) {
                        if (url.startsWith("mailto:")) {
                            url = url.slice("mailto:".length);
                            EntityType = Api.MessageEntityEmail;
                            tagMeta = url;
                        } else {
                            EntityType = Api.MessageEntityTextUrl;
                            args["url"] = url;
                        }
                        openTags[0].meta = tagMeta;
                    }
                } else if (tagName === "tg-emoji") {
                    EntityType = Api.MessageEntityCustomEmoji;
                    args["documentId"] = attributes["emoji-id"];
                }
                
                if (EntityType && !buildingEntities.has(tagName)) {
                    buildingEntities.set(
                        tagName,
                        new EntityType({
                            offset: textPos,
                            length: 0,
                            ...args,
                        })
                    );
                }
                
                if (tagName === "a" && tagMeta) {
                    text.push(tagMeta);
                    
                    for (const [_, entity] of buildingEntities) {
                        entity.length += tagMeta.length;
                    }
                    textPos += tagMeta.length;
                }
            }
            
            pos = tagEnd + 1;
        }
        
        const finalText = text.join('');
        return [helpers.stripText(finalText, entities), entities];
    }

    static unparse(
        text: string,
        entities: Api.TypeMessageEntity[] | undefined,
        _offset: number = 0,
        _length?: number
    ): string {
        if (!text || !entities || !entities.length) {
            return text;
        }
        if (_length == undefined) {
            _length = text.length;
        }
        const html = [];
        let lastOffset = 0;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (entity.offset >= _offset + _length) {
                break;
            }
            let relativeOffset = entity.offset - _offset;
            if (relativeOffset > lastOffset) {
                html.push(text.slice(lastOffset, relativeOffset));
            } else if (relativeOffset < lastOffset) {
                continue;
            }
            let skipEntity = false;
            let length = entity.length;
            let entityText = this.unparse(
                text.slice(relativeOffset, relativeOffset + length),
                entities.slice(i + 1, entities.length),
                entity.offset,
                length
            );
            if (entity instanceof Api.MessageEntityBold) {
                html.push(`<strong>${entityText}</strong>`);
            } else if (entity instanceof Api.MessageEntitySpoiler) {
                html.push(`<spoiler>${entityText}</spoiler>`);
            } else if (entity instanceof Api.MessageEntityItalic) {
                html.push(`<em>${entityText}</em>`);
            } else if (entity instanceof Api.MessageEntityCode) {
                html.push(`<code>${entityText}</code>`);
            } else if (entity instanceof Api.MessageEntityUnderline) {
                html.push(`<u>${entityText}</u>`);
            } else if (entity instanceof Api.MessageEntityStrike) {
                html.push(`<del>${entityText}</del>`);
            } else if (entity instanceof Api.MessageEntityBlockquote) {
                html.push(`<blockquote>${entityText}</blockquote>`);
            } else if (entity instanceof Api.MessageEntityPre) {
                if (entity.language) {
                    html.push(
                        `<pre><code class="language-${entity.language}">${entityText}</code></pre>`
                    );
                } else {
                    html.push(`<pre>${entityText}</pre>`);
                }
            } else if (entity instanceof Api.MessageEntityEmail) {
                html.push(`<a href="mailto:${entityText}">${entityText}</a>`);
            } else if (entity instanceof Api.MessageEntityUrl) {
                html.push(`<a href="${entityText}">${entityText}</a>`);
            } else if (entity instanceof Api.MessageEntityTextUrl) {
                html.push(`<a href="${entity.url}">${entityText}</a>`);
            } else if (entity instanceof Api.MessageEntityMentionName) {
                html.push(
                    `<a href="tg://user?id=${entity.userId}">${entityText}</a>`
                );
            } else if (entity instanceof Api.MessageEntityCustomEmoji) {
                html.push(
                    `<tg-emoji emoji-id="${entity.documentId}">${entityText}</tg-emoji>`
                );
            } else {
                skipEntity = true;
            }
            lastOffset = relativeOffset + (skipEntity ? 0 : length);
        }
        html.push(text.slice(lastOffset, text.length));
        return html.join("");
    }
}