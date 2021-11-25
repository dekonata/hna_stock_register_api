const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("knex");
const types = require('pg').types;

const addstock = require('./controllers/addstock');
const addlocation = require('./controllers/addlocation');
const stockitem = require('./controllers/stockitem');
const movestock = require('./controllers/movestock');
const getlocationlist = require('./controllers/getlocationlist');
const getselectorlists = require('./controllers/getselectorlists')
const delete_stockmovement = require('./controllers/delete_stockmovement');
const editstockitem = require('./controllers/editstockitem');


// override parsing date and timestamp column to Date() as this causes timezone issue - convert to string
types.setTypeParser(1082, val => val); 
types.setTypeParser(1114, val => val); 

app.use(express.json());
app.use(cors());

const db = knex({   // create knex function
	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Ludium99',
    database : 'hna_stock_register',
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
app.get('/selectorlists', (req,res) => getselectorlists.handleGetSelectorLists(req, res ,db));;
app.post('/movestock', (req,res) => movestock.handleMoveStock(req, res ,db));
app.delete('/delete_stockmovement', (req, res) => delete_stockmovement.handleDeleteStockMovement(req, res, db));
app.put('/editstockitem', (req, res) => editstockitem.handleEditStockItem(req, res, db));

app.get('/stockdata', (req,res) => {
	const searchfield = req.body.searchfield
	const stockdata = db.select('*').from('stock_item').where({stock_item_serial: searchfield})
		.then(data => res.json(data))
		.catch(err => res.status(400).json(err))
});

app.listen(3000, () => {
	console.log('app is running on port 3000')
});