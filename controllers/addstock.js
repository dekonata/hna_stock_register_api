const handleAddStock = (req, res, db) => {
	db.transaction(trx => {

		const {
			stock_item_serial,
			stock_type,
			make,
			model,
			stock_condition,
			stock_owner,
			movement_type,
			location_to_id,
			movement_date,
			imei
		} = req.body

		return trx.insert({			
			stock_item_serial,
			stock_type,
			make,
			model,
			stock_condition,
			stock_owner
		})
		.into('stock_item')
		.then(() => {
			return trx.insert({
				movement_type,
				stock_item_serial,
				location_to_id,
				movement_date
			})
			.into('stock_movement')
			.returning("stock_item_serial")
		})
		.then(() => {
				 if(stock_type.toLowerCase() === 'modem') {
					return trx.insert({
						modem_serial: stock_item_serial,
						imei: imei
					})
					.into('modem')
				}
		})
	})
	.then(() => res.json('all Good'))
	.catch(err => res.status(400).json(err))
}


module.exports = {
	handleAddStock
}