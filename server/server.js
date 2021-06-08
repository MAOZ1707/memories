const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const chalk = require('chalk')
const app = require('./app')

dotenv.config({ path: './config.env' })

app.options('*', cors())
app.use(cors())
app.use(cors({ origin: true, credentials: true }))

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Credentials', true)
	req.header('Referer')
	res.header(
		'Access-Control-Allow-Methods',
		'GET,PUT,POST,PATCH,DELETE,OPTIONS'
	)
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content-Type',
		'Accept,content-type,application/json'
	)
	next()
})

let dbUrl = process.env.DB_ATLAS_URL

if (process.env.DB_URL) {
	dbUrl = process.env.DB_URL
}

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log(chalk.green.bold('DB connection successful!!'))
	})
	.catch((err) => console.log(err, chalk.red.bold('DB connection failed!!')))

// server
let port = 4000
if (process.env.PORT) {
	port = process.env.PORT
}

app.listen(port, () => {
	console.log(chalk.magentaBright('App running !!'))
})
