const handleDeleteStockMovement = (req, res, db) => {
	const { stock_movement_id } = req.body

		// const movement_count = db
		// .select('stock_item_serial')
		// .from('stock_movement')
		// .where('stock_movement_id', stock_movement_id)
		// .then(serial => {
		// 	console.log(serial[0].stock_item_serial)
		// 	db('stock_movement')
		// 	.count('stock_item_serial')
		// 	.where('stock_item_serial', serial[0].stock_item_serial)
		// 	.groupBy('stock_item_serial')
		// 	.then(count => console.log(count))
		// 	.then(res.json('done'))
		// })

		db('stock_movement')
		.del()
		.where('stock_movement_id', stock_movement_id)
		.returning('stock_movement_id')
		.then(id => res.json(id))
		.catch(err => res.status(400).json(err))
}


module.exports = {
	handleDeleteStockMovement
}