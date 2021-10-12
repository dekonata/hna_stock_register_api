const handleAddLocation = (req, res, db) => {
	const {
		location_id,
		location_type,
		location_name
	} = req.body


	db.insert({
		location_id,
		location_type,
		location_name
	})
	.into('stock_location')
	.returning('location_id')
	.then(id => res.json(id))
	.catch(err => res.status(400).json(err))
}


module.exports = {
	handleAddLocation
}