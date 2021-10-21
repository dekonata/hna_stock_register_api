const handleGetLocationList = (req, res, db) => {
	db
	.select('location_id', 'location_name')
	.from('stock_location')
	.then(locations => {
		const locationlist = locations.map(location => {
			// format list as "id clubname" string list for display in frontend suggestion box
			return location.location_id + ' ' + location.location_name
		})
		res.json(locationlist)
	})
	.catch(err => res.status(400).json(err))
}


module.exports = {
	handleGetLocationList
}