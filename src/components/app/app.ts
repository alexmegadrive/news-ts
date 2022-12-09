import AppController from '../controller/controller';
import { AppView, INewsSourcesData, INewsSourceArchive } from '../view/appView';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    const sourcesContainer = document.querySelector('.sources') as HTMLElement;
    const filterContainer = document.querySelector('.filter') as HTMLElement;
    if (!sourcesContainer) throw new Error('Sources Container not exists');
    if (!filterContainer) throw new Error('Filter Container not exists');
    sourcesContainer.addEventListener('click', (e: Event) =>
      this.controller.getNews(e, (data: INewsSourceArchive | undefined):void => this.view.drawNews(data))
    );


    this.controller.getSources((data: INewsSourcesData | undefined) => {
        this.view.drawSources(data)
    });
  }
}

export default App;
