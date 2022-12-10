import AppLoader from './appLoader';
import { INewsSourcesData, INewsSourceArchive } from '../view/appView';
import { EndPoint } from './loader';

class AppController extends AppLoader {
  public getSources(callback: (data?: INewsSourcesData) => void) {
    super.getResp(
      {
        endpoint: EndPoint.sources,
      },
      callback
    );
  }

  public getNews(e: Event, callback: (data?: INewsSourceArchive) => void) {

    let target: EventTarget | null = e.target;
    const newsContainer: EventTarget | null = e.currentTarget;

    while (target !== newsContainer) {
      if (target instanceof Element && target.classList.contains('source__item')) {
        const sourceId: string | null = target.getAttribute('data-source-id');
        if (newsContainer instanceof Element && newsContainer.getAttribute('data-source') !== sourceId) {
          if (sourceId) newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: EndPoint.everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      if (target && target instanceof Element) target = target.parentNode;
    }
  }
}

export default AppController;
