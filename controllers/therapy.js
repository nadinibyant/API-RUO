const response = require('express')
const Therapy = require('../models/therapy')
const controllers = {}
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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

const allTherapy = async (req, res) => {
    const getAllTherapy = await Therapy.findAll()
    if (getAllTherapy.length > 0) {
        res.status(200).json({
            success: true,
            message: 'Therapy Data Found',
            allTherapy: getAllTherapy
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy Data Not Found'
        })
    }
}
controllers.allTherapy = [verifyToken, allTherapy]

const myTherapy = async (req, res) => {
    const id_user = req.session.id_user
    const getMyTherapy = await Therapy.findAll({
        where: {
            id_user: id_user
        }
    })
    if (getMyTherapy.length > 0) {
        res.status(200).json({
            success: true,
            message: ' Therapy Data Found',
            myTherapy: getMyTherapy
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy Data not Found'
        })
    }
}
controllers.myTherapy = [verifyToken, myTherapy]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'images', 'therapy'))
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

const addTherapy = async (req, res) => {
    const id_user = req.session.id_user
    const foto_psikolog = req.file
    const nama_psikolog = req.body.nama_psikolog
    const lama_karir = req.body.lama_karir
    const no_telp_psikolog = req.body.no_telp_psikolog
    const medsos_psikolog = req.body.medsos_psikolog
    const spesialis_psikolog = req.body.spesialis_psikolog

    if (!foto_psikolog || !nama_psikolog || !lama_karir || !no_telp_psikolog || !medsos_psikolog || !spesialis_psikolog) {
        res.status(400).json({
            success: false,
            message: 'Complete the therapy data you want to add'
        })
    } else {
        const findTherapy = await Therapy.findOne({
            where: {
                nama_psikolog: nama_psikolog
            }
        })

        if (findTherapy) {
            res.status(400).json({
                success: false,
                message: `Therapy data with that name ${nama_psikolog} has been added`
            })
        } else {
            const addTherapy = await Therapy.create({
                foto_psikolog: foto_psikolog.originalname,
                nama_psikolog: nama_psikolog,
                lama_karir: lama_karir,
                no_telp_psikolog: no_telp_psikolog,
                medsos_psikolog: medsos_psikolog,
                spesialis_psikolog: spesialis_psikolog,
                id_user: id_user
            })

            if (addTherapy) {
                res.status(200).json({
                    success: true,
                    message: 'Therapy data added successfully'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Therapy data was not added successfully'
                })
            }
        }
    }
}
controllers.addTherapy = [verifyToken, uploadd, addTherapy]

const editTherapy = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const findTherapy = await Therapy.findOne({
        where: {
            id_therapy: id_therapy
        }
    })

    if (findTherapy) {
        const foto_psikolog = req.file
        const nama_psikolog = req.body.nama_psikolog || findTherapy.nama_psikolog
        const lama_karir = req.body.lama_karir || findTherapy.lama_karir
        const no_telp_psikolog = req.body.no_telp_psikolog || findTherapy.no_telp_psikolog
        const medsos_psikolog = req.body.medsos_psikolog || findTherapy.medsos_psikolog
        const spesialis_psikolog = req.body.spesialis_psikolog || findTherapy.spesialis_psikolog

        var foto
        if (foto_psikolog) {
            foto = foto_psikolog.originalname
        } else {
            foto = findTherapy.foto_psikolog
        }

        const updateTherapy = await Therapy.update({
            foto_psikolog: foto,
            nama_psikolog: nama_psikolog,
            lama_karir: lama_karir,
            no_telp_psikolog: no_telp_psikolog,
            medsos_psikolog: medsos_psikolog,
            spesialis_psikolog: spesialis_psikolog
        }, {
            where: {
                id_therapy: id_therapy
            }
        })

        if (updateTherapy) {
            res.status(200).json({
                success: true,
                message: 'Therapy data successfully updated'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Therapy data was not successfully updated'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy not found'
        })
    }
}
controllers.editTherapy = [verifyToken, uploadd, editTherapy]

const deleteTherapy = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const findTherapy = await Therapy.findOne({
        where: {
            id_therapy: id_therapy
        }
    })
    if (findTherapy) {
        const deleted = await Therapy.destroy({
            where: {
                id_therapy: id_therapy
            }
        })

        if (deleted) {
            res.status(200).json({
                success: true,
                message: 'Therapy data has been successfully deleted'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Therapy data was not successfully deleted'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy not found'
        })
    }
}
controllers.deleteTherapy = [verifyToken, deleteTherapy]

const detailTherapy = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const findTherapy = await Therapy.findOne({
        where: {
            id_therapy: id_therapy
        }
    })

    if (findTherapy) {
        res.status(200).json({
            success: true,
            message: 'Therapy found',
            dataTherapy: findTherapy
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy not found'
        })
    }
}
controllers.detailTherapy = [verifyToken, detailTherapy]

const like = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const findTherapy = await Therapy.findOne({
        where: {
            id_therapy: id_therapy
        }
    })
    if (findTherapy) {
        var like = findTherapy.like
        var intLike = parseInt(like)
        intLike = intLike + 1

        const updateTherapy = await Therapy.update({
            like: intLike
        }, {
            where: {
                id_therapy: id_therapy
            }
        })
        if (updateTherapy) {
            res.status(200).json({
                success: true,
                message: 'The therapy data was successfully liked'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Therapy data failed to like'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy not found'
        })
    }

}
controllers.like = [verifyToken, like]

const dislike = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const findTherapy = await Therapy.findOne({
        where: {
            id_therapy: id_therapy
        }
    })
    if (findTherapy) {
        var dislike = findTherapy.dislike
        var intDislike = parseInt(dislike)
        intDislike = intDislike + 1

        const updateTherapy = await Therapy.update({
            dislike: intDislike
        }, {
            where: {
                id_therapy: id_therapy
            }
        })
        if (updateTherapy) {
            res.status(200).json({
                success: true,
                message: 'The therapy data was successfully disliked'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Therapy data failed to dislike'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy not found'
        })
    }

}
controllers.dislike = [verifyToken, dislike]

const deleteOtomatic = async (req,res) => {
    const delTherapy = await Therapy.destroy({
        where:{
            dislike: {
                [Op.or]: {
                    [Op.eq]: 10,
                    [Op.gt]: 10
                }
            }
        }
    })
    if (delTherapy) {
        res.status(200).json({
            success: true,
            message: 'Therapy data has been successfully deleted'
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy data was not successfully deleted'
        })
    }
}
controllers.deleteOtomatic = [verifyToken, deleteOtomatic]

module.exports = controllers