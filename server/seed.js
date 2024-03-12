const sequelize = require('./database.js')

const seed = async (req, res) => {
    try {
        await sequelize.query(`
            DROP TABLE IF EXISTS appointments;

            CREATE TABLE IF NOT EXISTS appointments (
                appointment_id SERIAL PRIMARY KEY,
                appointment_name VARCHAR(255),
                time VARCHAR(255),
                breed VARCHAR(255),
                package_type VARCHAR(255),
                returning_customer BOOLEAN
            );

            INSERT INTO appointments (appointment_name, time, breed, package_type, returning_customer)
            VALUES
                ('Fluffy', 10, 'Poodle', 'Full Service', FALSE),
                ('Max', 11, 'Labrador', 'Bath', TRUE);
        `).then(() => console.log(`DB has been seeded!`));
    } catch (err) {
        console.error('Error seeding DB:', err);
        res.Status(500).send(`err seeding data base`);
    }
};


module.exports = seed