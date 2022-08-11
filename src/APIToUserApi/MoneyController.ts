import { AxiosResponse } from 'axios';
import ApiBase from './ApiBase';

export default class MoneyController {
	static async getMoney(discordId: string) {
		return (await ApiBase.userApi.get(
			`api/Money/${discordId}`,
		)) as AxiosResponse<any, any>;
	}
	static async addMoney(discordId: string, montant: Number) {
		return (await ApiBase.userApi.post(`api/Money/add/${discordId}`, {
			value: montant,
		})) as AxiosResponse<any, any>;
	}
	static async removeMoney(discordId: string, montant: Number) {
		return (await ApiBase.userApi.post(`api/Money/remove/${discordId}`, {
			value: montant,
		})) as AxiosResponse<any, any>;
	}
	static async setMoney(discordId: string, montant: Number) {
		return (await ApiBase.userApi.post(`api/Money/set/${discordId}`, {
			value: montant,
		})) as AxiosResponse<any, any>;
	}
}
