import axios, { AxiosInstance } from 'axios';

export default class ApiBase {

    private static _apiAuth: AxiosInstance | null;
    static get apiAuth() {
        if (!this._apiAuth) {
            this._apiAuth = axios.create({
                baseURL: "http://localhost:49154" as string,
                timeout: 1000,
                headers: {
                'X-Custom-Header': 'foobar',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
        }
        return this._apiAuth;
    }
}