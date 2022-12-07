import { INewsSourcesData } from '../view/appView';

interface IApiOptions {
    apiKey: string;
}
// interface IEndpoint {
//     endpoint: string;
// }
interface IgetRespParams {
    endpoint: string ;
    options?: IgetRespParamsOptions ;
}
interface IgetRespParamsOptions {
    sources: string | null;
}

class Loader {
    baseLink: any;
    options: any;

    constructor(baseLink: string, options: IApiOptions) {
        this.baseLink = baseLink;
        console.log('baseLink :', baseLink);
        this.options = options;
        console.log('options :', options);
    }

    getResp(
        params:IgetRespParams ,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', params.endpoint, callback, params.options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options = {}, endpoint:string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint:string, callback: (data: INewsSourcesData) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: INewsSourcesData) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
