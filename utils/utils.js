
const toUpperValues = (object) => {
	// Convert all string values in object to uppercase
	const upperObject = {}
	for (item in object) {
		if (typeof object[item] === 'string') {
			upperObject[item] = object[item].toUpperCase()
		} else if (typeof object[item] === 'object') {
			upperObject[item] = toUpperValues(object[item])
		} else {
			upperObject[item] = object[item]
		}
	}
	return(upperObject)
}

module.exports = {
	toUpperValues
}