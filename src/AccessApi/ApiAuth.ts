import ApiBase from './ApiBase';
import { RegisterModel } from './Models/RegisterModel';

export default class ApiAuth {

    static async register(username: string, discordId: string) {
        const registerModel = new RegisterModel();
        registerModel.username = username;
        registerModel.discordId = discordId;
        return await ApiBase.apiAuth.post('/register', registerModel);
    }

    static async UserExist(discordId: string) {
        return await ApiBase.apiAuth.get('/UserExist/{0}'.format(discordId));
    }
}
