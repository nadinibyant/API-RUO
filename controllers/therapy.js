const response = require('express')
const Therapy = require('../models/therapy')
const User = require('../models/users')
const controllers = {}
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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

//tampil seluruh data therapy orang
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

// tampil seluruh therapy sendiri
const myTherapy = async (req, res) => {
    const id_user = req.params.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
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
    } else {
        res.status(400).json({
            success: false,
            message: 'Session Expired'
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

const upload = multer({
    storage: storage,
});
const uploadd = upload.single('file')

//tambah data therapy
const addTherapy = async (req, res) => {
    const id_user = req.params.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
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
    } else {
        res.status(400).json({
            success: false,
            message: 'User not Found'
        })
    }
   
}
controllers.addTherapy = [verifyToken, uploadd, addTherapy]


//edit data therapy
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

//hapus data therapy
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

//tampil detail data therapy yg dipilih
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

//tambah like
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

//tambah dislike
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

//hapus therapy jika dislike > 10
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