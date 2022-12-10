import './news.css';
import { INewsArticle } from '../appView';


class News {

  public draw(data: Array<INewsArticle>) {
    const news = data.length >= 10 ? data.filter((_item: INewsArticle, idx: number) => idx < 10) : data;
    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item: INewsArticle, idx: number) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
      const newsItem = newsClone.querySelector('.news__item') as HTMLElement;
      const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
      const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
      const newsDescTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
      const newsDescSource = newsClone.querySelector('.news__description-source') as HTMLElement;
      const newsDescContent = newsClone.querySelector('.news__description-content') as HTMLElement;
      const newsLink = newsClone.querySelector('.news__read-more a') as HTMLElement;

      if (idx % 2) newsItem.classList.add('alt');

      newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      newsMetaAuthor.textContent = item.author || item.source.name;
      newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      newsDescTitle.textContent = item.title;
      newsDescSource.textContent = item.source.name;
      newsDescContent.textContent = item.description;
      newsLink.setAttribute('href', item.url);

      fragment.append(newsClone);
    });
    const newsContainer = document.querySelector('.news') as HTMLElement;
    newsContainer.innerHTML = '';
    newsContainer.appendChild(fragment);

  }


}

export default News;
