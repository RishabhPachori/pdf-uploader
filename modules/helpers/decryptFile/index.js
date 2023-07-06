const crypto = require('crypto');

const decryptFile = (encryptedPdf, pdfPassword) => {
    // Generate the same encryption key and initialization vector
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(pdfPassword, 'salt', 32);
    const iv = crypto.randomBytes(16); // Use the same initialization vector used during encryption
  
    // Create a decipher using the encryption key and initialization vector
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
  
    // Decrypt the encrypted PDF data
    let decryptedPdf = decipher.update(encryptedPdf);
    decryptedPdf = Buffer.concat([ decryptedPdf, decipher.final() ]);
  
    return decryptedPdf;
};

module.exports = decryptFile;
