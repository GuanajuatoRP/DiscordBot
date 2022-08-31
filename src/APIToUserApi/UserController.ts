import ApiBase from './ApiBase';

export default class UserController {
	static async getUser(discordId: string) {
		return (await ApiBase.userApi.get(`api/User/garrage/${discordId}`)).data;
	}
}
