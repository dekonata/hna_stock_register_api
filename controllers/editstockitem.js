const {toUpperValues} = require('../utils/utils');

const handleEditStockItem = (req, res, db) => {
	const uppercase_body = toUpperValues(req.body)
	const {stock_item_serial, update_hash } = uppercase_body

	db('stock_item')
		.where('stock_item_serial', '=', stock_item_serial)
		.update(update_hash)
		.then(e => res.json(e))
		.catch(err => res.status(400).json(err))
}

module.exports = {
	handleEditStockItem
}