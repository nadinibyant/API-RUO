const response = require('express')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const controllers = {}




//register
const register = async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    if (!username || !email || !password) {
        res.status(400).json({
            success: false,
            message: 'Please complete your account data!'
        })
    } else {
        const findEmail = await User.findOne({
            where: {
                email: email
            }
        })

        const findUsername = await User.findOne({
            where: {
                username: username
            }
        })

        if (findEmail) {
            res.status(400).json({
                success: false,
                message: 'Email Already Used'
            })
        } else if (findUsername) {
            res.status(400).json({
                success: false,
                message: 'Username Already Used'
            })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hashedPass = bcrypt.hashSync(password, salt)

            const addUser = await User.create({
                username: username,
                email: email,
                password: hashedPass
            })

            if (addUser) {
                res.status(200).json({
                    success: true,
                    message: 'Account registration was successful'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Account registration was unsuccessful'
                })
            }
        }
    }
}
controllers.register = register

//login
const login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const token = req.body.token

    if (!username || !password) {
        res.status(400).json({
            success: false,
            message: 'Please complete your account data!'
        })
    } else {
        const findUser = await User.findOne({
            where: {
                username: username
            }
        })

        if (findUser) {
            const findPass = findUser.password
            const id_user = findUser.id_user
            bcrypt.compare(password, findPass, async (err, result) => {
                if (err || !result) {
                    res.status(400).json({
                        success: false,
                        message: 'Your password is wrong'
                    })
                } else {
                    const update = await User.update({
                        fcmToken: token
                    }, {
                        where: {
                            id_user: id_user
                        }
                    })
                    if (update) {
                        const token = jwt.sign({
                                id_user: id_user
                            },
                            process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: '10h'
                            }
                        )

                        req.session.id_user = id_user
                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 2 * 60 * 60 * 1000,
                        });

                        res.header('Authorization', `Bearer ${token}`);

                        res.status(200).json({
                            success: true,
                            message: 'Login successful',
                            token: token,
                            id_user: id_user
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            messaging: 'Token fcm tidak ada'
                        })
                    }

                }
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
    }
}
controllers.login = login

const forgetPassword = async (req, res) => {
    const email = req.body.email
    const newPass = req.body.newPass
    const confNewPass = req.body.confNewPass

    if (!email || !newPass || !confNewPass) {
        res.status(400).json({
            success: false,
            message: 'Please complete your data input'
        })
    } else {
        if (newPass == confNewPass) {
            const findEmail = await User.findOne({
                where: {
                    email: email
                }
            })
            if (findEmail) {
                const salt = bcrypt.genSaltSync(10)
                const hashedPass = bcrypt.hashSync(newPass, salt)

                const updatePass = await User.update({
                    password: hashedPass
                }, {
                    where: {
                        email: email
                    }
                })

                if (updatePass) {
                    res.status(200).json({
                        success: true,
                        message: 'Password updated successfully'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'The password was not updated successfully'
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Email not found'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Your password and confirmation are not the same'
            })
        }
    }
}
controllers.forgetPassword = forgetPassword

module.exports = controllers