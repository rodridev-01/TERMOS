import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Detectar si es para marcas o categorías
    let folder = req.body.type; 

    if (!folder || !["marcas", "categorias", "productos"].includes(folder)) {
      folder = "otros"; 
    }

    const uploadDir = `public/uploads/${folder}`;

    // Crear carpeta si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
