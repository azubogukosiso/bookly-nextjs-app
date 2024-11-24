import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryUpload = async (image, folderName) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image,
            {
                overwrite: true,
                invalidate: true,
                resource_type: "auto",
                folder: folderName
            },
            (error, result) => {
                if (result) {
                    console.log("this is the result: ", result);
                    resolve(result.secure_url);
                } else {
                    console.log("this is the error: ", error);
                    reject(error);
                }
            }
        );
    });
};