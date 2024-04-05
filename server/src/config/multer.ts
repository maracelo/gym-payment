import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: 'public/media/images/temp',
  filename: (req, file, cb) =>{
    const tempName = Date.now() + Math.floor(Math.random() * 9999);
    cb(null, file.fieldname + '-' + tempName + '.jpg');
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) =>{
  const mimetypesAcceptable = ['image/jpg', 'image/jpeg', 'image/png'];

  if(mimetypesAcceptable.includes(file.mimetype)) cb(null, true);

  else cb(null, false);
}

export const upload = multer({storage, fileFilter});