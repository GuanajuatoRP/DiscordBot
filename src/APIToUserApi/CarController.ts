import { EditCarDTO } from './Models/EditCarDTO';
import ApiBase from './ApiBase';

export default class CarController {
	static async getAllCar() {
		return (await ApiBase.userApi.get(`api/Garage/all/`)).data;
	}
	static async getUserAllCar(DiscordId: string) {
		return (await ApiBase.userApi.get(`api/Garage/all/${DiscordId}`)).data;
	}
	static async editCar(car: EditCarDTO) {
		return (await ApiBase.userApi.put(`api/Garage/${car.keyCar}`, car)).data;
	}
}
