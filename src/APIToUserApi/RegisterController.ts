import ApiBase from './ApiBase';

export default class RegisterController {
	static async UserExist(discordId: string) {
		return await ApiBase.userApi.get('/UserExist/{0}'.format(discordId));
	}
}
