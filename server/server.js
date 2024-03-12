const express = require('express')
const cors = require('cors')

const sequelize = require('./database')

const seed = require('./seed.js')
const {addAppointment, editAppointment, deleteAppt, displayAppointments, getAppointmentById} = require('./controller.js')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/seed', seed)
app.post('/api/scheduleAppointment', addAppointment)
app.get('/api/get-appointments', displayAppointments)
app.delete('/api/delete-appointment/:id', deleteAppt)
app.put('/api/appointments/:id', editAppointment)
app.get('/api/appointments/:id', getAppointmentById)


// seed()

app.listen(4545, () => console.log(`it is what it is 4545`))