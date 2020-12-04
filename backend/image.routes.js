// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose')
// const uuidv4 = require('uuid/v4');
// const router = express.Router();

// const DIR = './public/';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// // User model
// let Image = require('./image');

// router.post('/customOrder', upload.single('profileImg'), (req, res, next) => {
//     const url = req.protocol + '://' + req.get('host')
//     const image = new Image({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         profileImg: url + '/public/' + req.file.filename
//     });
//     image.save().then(result => {
//         res.status(201).json({
//             message: "Image uploaded successfully!",
//             imageCreated: {
//                 _id: result._id,
//                 profileImg: result.profileImg
//             }
//         })
//     }).catch(err => {
//         console.log(err),
//             res.status(500).json({
//                 error: err
//             });
//     })
// })

// router.get("/", (req, res, next) => {
//     Image.find().then(data => {
//         res.status(200).json({
//             message: "Image list retrieved successfully!",
//             images: data
//         });
//     });
// });

// module.exports = router;