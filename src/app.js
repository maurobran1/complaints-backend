const express = require('express')
const cors = require("cors")
const morgan = require('morgan')
const routes = require('./routes/complaints.routes')
const complaintsTypeRoutes = require('./routes/complaintsType.routes')
const complaintsStateRoutes = require('./routes/complaintsState.routes')

const app = express()

//settings
app.set('port', process.env.PORT || 4000)

//middlewares
app.use('/uploads', express.static('uploads'))
//const corsOptions = {origin: "http://localhost:4200"}
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use('/api/complaints', routes)
app.use('/api/complaintstype', complaintsTypeRoutes)
app.use('/api/complaintsstate', complaintsStateRoutes)

module.exports = app