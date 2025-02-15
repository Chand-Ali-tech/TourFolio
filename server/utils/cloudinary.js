require("dotenv").config();
const cloudinary = require("cloudinary").v2;


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadOnCloudinary = (fileBuffer, fileName) => {
  if (!fileBuffer) {
    throw new Error("No file provided for upload.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "TourFolio",
        public_id: fileName,
        resource_type: "image",
        type: "upload"
      },
      (error, result) => {
        if (error) {
          reject(new Error("Cloudinary upload failed."));
        } else {
          resolve(result.secure_url); // Resolve with the Cloudinary URL
        }
      }
    );

    uploadStream.end(fileBuffer); // Pass the file buffer to the stream
  });
};