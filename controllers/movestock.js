const handleMoveStock = (req, res, db) => {
	db.transaction(trx => {
		const {
			movement_type,
			stock_item_serial,
			location_to_id,
			movement_date,
			stock_condition,
			reference
		} = req.body	

		return trx.insert({
			movement_type,
			stock_item_serial,
			location_to_id,
			movement_date,
			reference	
		})
		.into('stock_movement')
		.then(() => {
				return trx('stock_item')
				.where('stock_item_serial', '=', stock_item_serial)
				.update({'stock_condition': stock_condition})
		})
	})
	.then(() => res.json('Done'))
	.catch(err => res.status(400).json('ERROR:' + err))
}


// 	})
// 	const {
// 		movement_type,
// 		stock_item_serial,
// 		location_to_id,
// 		movement_date,
// 		stock_condition
// 	} = req.body

// 	db.insert({
// 		movement_type,
// 		stock_item_serial,
// 		location_to_id,
// 		movement_date
// 	})
// 	.into('stock_movement')
// 	.returning('stock_movement_id')
// 	.then(id => res.json(id))
// 	.catch(err => res.status(400).json(err))
// }


module.exports = {
	handleMoveStock
}