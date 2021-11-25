const {toUpperValues} = require('../utils/utils');

const handleAddLocation = (req, res, db) => {
		const uppercase_body = toUpperValues(req.body)
	const {
		location_id,
		location_type,
		location_name
	} = uppercase_body


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