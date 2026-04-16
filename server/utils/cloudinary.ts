import { v2 as cloudinary } from 'cloudinary';

export const useCloudinary = () => {
  const config = useRuntimeConfig();
  
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
    secure: true
  });
  
  return cloudinary;
};

export const uploadToCloudinary = async (fileBuffer: Buffer | ArrayBuffer, folder: string, resourceType: 'auto' | 'image' | 'video' | 'raw' = 'auto') => {
  const cloudinary = useCloudinary();
  
  return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: `rhc/${folder}`,
        resource_type: resourceType
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    );
    
    const buffer = Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer);
    uploadStream.end(buffer);
  });
};
