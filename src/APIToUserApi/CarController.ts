import ApiBase from './ApiBase';

export default class CarController {
	static async getAllCar() {
		return (await ApiBase.userApi.get(`api/Garage/all/`)).data;
	}
}
