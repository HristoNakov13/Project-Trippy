import HttpError from "./errors/http-error";

const fetchData = (URL: string, headers: RequestInit): Promise<any> => {
    return fetch(URL, headers)
        .then(res => {
            if (!res.ok) {

                console.log(res);
                const httpError = new HttpError(res.statusText, res);

                throw httpError;
            }

            return res;
        })
        .then(res => {
            return res.status === 204
                ? res
                : res.json();
        });
};

const buildHeaders = (httpMethod: string, data?: any): RequestInit => {
    const headers: RequestInit = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    };

    if (!!data) {
        headers.body = JSON.stringify(data);
    }

    return headers;
};

const ROOT_URL = "http://localhost:8080";

const buildURL = (endpoint: string): string => {
    return `${ROOT_URL}${endpoint}`;
};

const httpMethod = (method: string) => {
    return (endpoint: string, data?: any | Array<any>) => {
        const headers = buildHeaders(method, data);
        const URL = buildURL(endpoint);

        return fetchData(URL, headers)
    };
};

const uploadFile = (endPoint: string, data: FormData) => {
    const url = buildURL(endPoint);
    const header: RequestInit = {
        method: "POST",
        headers: {
            credentials: 'include',
        },
        body: data
    }

    return fetchData(url, header);
}

const http = {
    get: httpMethod("GET"),
    post: httpMethod("POST"),
    put: httpMethod("PUT"),
    del: httpMethod("DEL"),
    uploadFile
};

export default http;