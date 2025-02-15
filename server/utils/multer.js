const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // Accept only image files
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject other file types
  }
};

// Export configured multer instance
const upload = multer({ storage, fileFilter });

// Middleware for compressing images
const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next(); // No file to compress, continue
  }

  try {
    // Compress the image using Sharp
    const compressedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 1024 }) 
      .toFormat("jpeg") 
      .jpeg({ quality: 80 }) 
      .toBuffer();

    req.file.buffer = compressedImageBuffer;

    console.log("Image processed😎");

    next(); 
  } catch (error) {
    next(error); 
  }
};

module.exports = { upload, compressImage };