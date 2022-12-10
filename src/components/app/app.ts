import AppController from '../controller/controller';
import { AppView, INewsSourcesData, INewsSourceArchive } from '../view/appView';
import News from '../view/news/news';

class App {
  private controller: AppController;
  private view: AppView;
  private news: News;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.news = new News();
  }

  public start() {
    const sourcesContainer = document.querySelector('.sources') as HTMLElement;
    const sourcesNavContainer = document.querySelector('.sources-nav') as HTMLElement;
    if (!sourcesContainer) throw new Error('Sources Container not exists');
    if (!sourcesNavContainer) throw new Error('Filter Container not exists');
    sourcesContainer.addEventListener('click', (e: Event) =>{
    const newsFilter = document.querySelector('.news-filter') as HTMLElement;
    if (!newsFilter.style.display) newsFilter.style.display = 'flex'
      this.controller.getNews(e, (data: INewsSourceArchive | undefined):void => this.view.drawNews(data))
    }
      );

//     const newsFilter = document.querySelector('.news-filter') as HTMLInputElement;
//     newsFilter.addEventListener('input', (e: Event) => {
//     if (newsFilter.value) this.view.filterNews(newsFilter.value)
//   });

 




    this.controller.getSources((data: INewsSourcesData | undefined) => {
        this.view.drawSources(data)
    });
  }
}

export default App;
