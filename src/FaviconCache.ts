import { HtmlUtils } from './HtmlUtils';
import { Debug } from './Debug';
import { safeFetch } from './Network';
import * as urlUtils from './helpers/urlUtils';

// tslint:disable:class-name
class _FaviconCache {
    private favicons: Map<string, string> = new Map();

    public async getFavicon(url: string): Promise<string> {
        if (this.favicons.has(url)) {
            return this.favicons.get(url) || '';
        }
        const baseUrl = this.getBaseUrl(url);
        try {
            const favicon = urlUtils.getHumanHostname(url) === urlUtils.REDDIT_COM
                ? await this.downloadSubRedditAboutJsonAndParseFavicon(url)
                : await this.downloadIndexAndParseFavicon(baseUrl)
            ;
            Debug.log('getFavicon: ', favicon);
            this.favicons.set(url, favicon);
            return favicon;
        } catch (e) {
            Debug.log(e);
            return '';
        }
    }

    private getBaseUrl(url: string) {
        let baseUrl = url.replace(/(http(s)?:\/\/.*?\/).*/, '$1');
        if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }
        return baseUrl;
    }

    private async fetchHtml(url: string): Promise<string> {
        const response = await safeFetch(url);
        const html = await response.text();
        return html;

    }

    private matchRelAttributes(node: Node, values: string[]): string | null {
        for (const value of values) {
            if (HtmlUtils.matchAttributes(node, [{name: 'rel', value: value}])) {
                const favicon = HtmlUtils.getAttribute(node, 'href') || '';
                if (favicon !== '') {
                    return favicon;
                }
            }
        }
        return null;
    }

    private async downloadSubRedditAboutJsonAndParseFavicon(url: string): Promise<string> {
        const jsonUrl = url.slice(0, -4).concat('/about.json');
        const jsonText = await this.fetchHtml(jsonUrl);
        const json = JSON.parse(jsonText);
        return json.data.icon_img;
    }

    private async downloadIndexAndParseFavicon(url: string) {
        const html = await this.fetchHtml(url);
        const document = HtmlUtils.parse(html);
        const links = HtmlUtils.findPath(document, ['html', 'head', 'link']);
        for (const link of links) {
            const icon = this.matchRelAttributes(link, ['shortcut icon', 'icon', 'apple-touch-icon']);
            if (icon != null) {
                if (icon.startsWith('//')) {
                    return 'https:' + icon;
                }
                if (!icon.startsWith('http')) {
                    return url + icon;
                }
                return icon;
            }
        }

        return url + 'favicon.ico';
    }
}

export const FaviconCache = new _FaviconCache();
