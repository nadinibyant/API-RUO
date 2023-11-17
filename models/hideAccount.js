const {Sequelize, DataTypes} = require ('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)

const HideAccount = sequelize.define('hideaccount', {
    id_hide:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
    },
    status_hide:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    }, updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'hideaccount',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
})

module.exports = HideAccount