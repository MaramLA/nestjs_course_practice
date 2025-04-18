import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { UploadsService } from './providers/uploads.service';
import { UploadDocument } from './upload.entity';
import { UploadsController } from './uploads.controller';
@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsProvider],
  imports: [TypeOrmModule.forFeature([UploadDocument])],
})
export class UploadsModule {}
