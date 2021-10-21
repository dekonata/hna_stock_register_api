const express = require("express");
const app = express();
const cors = require("cors")
const knex = require("knex")

const addstock = require('./controllers/addstock')
const addlocation = require('./controllers/addlocation')
const stockitem = require('./controllers/stockitem')
const movestock = require('./controllers/movestock')
const getlocationlist = require('./controllers/getlocationlist')

app.use(express.json());
app.use(cors());

const db = knex({   // create knex function
	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Ludium99',
    database : 'hna_stock_register'
  }
});


/*
note format: /endpoint --> Methot = Response
/add_stock --> POST = stockitem
*/

// const test = db('stock_location')
// 	.insert({location_id:1, location_name: "Test Location", location_type:"TEST" })
// 	.then(result => console.log('test2')
// 	);


app.post('/addstock', (req,res) => addstock.handleAddStock(req, res, db));
app.post('/addlocation', (req, res) => addlocation.handleAddLocation(req, res, db));
app.get('/stockitem/:searchfield', (req, res) => stockitem.handleGetStockItem(req, res, db));
app.get('/stockmovements/:searchfield', (req, res) => stockitem.handleGetItemMovements(req, res, db));
app.get('/locationlist', (req,res) => getlocationlist.handleGetLocationList(req, res ,db));
app.post('/movestock', (req,res) => movestock.handleMoveStock(req, res ,db));

app.get('/stockmakes', (req,res) => {
	const stockdata = db('stock_item')
		.distinct('make')
		.then(makes =>{ 
			makelist = makes.map(make => make.make)
			return res.json(makelist)
		})
		.catch(err => res.status(400).json(err))
});

app.get('/serial_list', (req,res) => {
	db('stock_item')
	.distinct('stock_item_serial')
	.then(serials =>{ 
		serial_list = serials.map(serial => serial.stock_item_serial)
		return res.json(serial_list)
	})
	.catch(err => res.status(400).json(err))
});

app.get('/stockdata', (req,res) => {
	const searchfield = req.body.searchfield
	const stockdata = db.select('*').from('stock_item').where({stock_item_serial: searchfield})
		.then(data => res.json(data))
		.catch(err => res.status(400).json(err))
});

app.listen(3000, () => {
	console.log('app is running on port 3000')
});