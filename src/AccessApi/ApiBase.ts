import axios, { AxiosInstance } from 'axios';

export default class ApiBase {

    private static _apiAuth: AxiosInstance | null;
    static get apiAuth() {
        if (!this._apiAuth) {
            this._apiAuth = axios.create({
                baseURL: process.env.URL_API_AUTH,
            });
        }
        return this._apiAuth;
    }
}