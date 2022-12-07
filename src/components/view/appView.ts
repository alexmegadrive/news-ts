import News from './news/news';
import Sources from './sources/sources';

export interface INewsSourcesData {
    sources: Array<INewsSourceItem>;
    status?: string;
}
interface INewsSourceItem {
    [key: string]: string;
}
export interface INewsSourceArchive {
    articles: Array<INewsArticle>;
    status: string;
    totalResults: number;
}
export interface INewsArticle {
    author:string;
    content:string;
    description:string;
    publishedAt:string;
    source:INewsArticleSource;
    title:string;
    url:string;
    urlToImage:string;
}
interface INewsArticleSource {
    id: string;
    name: string;
}

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data:INewsSourceArchive) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: INewsSourcesData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
