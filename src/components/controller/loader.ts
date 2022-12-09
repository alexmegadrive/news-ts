import { INewsSourcesData } from '../view/appView';

type ApiOptions = {
  apiKey: string;
  [key: string]: string;
};

type IgetRespParams = {
  endpoint: EndPoint;
  options?: IgetRespParamsOptions;
};
export enum EndPoint {
  sources = 'sources',
  everything = 'everything',
}

type IgetRespParamsOptions = {
  sources: string | null;
};

type Options = {
  [key: string]: string;
};

class Loader {
  readonly baseLink: string;
  options: ApiOptions;

  constructor(baseLink: string, options: ApiOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    params: IgetRespParams,
    callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', params.endpoint, callback, params.options);
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Partial<Options> = {}, endpoint: EndPoint) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: string, endpoint: EndPoint, callback: (data: INewsSourcesData) => void, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: INewsSourcesData) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
