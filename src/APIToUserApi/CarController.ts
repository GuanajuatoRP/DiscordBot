import { OrigialCarDTO } from './Models/OrigialCarDTO';
import { EditCarDTO } from './Models/EditCarDTO';
import ApiBase from './ApiBase';
import { CarDTO } from './Models/CarDTO';

export default class CarController {
	static async getAllOriginalCar() {
		return (await ApiBase.userApi.get(`api/OriginalCar/Search`)).data;
	}
	static async getAllCar() {
		return (await ApiBase.userApi.get(`api/Garage/all/`)).data;
	}
	static async getUserAllCar(DiscordId: string) {
		return (await ApiBase.userApi.get(`api/Garage/all/${DiscordId}`)).data;
	}
	static async editCar(car: EditCarDTO) {
		return (await ApiBase.userApi.put(`api/Garage/${car.keyCar}`, car)).data;
	}
	static async addCar(car: OrigialCarDTO, DiscordId: string) {
		return (
			await ApiBase.userApi.post(`api/Garage/add/${DiscordId}/${car.idCar}`)
		).data;
	}
	static async SellCar(DiscordId: string, car: CarDTO) {
		return (
			await ApiBase.userApi.put(`api/Garage/Sell/${DiscordId}/${car.keyCar}`)
		).data;
	}
	static async searchCar(seachValue: string | undefined) {
		return (
			await ApiBase.userApi.get(
				`api/OriginalCar/SearchDiscord?searchModel=${seachValue}&limit=25`,
			)
		).data;
	}
}
