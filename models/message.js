const {Sequelize, DataTypes} = require ('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
const User = require('./users')
const HideAccount = require('./hideAccount')

const Message = sequelize.define('message', {
    id_message: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    }, 
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user'
        }
    },
    isi_message:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_hide:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: HideAccount,
            key: 'id_hide'
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
    tableName: 'message',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
})

Message.belongsTo(HideAccount, {
    foreignKey: 'id_hide',
    as: 'statusHide'
})

Message.belongsTo(User, {
    foreignKey: 'id_user',
    as: 'idUser'
})

module.exports = Message
