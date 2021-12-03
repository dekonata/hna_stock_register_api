const handleGetStockItem = (req, res, db) => {
	const { searchfield } = req.params
	db.select(	
		'stock_item.stock_item_serial',
		'stock_item.stock_type', 
		'stock_item.make',
		'stock_item.model',
		'stock_item.stock_condition',
		'stock_item.stock_owner',
		'stock_item.supplier_id',
		'supplier.location_name as supplier_name',
		'stock_movement.location_to_id', 
		'current_location.location_name',
	)
	.from('stock_item')
	.leftJoin('stock_movement', 'stock_item.stock_item_serial', 'stock_movement.stock_item_serial' )
	.leftJoin('stock_location as current_location', 'current_location.location_id', 'stock_movement.location_to_id')
	.leftJoin('stock_location as supplier', 'supplier.location_id', 'stock_item.supplier_id')
	.where({'stock_item.stock_item_serial': searchfield})
	.orderBy('movement_date', 'desc')
	.limit(1)
	.then(stockitem => res.json(stockitem))
	.catch(err => res.status(400).json(err))
}

const handleGetItemMovements = (req, res, db) => {
	// Dates are returned and sent in UTC time - must be parsed in frontend
	const { searchfield } = req.params
	db.select(	
		'stock_movement_id',
		'stock_movement.stock_item_serial',
		'location_name',
		'movement_type',
		'movement_date',
		'capture_date'
	)
	.from('stock_movement')
	.leftJoin('stock_location', 'stock_location.location_id', 'stock_movement.location_to_id')
	.where({'stock_item_serial': searchfield})
	.orderBy('movement_date', 'desc')
	.then(movements => res.json(movements))
	.catch(err => res.status(400).json(err))
}


module.exports = {
	handleGetStockItem,
	handleGetItemMovements
}