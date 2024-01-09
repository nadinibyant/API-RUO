const {Sequelize, DataTypes} = require ('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)

const User = sequelize.define('user', {
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, 
    foto_user:{
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    medsos:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    fcmToken:{
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: 'user',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
})

module.exports = User