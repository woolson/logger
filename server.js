var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
var app = express()
var utils = require('./src/utils')
var PORT = 8081

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(__dirname))
app.post('/api/catchError', function (req, res) {
	var body = req.body
	var logPath = path.join(__dirname, '/static/error.log')
	var date = utils.moment.getCurrent('YYYY-MM-DD HH:mm:SS')
	var content = [
		`${'='.repeat(15)}${date}${'='.repeat(15)}\n`,
		`Error: ${body.msg};\n`,
		`ErrorFile: ${body.url};\n`,
		`ErrorLine: ${body.line};\n`,
		`ErrorCol: ${body.col};\n`,
		`${'='.repeat(49)}\n\n\n`,
	]
	fs.appendFileSync(logPath, content.join(''))
	res.send({success: true})
})

app.listen(PORT)
console.log('Server at port: ', PORT)