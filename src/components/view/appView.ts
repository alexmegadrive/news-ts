import News from './news/news';
import Sources from './sources/sources';


interface IDataResponse {
    description: string;
    url: string;
}

export interface INewsArticle extends IDataResponse {
    author: string;
    content: string;
    name: string;
    publishedAt: string;
    source: INewsArticleSource;
    title: string;
    urlToImage: string;
} 

export interface INewsSourceItem extends IDataResponse {
    catagory: string;
    country: string;
    id: string;
    language: string;
    name: string;
  };


export type INewsSourcesData = {
  sources: Array<INewsSourceItem>;
  status?: string;
};

export type INewsSourceArchive = {
  articles: Array<INewsArticle>;
  status: string;
  totalResults: number;
};

type INewsArticleSource = {
  id: string;
  name: string;
};

export class AppView {
  news: News;
  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: INewsSourceArchive | undefined) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: INewsSourcesData | undefined) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }

}

export default AppView;
