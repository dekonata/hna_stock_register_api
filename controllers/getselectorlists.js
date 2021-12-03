const handleGetSelectorLists = (req, res, db) => {
// Get stock and location infor to be used in front end dropdown selector lists

	const location_list = db
		.select('location_id', 'location_name', 'location_type')
		.from('stock_location')
		.then(location_data => {
			const locations = location_data.map(location => {
				// format list as "id clubname" string list for display in frontend suggestion box
				return location.location_id + ' ' + location.location_name
			});
			const location_types = [...new Set(location_data.map(location => location.location_type))];
			const suppliers = location_data.filter(location => location.location_type === 'Supplier').map(supplier => supplier.location_id + ' ' + supplier.location_name)
			return { locations, location_types, suppliers }
		})
		.catch(err => console.log('stock list faile with error: ' + err))

	const stock_lists =	db('stock_item')
		.select('stock_item_serial', 'stock_type', 'make', 'model', 'stock_condition', 'stock_owner' )
		.then(items =>{ 
			const serials = 			items.map(item => item.stock_item_serial)
			const types = 				[...new Set(items.map(item => item.stock_type))]
			const models = 				[...new Set(items.map(item => item.model))]
			const makes = 				[...new Set(items.map(item => item.make))]
			const conditions = 			[...new Set(items.map(item => item.stock_condition))]
			const ownwers = 			[...new Set(items.map(item => item.stock_owner))]

			return {serials, types, makes, conditions, models}
		})
		.catch(err => console.log('serial list failed with error: ' + err))

	const getSelectorLists = async () => {
		try {
			const { locations, location_types, suppliers } = await location_list;
			const {serials, types, makes, conditions, models} = await stock_lists;
			const selectorLists = {
				locationlists: { 
					locations,
					location_types,
					suppliers
				},
				stocklists: {
					serials, 
					types, 
					makes, 
					conditions, 
					models
				}
			}
			res.json(selectorLists);
		} catch(err) {
			console.log("Testlist failed with error: " + err);
		}
	}

	getSelectorLists()

}


module.exports = {
	handleGetSelectorLists
}
