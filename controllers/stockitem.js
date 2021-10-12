const handleGetStockItem = (req, res, db) => {
	const { searchfield } = req.params
	db.select(	
		'stock_item.stock_item_serial',
		'stock_type', 
		'make',
		'model',
		'stock_condition',
		'stock_owner',
		'location_to_id', 
		'location_name',
		'movement_type',
		'movement_date'
	)
	.from('stock_movement')
	.leftJoin('stock_item', 'stock_movement.stock_item_serial', 'stock_item.stock_item_serial' )
	.leftJoin('stock_location', 'stock_location.location_id', 'stock_movement.location_to_id')
	.where({'stock_item.stock_item_serial': searchfield})
	.orderBy('movement_date', 'desc')
	.limit(1)
	.then(stockitem => res.json(stockitem))
	.catch(err => res.status(400).json(err))
}



module.exports = {
	handleGetStockItem
}