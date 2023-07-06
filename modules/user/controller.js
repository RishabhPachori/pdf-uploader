/**
 * @file controller.js
 * @summary User controllers
 * @description This file contains controller definition for user entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
*/

const { users } = require('../../db/controllers');
const { constants } = require('../../config');
const crypto = require('crypto');
const generatePassword = require('../helpers/generatePassword');
const Recipe = require('muhammara').Recipe;
const { ensureDirSync, readFileSync } = require('fs-extra');
const { SUCCESS, ERROR } = constants;

/**
 * Controller to upload pdf and user meta data in db
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next next method
*/
const uploadPdf = async (req, res) => {
    try {
        const { path, originalname: filename } = req.file;
        const userObj = req.body;
        
        const isPdfFilePathExists = !!path;
        if (!isPdfFilePathExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ message: 'pdf file path not exists.' });
        }

        /** Create pdf file id which uniquely identify pdf */
        const fileId = crypto.randomUUID();
        ensureDirSync('encrypted');
        
        /** Load the pdf */
        const pdfDocument = new Recipe(path, `encrypted/${fileId}.pdf`);

        /** Generate random password for pdf */
        const pdfPassword = generatePassword();

        const pdfDataObject = {
            filename,
            fileId,
            password: pdfPassword
        };
        const user = await users.getUser({ email: userObj.email });
        const isUserExists = !!user;
        /** If user exists then get the existing user and store the pdf data in it */
        if (isUserExists) {
            await users.updateUserById(user._id, { pdfs: pdfDataObject });
            /** Save the encrypted PDF data to encrypted local folder */
            pdfDocument.encrypt({ userPassword: pdfPassword, userProtectionFlag: 4 }).endPDF();
            return res.status(SUCCESS.CODE).send({ data: pdfDataObject, message: 'Pdf uploaded successfully.' });
        } else {
            /** If the user not exists then create new user and store its pdf */
            const finalUserObject = { ...userObj, pdfs: [ pdfDataObject ] };
            await users.createUser(finalUserObject);
            /** Save the encrypted PDF data to encrypted local folder */
            pdfDocument.encrypt({ userPassword: pdfPassword, userProtectionFlag: 4 }).endPDF();
            return res.status(SUCCESS.CODE).send({ data: pdfDataObject, message: 'Pdf uploaded successfully.' });
        }
    } catch (error) {
        return res.status(ERROR.BAD_REQUEST.CODE).send({ message: error.message });
    }
};

/**
 * Controller to get the pdf
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
*/
const getPdf = async (req, res) => {
    try {
        const requestBody = req.body;
        const pdfFileId = requestBody.id;
        /** Ensure the pdf file exists or not */
        let pdfData;
        try {
            const pathOfPdfFile = `encrypted/${pdfFileId}.pdf`;
            pdfData = readFileSync(pathOfPdfFile);
        } catch (_error) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ message: `Pdf file not exists with this id: ${pdfFileId}` });
        }

        /** If exists then return in final response */
        return res.status(SUCCESS.CODE).send(pdfData);
    } catch (error) {
        return res.status(ERROR.BAD_REQUEST.CODE).send({ message: error.message });
    }
};

module.exports = {
    uploadPdf,
    getPdf
};