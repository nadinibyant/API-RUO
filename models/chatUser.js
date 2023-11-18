const {Sequelize, DataTypes} = require ('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
const User = require('./users')
const ChatTerry = require('./chatTerry')

const ChatUser = sequelize.define('chatuser', {
    id_chat_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, 
    id_chat:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ChatTerry,
            key: 'id_chat'
        }
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user'
        }
    },
    jawaban:{
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'chatuser',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
})

module.exports = ChatUser