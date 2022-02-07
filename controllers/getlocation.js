const handleGetLocation = (req, res, db) => {
	const { location_id } = req.query

	const location = db.select('*')
		.from('stock_location')
		.where('location_id', location_id)
		.then(location_data => location_data)
		.catch(err => res.status(400).json(err))


	const stock = db.select(
		'current_locations.stock_item_serial',
		'stock_item.stock_type',
		'stock_item.make',
		'stock_item.model'
		)
	.from((subquery) => {
		subquery.select(
			'stock_item_serial',
			'location_to_id'
			)
		.from('stock_movement')
		.distinctOn('stock_item_serial')
		.orderBy([{column: 'stock_item_serial'}, {column: 'movement_date', order:'desc'}])
		.as('current_locations')
	})
	.leftJoin('stock_item', 'current_locations.stock_item_serial', 'stock_item.stock_item_serial')
	.where('location_to_id', location_id)
	.then(stockitems => res.json(stockitems))
	.catch(err => res.status(400).json(err))


}

module.exports = {
	handleGetLocation
}