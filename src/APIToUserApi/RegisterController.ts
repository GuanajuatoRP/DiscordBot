import ApiBase from './ApiBase';
import { RegisterModel } from './Models/RegisterModel';

export default class RegisterController {

  static async register(model: RegisterModel) {
    // return await ApiBase.userApi.post('/register', model);
    return "aa";
  }

  static async UserExist(discordId: string) {
    return await ApiBase.userApi.get('/UserExist/{0}'.format(discordId));
  }
}
