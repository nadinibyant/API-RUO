const {Sequelize, DataTypes} = require ('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
const User = require('./users')

const Therapy = sequelize.define('therapy', {
    id_therapy:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    foto_psikolog:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    nama_psikolog:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lama_karir:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    no_telp_psikolog:{
        type: DataTypes.STRING,
        allowNull: false
    },
    medsos_psikolog:{
        type: DataTypes.STRING,
        allowNull: true
    }, 
    spesialis_psikolog: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: User,
            key: 'id_user'
        }
    }, 
    like: {
        type: DataTypes.INTEGER,
        allowNull: true
    }, 
    dislike: {
        type: DataTypes.INTEGER,
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
    tableName: 'therapy',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
})
 
Therapy.belongsTo(User, {
    foreignKey: 'id_user',
    as: 'idUser'
})

module.exports = Therapy