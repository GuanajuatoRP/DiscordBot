import axios, { AxiosInstance } from 'axios';

export default class ApiBase {

    private static _userApi: AxiosInstance | null;
    static get userApi() {
        if (!this._userApi) {
            this._userApi = axios.create({
                baseURL: process.env.API_AUTH_URL as string,
                timeout: 10000000,
                headers: {
                'X-Custom-Header': 'foobar',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
        }
        return this._userApi;
    }
}