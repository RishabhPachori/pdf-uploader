const crypto = require('crypto');

const encryptFile = (pdfData, password) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);
    
    // Create a cipher using the encryption key and initialization vector
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    // Encrypt the file data
    let encryptedPdf = cipher.update(pdfData);
    encryptedPdf = Buffer.concat([ encryptedPdf, cipher.final() ]);
    return encryptedPdf;
};

module.exports = encryptFile;