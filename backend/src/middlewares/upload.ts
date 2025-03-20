import multer from "multer";
import { Request } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwk5dwmzd',
  api_key: process.env.CLOUDINARY_API_KEY || '193621486842958',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'v2uywOG9uh9sYCI-oTj6QDdghA0',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => ({
    folder: "uploads", // Cloudinary folder name
    format: "png", // Set format to PNG
    public_id: file.originalname.split(".")[0], // Use filename without extension
  }),
  

});



const fileFilter:any = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
