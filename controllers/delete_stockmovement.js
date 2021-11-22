

const handleDeleteStockMovement = (req, res, db) => {
	const { stock_movement_id } = req.body

	db
	.select('stock_item_serial', 'movement_type')
	.from('stock_movement')
	.where('stock_movement_id', stock_movement_id)
	.then(serial => {	
		db('stock_movement')
		.count('stock_item_serial')
		.where('stock_item_serial', serial[0].stock_item_serial)
		.groupBy('stock_item_serial')
		.then(count => {
			// If its last movement for stock item, delete stock item record as well
			parseInt(count[0].count) === 1 ? 
				db.transaction(trx => {
					return trx('stock_movement')
					.del()
					.where('stock_movement_id', stock_movement_id)
					.returning('stock_item_serial')
					.then(serial => {
						console.log(serial)
						return trx('stock_item')
						.del()
						.where('stock_item_serial', serial[0])
						.then(serial => res.json(' deleted'))
					})
				})
			: 
				db('stock_movement')
				.del()
				.where('stock_movement_id', stock_movement_id)
				.returning('stock_movement_id')
				.then(id => res.json('deleted'))
			})
		})
	.catch(err => {
		console.log(err)
		return 	res.status(400).json('There was a problem :-(')
	})
}


module.exports = {
	handleDeleteStockMovement
}