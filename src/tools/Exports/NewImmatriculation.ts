import CarController from '../../APIToUserApi/CarController';
import { CarDTO } from '../../APIToUserApi/Models/CarDTO';
import lang from '../language.json';
export const NewImmatriculation = async (immat: string): Promise<string> => {
	let immatList: string[];
	await CarController.getAllCar()
		.then((cars: CarDTO[]) => {
			immatList = cars
				.filter(car => car.imatriculation && car.imatriculation !== '')
				.map(car => car.imatriculation);
		})
		.catch(err => console.log(err));

	if (immat != '' && immatList!.includes(immat)) {
		return lang.commands.immatriculation.export.exist;
	}
	if (immat == '') {
		do {
			for (let i = 0; i < 2; i++) {
				immat += String.fromCharCode(
					Math.floor(Math.random() * (90 - 65 + 1)) + 65,
				);
			}
			immat += '-';
			for (let i = 0; i < 2; i++) {
				immat += Math.floor(Math.random() * (9 + 1));
			}
			immat += '-';
			for (let i = 0; i < 2; i++) {
				immat += String.fromCharCode(
					Math.floor(Math.random() * (90 - 65 + 1)) + 65,
				);
			}
		} while (immatList!.includes(immat));
	}
	return immat;
};
