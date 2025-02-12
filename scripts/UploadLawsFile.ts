// scripts/uploadLawsFile.ts
const s3Service = require('../components/map/services/S3Service');
const path = require('path');
require('dotenv').config();

async function main() {
  try {
    const filePath = path.join(process.cwd(), 'scripts', 'LawByState.xlsx');
    console.log('Uploading file from:', filePath);
    
    const fileUrl = await s3Service.uploadFile(filePath);
    console.log('File uploaded successfully. URL:', fileUrl);
  } catch (error) {
    console.error('Error uploading file:', error);
    process.exit(1);
  }
}

main();

console.log('AWS Credentials:', {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID?.slice(0, 5) + '...', // Only log first 5 chars for security
  hasSecret: !!process.env.AWS_SECRET_ACCESS_KEY
});