const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
	res.json({ msg: "Hello World!" })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

// NODEMON

// send data to the exposed endpoints
// import data from students.json and send it to the client when they hit the endpoint
// use postman to send data to endpoints

// GET - retrieve data
// POST - create new data
// PUT - update existing data
// DELETE - remove data
// CRUD - create, read, update, delete

// SEND DATA vs SEND ERROR
// STATUS CODES - 200, 201, 400, 404
// JSON - JavaScript Object Notation
// res.json() - send JSON response
// res.status() - set status code
// res.send() - send response
