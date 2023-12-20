const response = require('express')
const jwt = require('jsonwebtoken')
const Message = require('../models/message')
const User = require('../models/users')
const Comment = require('../models/comment')
const controllers = {}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }
    next();
};


const getAllMessage = async (req,res) => {
    const allMessage = await Message.findAll()
    if (allMessage.length > 0) {
        res.status(200).json({
            success: true,
            message: 'Data message found',
            dataMessage: allMessage
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data message not found'
        })
    }
}
controllers.getAllMessage = [verifyToken, getAllMessage]

const getAccount = async (req,res) => {
    const id_message = req.params.id_message
    const findMessage = await Message.findOne({
        where:{
            id_message: id_message
        }
    })
    if (findMessage) {
        const id_hide = findMessage.id_hide
        if (id_hide == 1) {
            res.status(200).json({
                success: true,
                message: 'Sorry, you can’t see this profile. User hide the profile'
            })
        } else {
            const id_user = findMessage.id_user
            const findUser = await User.findByPk(id_user)
            res.status(200).json({
                success: true,
                Message: 'User found',
                dataUser: findUser
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Data message not found'
        })
    }
}
controllers.getAccount = [verifyToken, getAccount]

const addComment = async (req,res) => {
    const id_user = req.params.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const id_message = req.params.id_message
        const findMessage = await Message.findByPk(id_message)
        if (findMessage) {
            const isi_comment = req.body.isi_comment
            if (!isi_comment) {
                res.status(400).json({
                    success: false,
                    message: 'Please fill in your comments'
                })
            } else {
                const addComm = await Comment.create({
                    id_message: id_message,
                    id_user: id_user,
                    isi_comment: isi_comment
                })
                if (addComm) {
                    res.status(200).json({
                        success: true,
                        message: 'Comment added successfully'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Comment was added unsuccessfully'
                    })
                }
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Data message not found'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Session Expired'
        })
    }
}
controllers.addComment = [verifyToken, addComment]

module.exports = controllers