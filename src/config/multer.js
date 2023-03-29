import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "src/uploads/")
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
// Modelo de nome do arquivo -> 2343274657.jpg

const upload = multer({ storage });

export default upload;
