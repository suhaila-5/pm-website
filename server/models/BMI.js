const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');

const BMI = sequelize.define('BMI', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    bmiValue: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true
});

// Define the relationship
User.hasMany(BMI, { foreignKey: 'userId' });
BMI.belongsTo(User, { foreignKey: 'userId' });

module.exports = BMI;