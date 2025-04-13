import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import mime from 'mime-types';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function generateFileKey(originalName) {
  const ext = originalName.split('.').pop();
  const unique = crypto.randomBytes(16).toString('hex');
  return `uploads/${unique}.${ext}`;
}

export async function uploadToS3(fileBuffer, originalName, mimetype) {
  const key = generateFileKey(originalName);

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: mimetype,
  });

  await s3.send(command);

  return {
    file_url: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    file_path: key,
    file_type: mimetype,
  };
}
