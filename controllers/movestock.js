const handleMoveStock = (req, res, db) => {
	const {
		movement_type,
		stock_item_serial,
		location_to_id,
		movement_date
	} = req.body

	db.insert({
		movement_type,
		stock_item_serial,
		location_to_id,
		movement_date
	})
	.into('stock_movement')
	.returning('stock_movement_id')
	.then(id => res.json(id))
	.catch(err => res.status(400).json(err))
}


module.exports = {
	handleMoveStock
}