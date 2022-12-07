import AppController from '../controller/controller';
import { AppView, INewsSourcesData, INewsSourceArchive } from '../view/appView';

class App {
  private  controller:AppController;
   private view:AppView;
    
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
       const sourcesContainer = document.querySelector('.sources') as HTMLElement;
       if (!sourcesContainer) throw new Error('Sources Container not exists')
        sourcesContainer.addEventListener('click', (e:Event) => this.controller.getNews(e, (data:INewsSourceArchive) => this.view.drawNews(data)));
        this.controller.getSources((data:INewsSourcesData) => this.view.drawSources(data));
    }
}

export default App;
