export const shuffleArray = (arr: Array<any>) => {
	const res = [];
	while (arr.length) {
		res.push(arr.splice(~~(Math.random() * arr.length), 1)[0]);
	}
	return res;
};
