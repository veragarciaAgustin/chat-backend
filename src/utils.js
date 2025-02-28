import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName)

export default __dirname

import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const uploader = multer({storage});


