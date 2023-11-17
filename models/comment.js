const {Sequelize, DataTypes} = require ('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
const Message = require('./message')
const User = require('./users')

const Comment = sequelize.define('comment', {
    id_comment:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, 
    id_message:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Message,
            key: 'id_message'
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
    isi_comment:{
        type:DataTypes.STRING,
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
    tableName: 'comment',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
})

Comment.belongsTo(Message, {
    foreignKey: 'id_message',
    as: 'idMessage'
})

Comment.belongsTo(User, {
    foreignKey: 'id_user',
    as: 'idUser'
})

module.exports = Comment