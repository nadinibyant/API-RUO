const response = require('express')
const jwt = require('jsonwebtoken')
const ChatTerry = require('../models/chatTerry');
const ChatUser = require('../models/chatUser')
const User = require('../models/users');
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

    // try {
    //     const decoded = jwt.verify(token, "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbmlkaW5pQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2ODE4OTI3MjAsImV4cCI6MTY4MTg5NDUyMH0.YMp71HNEhBCNG3q-AXoVVhtJadaog6tcJIHWmLRxnx");
    //     req.user = decoded.id_user;
    //     next();
    // } catch (error) {
    //     return res.status(401).json({
    //         success: false,
    //         message: 'Unauthorized: Invalid token'
    //     });
    // }
};

// tampil pertanyaan
const getQuest = async (req, res) => {
    const getAll = await ChatTerry.findAll()
    if (getAll.length > 0) {
        res.status(200).json({
            success: true,
            message: 'Question Found',
            question: getAll
        })
    } else {
        res.stats(400).json({
            success: false,
            message: 'Question not found'
        })
    }
}
controllers.getQuest = [verifyToken, getQuest]

//jawab pertanyaan 1
const answeQuest1 = async (req, res) => {
    const id_user = req.params.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const answer1 = req.body.answer1
        if (!answer1) {
            res.status(400).json({
                success: false,
                message: 'Please enter your answer first'
            })
        } else {
            const addAnswer = await ChatUser.create({
                id_chat: 1,
                id_user: id_user,
                jawaban: answer1
            })

            if (addAnswer) {
                res.status(200).json({
                    success: true, 
                    message: 'Answer successfully submitted'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Answer was not submitted successfully'
                })
            }
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Session Expired'
        })
    }
}
controllers.answeQuest1 = [verifyToken, answeQuest1]

//jawab pertanyaan 2
const answeQuest2 = async (req, res) => {
    const id_user = req.session.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const answer2 = req.body.answer2
        if (!answer2) {
            res.status(400).json({
                success: false,
                message: 'Please enter your answer first'
            })
        } else {
            const addAnswer = await ChatUser.create({
                id_chat: 2,
                id_user: id_user,
                jawaban: answer2
            })

            if (addAnswer) {
                res.status(200).json({
                    success: true, 
                    message: 'Answer successfully submitted'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Answer was not submitted successfully'
                })
            }
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Session Expired'
        })
    }
}
controllers.answeQuest2 = [verifyToken, answeQuest2]

module.exports = controllers