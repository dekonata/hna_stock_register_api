const express = require('express')
cons app = express()

const app = express()

app.get('/', (req, res) => {
	res.send('IT STARTS');
})

app.listen(3000);