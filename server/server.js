const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const chalk = require('chalk')
const app = require('./app')

dotenv.config({ path: './config.env' })

app.use(cors())
app.use(cors({ origin: true, credentials: true }))

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
