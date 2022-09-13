import lang from '../language.json';
export const NewImmatriculation = (immat: string): string => {
	// Todo Call API get Full ImmatList on server
	const immatList = ['00-aaa-00', '20-qsd-45'];

	if (immat != '' && immatList.includes(immat)) {
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
		} while (immatList.includes(immat));
	}
	return immat;
};
