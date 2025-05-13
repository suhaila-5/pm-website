const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/app/database.sqlite', // Use absolute path in Docker
    logging: console.log, // Enable logging to see what's happening
    define: {
        timestamps: true
    },
    dialectOptions: {
        // Add SQLite specific options
        mode: 0o666
    }
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;