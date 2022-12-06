import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '231e4c7b702d4c358cee0ba6f681ab9f', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
