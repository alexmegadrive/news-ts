import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'dfdbcc0e42934870a17de29195d65e47', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
//old 231e4c7b702d4c358cee0ba6f681ab9f
//new dfdbcc0e42934870a17de29195d65e47