const multer = require('multer');   



const MIME_TYPES = { //dizionario che associa un type di file a un'estensione
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


const storage = multer.diskStorage({ //indica dove salvare i file
    destination: (req, file, callback) => { //indica la cartella di destinazione
        callback(null, 'images');
    },
    filename: (req, file, callback) => { //indica il nome del file
        const name = file.originalname.split(' ').join('_'); //rimuove gli spazi dal nome del file
        const extension = MIME_TYPES[file.mimetype]; //associa l'estensione al type del file
        callback(null, name + Date.now() + '.' + extension); //crea il nome del file
    }
});




module.exports = multer({ storage: storage });//esporta il middleware multer configurato per caricare un solo file chiamato image


