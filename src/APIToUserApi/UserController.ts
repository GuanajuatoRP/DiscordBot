import ApiBase from './ApiBase';

export default class UserController {
	static async getUser(discordId: string) {
		return (await ApiBase.userApi.get(`api/User/garrage/${discordId}`)).data;
	}
	static async getUsersByDiscordIds(discordIds: string[]) {
		return (await ApiBase.userApi.post(`api/User`, discordIds)).data;
	}
}
