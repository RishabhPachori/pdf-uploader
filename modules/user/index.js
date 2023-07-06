/**
 * @file index.js
 * @summary User routes
 * @description This file contains routes for user entity
 * */
const { uploadPdf, getPdf } = require('./controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = router => {

    router.post('/upload', upload.single('file'), uploadPdf);

    router.post('/pdf', getPdf);
};

