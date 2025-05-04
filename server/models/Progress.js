const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');

const Progress = sequelize.define('Progress', {
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
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    bodyMeasurements: {
        type: DataTypes.JSON,
        allowNull: true
    },
    workoutPerformance: {
        type: DataTypes.JSON,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    photos: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    timestamps: true
});

// Define the relationship
User.hasMany(Progress, { foreignKey: 'userId' });
Progress.belongsTo(User, { foreignKey: 'userId' });

module.exports = Progress;