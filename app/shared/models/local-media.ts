export class LocalMedia {
    url: string;
    title ?: string;
    story ?: string;

    constructor(url: string, title ?: string, story ?: string) {
        this.url = url;
        this.title = (title) ? title : "";
        this.story = (story) ? story : "";
    }
}