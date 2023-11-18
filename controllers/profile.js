const response = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const multer = require('multer')
const path = require('path')
const Message = require('../models/message')
const Comment = require('../models/comment')
const controllers = {}

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // return res.redirect('/login');
        res.status(404).json({
            success: false,
            message: 'Session Token Has Expired'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        next();
    } catch (error) {
        // return res.redirect('/login');
        res.status(404).json({
            success: false,
            message: 'Session Token Has Expired'
        })
    }
};

// tampil data user aktif
const getDataUser = async (req,res) => {
    const id_user = req.session.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        res.status(200).json({
            success: true,
            message: 'User found',
            data: findUser
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Session Expired'
        })
    }
}
controllers.getDataUser = [verifyToken, getDataUser]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'images', 'profile'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new multer.MulterError('File type is not allowed, only JPEG/JPG is allowed');
        error.message = 'File type is not allowed, only JPEG/JPG is allowed'
        return cb(error, false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
const uploadd = upload.single('file')

// edit profile
const editProfile = async (req,res) => {
    const id_user = req.session.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const foto_user = req.file
        const username = req.body.username || findUser.username
        const email = req.body.email || findUser.email
        const phone = req.body.phone || findUser.phone
        const medsos = req.body.medsos || findUser.medsos
        const description = req.body.description || findUser.description

        var foto
        if (foto_user) {
            foto = foto_user.originalname
        } else {
            foto = findUser.foto_user
        }
        
         var accUpdate 
         if (username && username !== findUser.username) {
            const findUsername = await User.findOne({
                where: {
                    username: username
                }
            })
            if (findUsername) {
                accUpdate = false
            } else {
                accUpdate = true
            }
         } else if (email && email !== findUser.email){
            const findEmail = await User.findOne({
                where:{
                    email: email
                }
            })
            if (findEmail) {
                accUpdate = false
            } else {
                accUpdate = true
            }
         } else {
            accUpdate = true
         }

         if (accUpdate == true) {
            const updateProfile = await User.update({
                foto_user: foto,
                username: username,
                email: email,
                phone: phone,
                medsos: medsos,
                description: description
            }, {
                where:{
                    id_user: id_user
                }
            })

            if (updateProfile) {
                res.status(200).json({
                    success: true,
                    message: 'Data updated successfully'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data was not updated successfully'
                })
            }
         } else {
            res.status(400).json({
                success: false,
                message: 'Username of Email is Already in Use'
            })
         }
       
    } else {
        res.status(400).json({
            success: false,
            message: 'Session Expired'
        })
    }
    
}
controllers.editProfile = [verifyToken,uploadd,editProfile]

// tampil semua message user yg pernah di upload
const getMyMessage = async (req,res) => {
    const id_user = req.session.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const findMyMessage = await Message.findAll({
            where:{
                id_user: id_user
            }
        })
        if (findMyMessage.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Data Message found',
                dataMyMessage: findMyMessage
            })
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
controllers.getMyMessage = [verifyToken, getMyMessage]

//tampil detail message yang dipilih
const detailMessage = async (req,res) => {
    const id_message = req.params.id_message
    const findMyMessage = await Message.findOne({
        where: {
            id_message: id_message
        }
    })
    if (findMyMessage) {
        res.status(200).json({
            success: true,
            message: 'Data message found',
            detailMyMessage: findMyMessage
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data message not found'
        })
    }
}
controllers.detailMessage = [verifyToken, detailMessage]

//tampil semua komen berdasar message yang dipilih
const getAllCommentMessage = async (req,res) => {
    const id_message = req.params.id_message
    const findMessage = await Message.findByPk(id_message)
    if (findMessage) {
        const findAllComment = await Comment.findAll({
            where:{
                id_message: id_message
            }
        })
        if (findAllComment.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Comment the message found',
                dataComment: findAllComment
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Comment the message not found'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Data message not found'
        })
    }
}
controllers.getAllCommentMessage = [verifyToken,getAllCommentMessage]

// edit message
const editMyMessage = async (req,res) => {
    const id_message = req.params.id_message
    const findMessage = await Message.findByPk(id_message)
    if (findMessage) {
        const isi_message = req.body.isi_message || findMessage.isi_message
        const status_hide = req.body.status_hide || findMessage.id_hide

        var id_hide
        if (status_hide == 'true' || status_hide == true) {
            id_hide = 1
        } else {
            id_hide = 2
        }


        const updateMessage = await Message.update({
            isi_message: isi_message,
            id_hide: id_hide
        }, {
            where:{
                id_message: id_message
            }
        })
        if (updateMessage) {
            res.status(200).json({
                success: true,
                message: 'The data message was updated successfully'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Message data was not successfully updated'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Data message not found'
        })
    }
}
controllers.editMyMessage = [verifyToken, editMyMessage]

//hapus message
const deleteMyMessage = async (req,res) => {
    const id_message = req.params.id_message
    const findMessage = await Message.findByPk(id_message)
    if (findMessage) {
        const delMessage = await Message.destroy({
            where:{
                id_message: id_message
            }
        })
        if (delMessage) {
            res.status(200).json({
                success: true,
                message: 'Message data has been successfully deleted'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Message data was not successfully deleted'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Data message not found'
        })
    }
}
controllers.deleteMyMessage = [verifyToken, deleteMyMessage]

//tambah message
const addMessage = async (req,res) => {
    const id_user = req.session.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const isi_message = req.body.isi_message
        const status_hide = req.body.status_hide
    
        if (!isi_message) {
            res.status(400).json({
                success: false,
                message: 'Please fill in the message you want to upload'
            })
        } else {
            var id_hide
            if (status_hide == 'true' || status_hide == true) {
                id_hide = 1
            } else {
                id_hide = 2
            }
    
            const addMyMessage = await Message.create({
                isi_message: isi_message,
                id_hide: id_hide,
                id_user: id_user
            }) 

            if (addMyMessage) {
                res.status(200).json({
                    success: true,
                    message: 'Message added successfully'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Message was not added successfully'
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
controllers.addMessage = [verifyToken, addMessage]
module.exports = controllers