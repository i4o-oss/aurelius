export const padZeroes = (n: number, z = 2) => {
	return ('00' + n).slice(-z)
}
