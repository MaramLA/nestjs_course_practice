import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { Repository } from 'typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { FileTypes } from '../enums/file-types.enum';
import { UploadDocument } from '../upload.entity';
@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(UploadDocument)
    private readonly uploadsRepository: Repository<UploadDocument>,

    private readonly uploadToAwsProvider: UploadToAwsProvider,

    private readonly configService: ConfigService,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    // Throw an error for un supported file types
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('File type not supported');
    }

    try {
      // Upload the file (to AWS S3)
      const name = await this.uploadToAwsProvider.fileUpload(file);

      // Generate a new entery to in the database
      const uploadFile: UploadFile = {
        name: name,
        path: `https://'cloudFrontURL'/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const uploadEntery = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(uploadEntery);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
