import {ACCESS_TOKEN, API_BASE_URL} from "../constants/APIurl";

type RequestOptions = {
    url: string | URL;
    method: "POST" | "GET" | "PUT" | "DELETE";
    body?: any
}

export default class fetcher {
    static async request(options: RequestOptions): Promise<any> {
        const headers = new Headers({
            "Content-Type": "application/json",
        });

        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers.append("Authorization", "Bearer " + localStorage.getItem(ACCESS_TOKEN));
        }

        const defaults = {headers: headers};

        options.body = JSON.stringify(options.body);

        options = Object.assign({}, defaults, options);

        // @ts-ignore
        const response = await fetch(API_BASE_URL + options.url, options);
        if(!response.ok)
            throw new Error(response.statusText);
        if(response.status == 204)
            return;
        return response.json();
    }

    static delete(url: string): Promise<any> {
        return this.request({
            url,
            method: "DELETE"
        });
    }

    static post(url: string, body: any): Promise<any> {
        return this.request({
            url,
            method: "POST",
            body
        });
    };

    static get(url: string, params?: object): Promise<any> {
        if (params) {
            let queryParams = new URLSearchParams();
            for (let [key, value] of Object.entries(params))
                queryParams.append(key, value)

            return this.request({
                url: `${url}?${queryParams.toString()}`,
                method: "GET"
            });
        } else {
            return this.request({
                url,
                method: "GET"
            });
        }
    };

    static put(url: string, body: any): Promise<any> {
        return this.request({
            url,
            method: "PUT",
            body
        });
    }
}


export const api = (options: any, successCallback: any, errorCallback: any) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then((response) => {
            if (!response.ok) {
                errorCallback(response)
                throw Error(response.statusText)
            }
            return response
        }).then(response => response.status === 204 ? {} : response.json())
        .then(data => successCallback(data))
        .catch((error) => console.log(error))
};