import AWSXRay from 'aws-xray-sdk';
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
    region: process.env['AWS_REGION'],
    credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
    }
});

const s3Storage = multerS3({
    s3: s3,
    bucket: process.env['AWS_BUCKET_NAME'],
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});

const uploadImage = multer({ 
    storage: s3Storage,
    limits: { 
        fileSize: 1024 * 1024 * 2 
    }, 
 });

export default uploadImage;