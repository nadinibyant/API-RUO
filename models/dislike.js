const {Sequelize, DataTypes} = require ('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
const Therapy = require('./therapy')
const User = require('./users')

const Dislike = sequelize.define('dislike', {
    id_dislike:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_therapy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:Therapy,
            key: 'id_therapy'
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user'
        }
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    tableName: 'dislike',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

Dislike.belongsTo(Therapy, {
    foreignKey: 'id_therapy',
    as: 'DataTherapy'
})

Dislike.belongsTo(User, {
    foreignKey: 'id_user',
    as: 'DataUser'
})

module.exports = Dislike