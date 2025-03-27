import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  public async fileUpload(file: Express.Multer.File) {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: 'AWSbucketName',
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();
      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // extract file name
    let name = file.originalname.split('.')[0];

    // remove white spaces
    name.replace(/\s/g, '').trim();

    // extract file extension
    let extension = path.extname(file.originalname);

    // geneate time stamp
    let timeStamp = new Date().getTime().toString().trim();

    // return file uuid
    return `${name}-${timeStamp}-${uuid4()}${extension}`;
  }
}
