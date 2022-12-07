import AppLoader from './appLoader';
import { AppView, INewsSourcesData, INewsSourceArchive } from '../view/appView';


class AppController extends AppLoader {
    getSources(callback) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e:Event, callback) {
        let target:EventTarget | null = e.target;
        const newsContainer:EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {
            if (target instanceof Element && target.classList.contains('source__item')) {
                const sourceId:string | null = target.getAttribute('data-source-id');
                if (newsContainer instanceof Element && newsContainer.getAttribute('data-source') !== sourceId) {
                    if (sourceId) newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
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
