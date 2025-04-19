import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { config } from '../config/env.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import mime from 'mime-types';

const s3 = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
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
    Bucket: config.aws.bucket,
    Key: key,
    Body: fileBuffer,
    ContentType: mimetype,
  });

  await s3.send(command);

  return {
    file_url: `https://${config.aws.bucket}.s3.${config.aws.region}.amazonaws.com/${key}`,
    file_path: key,
    file_type: mimetype,
  };
}

export async function deleteFromS3(filePath) {
  const command = new DeleteObjectCommand({
    Bucket: config.aws.bucket,
    Key: filePath,
  });

  try {
    await s3.send(command);
    console.log(`S3 file deleted: ${filePath}`);
  } catch (err) {
    console.error(`Failed to delete file from S3: ${filePath}`, err);
    throw err;
  }
}
