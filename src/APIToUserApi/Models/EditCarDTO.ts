import { CarDTO } from './CarDTO';
export class EditCarDTO {
	public keyCar = '';
	public powerHp = 0;
	public weightKg = 0;
	public driveTrain = '';
	public class = '';
	public pi = 0;
	public onRoad = true;
	public speed = 0;
	public handling = 0;
	public accelerate = 0;
	public launch = 0;
	public braking = 0;
	public offroad = 0;
	public imatriculation = '';
	public totalPrice = 0;
	public editPrice = 0;
}

export const ToEditModel = (car: CarDTO): EditCarDTO => {
	const editCarDTO = new EditCarDTO();

	editCarDTO.keyCar = car.keyCar;
	editCarDTO.powerHp = car.originalPowerHp;
	editCarDTO.weightKg = car.originalWeightKg;
	editCarDTO.driveTrain = car.originalDriveTrain;
	editCarDTO.class = car.originalClass;
	editCarDTO.pi = car.originalPi;
	editCarDTO.onRoad = car.originalOnRoad;
	editCarDTO.speed = car.originalSpeed;
	editCarDTO.handling = car.originalHandling;
	editCarDTO.accelerate = car.originalAccelerate;
	editCarDTO.launch = car.originalLaunch;
	editCarDTO.braking = car.originalBraking;
	editCarDTO.offroad = car.originalOffroad;
	editCarDTO.imatriculation = car.imatriculation;
	editCarDTO.totalPrice = car.totalPrice;
	editCarDTO.editPrice = car.editPrice;

	return editCarDTO;
};
