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
  category: string;
  country: string;
  id: string;
  language: string;
  name: string;
}

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
  private news: News;
  private sources: Sources;
  private selectedNews: Array<INewsArticle>;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
    this.selectedNews = [];

    const newsFilter = document.querySelector('.news-filter') as HTMLInputElement;
    newsFilter.addEventListener('input', (e: Event) => {
      if (newsFilter.value) this.filterNews(newsFilter.value);
    });
    newsFilter.addEventListener('focusout', (e: Event) => {
      if (!newsFilter.value) this.news.draw(this.selectedNews);
    });
  }

  public drawNews(data: INewsSourceArchive | undefined) {
    const articles = data?.articles ? data?.articles : [];
    this.selectedNews = articles;
    if (articles) this.news.draw(articles);
  }

  public filterNews(value: string) {
    const resultArr: Array<INewsArticle> = this.selectedNews.filter((item, index) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    this.news.draw(resultArr);
  }

  public drawSources(data: INewsSourcesData | undefined) {
  console.log('data :', data);
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
