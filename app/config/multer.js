const multer = require("multer");
const path = require("path");

module.exports = function(app){   
    const storage = multer.diskStorage({
        destination: path.join(__dirname, "../public", "images"),
        filename:  (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
    
    app.use(multer({
        storage,
        dest: path.join(__dirname, '../public', 'images'),
        fileFilter: (req, file, cb) => {

            var filetypes = /jpeg|jpg|png|gif/;
            var mimetype = filetypes.test(file.mimetype);
            var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

            if (mimetype && extname) {
                return cb(null, true);
            }
            cb("Error: File upload only supports the following filetypes - " + filetypes);
        },
        limits: {fileSize: 1500000},
    }).single("fotoSubir") );// name del input tipo <<file>>
}