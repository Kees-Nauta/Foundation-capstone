const sequelize = require('./database.js')

module.exports = {

    displayAppointments: (req, res) => {
        sequelize.query(`
            SELECT * FROM Appointments
            ORDER BY time ASC;
        `).then(dbRes => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log(err))
    },
    addAppointment: (req, res) => {
        const {name, time, breed, package, returningCustomer} = req.body 

        sequelize.query(`
            INSERT INTO Appointments (appointment_name, time, breed, package_type, returning_customer)
            VALUES (
                '${name}',
                '${time}',
                '${breed}',
                '${package}',
                ${returningCustomer === 'true'}
            )
            RETURNING *;
        `).then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    },
    deleteAppt: (req, res) => {
        const { id } = req.params
        sequelize.query(`
          DELETE FROM Appointments
          WHERE appointment_id = ${id}
        `)
          .then(dbRes => {
            res.status(200).send(dbRes[0])
          })
          .catch(err => {
            console.error('Error deleting appointment:', err)
            res.status(500).send('Error deleting appointment')
          })
      },
      editAppointment: (req, res) => {
        const { id } = req.params;
        const { name, time, breed, package, returningCustomer } = req.body;
    
        sequelize.query(`
            UPDATE Appointments
            SET appointment_name = '${name}',
                time = '${time}',
                breed = '${breed}',
                package_type = '${package}',
                returning_customer = ${returningCustomer === 'true'}
            WHERE appointment_id = ${id}
            RETURNING *;
        `).then(dbRes => {
            if (dbRes[0].length > 0) {
                res.status(200).send(dbRes[0][0]);
            } else {
                res.status(404).send('Appointment not found');
            }
        })
        .catch(err => {
            console.error('Error updating appointment:', err);
            res.status(500).send('Error updating appointment');
        });
    },
    getAppointmentById: (req, res) => {
        const { id } = req.params;

        sequelize.query(`
            SELECT * FROM Appointments
            WHERE appointment_id = ${id};
        `)
        .then(dbRes => {
            if (dbRes[0].length > 0) {
                res.status(200).send(dbRes[0][0]);
            } else {
                res.status(404).send('Appointment not found');
            }
        })
        .catch(err => {
            console.error('Error retrieving appointment:', err);
            res.status(500).send('Error retrieving appointment');
        });
    },
    
    }
    





