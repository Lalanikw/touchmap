// components/map/services/S3Service.ts
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');

class S3Service {
  private s3Client: any;

  constructor() {
    // Move S3Client initialization to the uploadFile method
    this.s3Client = null;
  }

  async uploadFile(filePath: string): Promise<string> {
    try {
      // Initialize the S3 client here instead of in constructor
      this.s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
      });

      const fileContent = fs.readFileSync(filePath);
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME || "touchmap",
        Key: "LawByState.xlsx",
        Body: fileContent,
        ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      };

      console.log('AWS Config:', {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID?.slice(0, 5) + '...',
        hasSecret: !!process.env.AWS_SECRET_ACCESS_KEY,
        bucket: params.Bucket
      });

      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);
      console.log("Successfully uploaded to S3");
      
      return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/LawByState.xlsx`;
    } catch (err) {
      console.error("Error uploading to S3:", err);
      throw err;
    }
  }
}

module.exports = new S3Service();