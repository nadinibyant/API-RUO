const response = require('express')
const Therapy = require('../models/therapy')
const User = require('../models/users')
const controllers = {}
const jwt = require('jsonwebtoken')
const Like = require('../models/like')
const Dislike = require('../models/dislike')
const multer = require('multer')
const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const axios = require('axios')
const admin = require('firebase-admin')
const serviceAccount = require('../ruo-application-firebase-adminsdk-tq4bz-eff4976190.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})


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
        const alamat_lengkap = req.body.alamat_lengkap

        if (!foto_psikolog || !nama_psikolog || !lama_karir || !no_telp_psikolog || !medsos_psikolog || !spesialis_psikolog || !alamat_lengkap) {
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
                const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(alamat_lengkap)}`)

                if (response.data && response.data.length > 0) {
                    const addTherapy = await Therapy.create({
                        foto_psikolog: foto_psikolog.originalname,
                        nama_psikolog: nama_psikolog,
                        lama_karir: lama_karir,
                        no_telp_psikolog: no_telp_psikolog,
                        medsos_psikolog: medsos_psikolog,
                        spesialis_psikolog: spesialis_psikolog,
                        id_user: id_user,
                        alamat_lengkap: alamat_lengkap
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
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'Location not found'
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
        const alamat_lengkap = req.body.alamat_lengkap || findTherapy.alamat_lengkap

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
            spesialis_psikolog: spesialis_psikolog,
            alamat_lengkap: alamat_lengkap
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
    const id_user_like = req.params.id_user
    const findTherapy = await Therapy.findOne({
        where: {
            id_therapy: id_therapy
        }
    })
    if (findTherapy) {
        var id_user_therapy = findTherapy.id_user

        const findLike = await Like.findOne({
            where: {
                id_therapy: id_therapy,
                id_user: id_user_like
            }
        })
        if (findLike) {
            var likeTherapy = findTherapy.like
            var like = likeTherapy - 1
            const hapusLike = await Like.destroy({
                where: {
                    id_like: findLike.id_like
                }
            })
            if (hapusLike) {
                const updateLike = await Therapy.update({
                    like: like
                }, {
                    where: {
                        id_therapy: id_therapy
                    }
                })
                if (updateLike) {
                    res.status(200).json({
                        success: true,
                        message: 'Unlike success'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'unlike was not successful'
                    })
                }

            } else {
                res.status(400).json({
                    success: false,
                    message: 'unlike was not successful'
                })
            }
        } else {
            const addLike = await Like.create({
                id_therapy: id_therapy,
                id_user: id_user_like,
            })
            if (addLike) {
                var likeTherapy = findTherapy.like
                var like = likeTherapy + 1
                const updateLike = await Therapy.update({
                    like: like
                }, {
                    where: {
                        id_therapy: id_therapy
                    }
                })
                if (updateLike) {
                    res.status(200).json({
                        success: true,
                        message: 'The therapy data was successfully liked',
                        id_user_therapy: id_user_therapy
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
                    message: 'Therapy data failed to like'
                })
            }
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy not found'
        })
    }

}
controllers.like = [verifyToken, like]

const tampiLike = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const findLike = await Like.findAll({
        where: {
            id_therapy: id_therapy
        }
    })
    if (findLike) {
        res.status(200).json({
            success: true,
            message: 'Data like found',
            data: findLike,
            jumlahLike: findLike.length
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data like not found'
        })
    }
}
controllers.tampiLike = [verifyToken, tampiLike]

//tambah dislike
const dislike = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const id_user_dislike = req.params.id_user
    const findTherapy = await Therapy.findOne({
        where: {
            id_therapy: id_therapy
        }
    })
    if (findTherapy) {
        const findDislike = await Dislike.findOne({
            where: {
                id_therapy: id_therapy,
                id_user: id_user_dislike
            }
        })
        if (findDislike) {
            const hapusDislike = await Dislike.destroy({
                where: {
                    id_dislike: findDislike.id_dislike
                }
            })
            if (hapusDislike) {
                const dislikeTherapy = findTherapy.dislike
                const dislike = dislikeTherapy - 1
                const updateTherapy = await findTherapy.update({
                    dislike: dislike
                })
                if (updateTherapy) {
                    res.status(200).json({
                        success: true,
                        message: 'Dislike has been successfully cancelled',
                        id_user_therapy: findTherapy.id_user
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Dislike was not successfully canceled'
                    })
                }

            } else {
                res.status(400).json({
                    success: false,
                    message: 'Dislike was not successfully canceled'
                })
            }
        } else {
            const addDislike = await Dislike.create({
                id_therapy: id_therapy,
                id_user: id_user_dislike
            })
            if (addDislike) {
                const dislikeTherapy = findTherapy.dislike
                const dislike = dislikeTherapy + 1
                if (dislike > 10) {
                    const hapusTherapy = await Therapy.destroy({
                        where: {
                            id_therapy: id_therapy
                        }
                    })
                    if (hapusTherapy) {
                        const id_user_therapy = findTherapy.id_user
                        const findUser = await User.findOne({
                            where: {
                                id_user: id_user_therapy
                            }
                        })
                        if (findUser) {
                            const fcmToken = findUser.fcmToken
                            const messaging = admin.messaging()

                            const message = {
                                token: fcmToken,
                                notification: {
                                    title: 'Therapy Data Deleted!!!',
                                    body: 'therapy data was deleted because dislikes exceeded 10'
                                },
                            }

                            messaging.send(message)
                                .then(response => {
                                    console.log('Notifikasi terkirim:', response);
                                    res.status(200).json({
                                        success: true,
                                        message: 'therapy data was deleted because dislikes exceeded 10'
                                    })
                                })
                                .catch(error => {
                                    console.error('Gagal mengirim notifikasi:', error);
                                    res.status(400).json({
                                        success: false,
                                        message: 'gagal'
                                    })
                                });


                        } else {
                            res.status(400).json({
                                success: false,
                                message: 'user not found'
                            })
                        }

                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'failed to delete'
                        })
                    }
                } else {
                    const updateDislike = await Therapy.update({
                        dislike: dislike
                    }, {
                        where: {
                            id_therapy: id_therapy
                        }
                    })
                    if (updateDislike) {
                        res.status(200).json({
                            success: true,
                            message: 'Successfully added dislike',
                            id_user_therapy: findTherapy.id_user
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Failed to add dislike'
                        })
                    }
                }


            } else {
                res.status(400).json({
                    success: false,
                    message: 'Failed to add dislike'
                })
            }
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Therapy not found'
        })
    }

}
controllers.dislike = [verifyToken, dislike]

const tampilDislike = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const findDislike = await Dislike.findAll({
        where: {
            id_therapy: id_therapy
        }
    })
    if (findDislike) {
        res.status(200).json({
            success: true,
            message: 'Data dislike found',
            data: findDislike,
            jumlahDislike: findDislike.length
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data dislike not found'
        })
    }
}
controllers.tampilDislike = tampilDislike



const findLike = async (req, res) => {
    const id_user = req.params.id_user
    const id_therapy = req.params.id_therapy
    const findDataLike = await Like.findOne({
        where: {
            id_user: id_user,
            id_therapy: id_therapy
        }
    })
    if (findDataLike) {
        res.status(200).json({
            success: true,
            message: 'Like found'
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Like not found'
        })
    }
}
controllers.findLike = [verifyToken, findLike]

const findDislike = async (req, res) => {
    const id_user = req.params.id_user
    const id_therapy = req.params.id_therapy
    const findDislike = await Dislike.findOne({
        where: {
            id_user: id_user,
            id_therapy: id_therapy
        }
    })
    if (findDislike) {
        res.status(200).json({
            success: true,
            message: 'Dislike found'
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Dislike not found'
        })
    }
}
controllers.findDislike = [verifyToken, findDislike]

const geocode = async (req, res) => {
    const id_therapy = req.params.id_therapy
    const findTherapy = await Therapy.findOne({
        where: {
            id_therapy: id_therapy
        }
    })
    if (findTherapy) {
        const alamat_lengkap = findTherapy.alamat_lengkap
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(alamat_lengkap)}`)

        if (response.data && response.data.length > 0) {
            const location = {
                latitude: parseFloat(response.data[0].lat),
                longitude: parseFloat(response.data[0].lon),
            }
            res.status(200).json({
                success: true,
                message: 'location found',
                location: location,
                data: findTherapy
            })

        } else {
            res.status(404).json({
                error: 'Location not found'
            })
        }

    } else {
        res.status(400).json({
            success: false,
            message: 'Data Therapy not found'
        })
    }
}
controllers.geocode = [verifyToken, geocode]

module.exports = controllers