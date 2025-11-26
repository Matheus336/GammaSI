import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../config/r2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class UploadService {
  async uploadFile(file: Express.Multer.File, folder: string) {
    if (!file) throw new Error("Nenhum arquivo enviado.");

    const filename = `${folder}/${Date.now()}_${file.originalname.replace(
      /\s+/g,
      "-"
    )}`;

    // Upload para o R2
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // Gerar link assinado
    const signedUrl = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: filename,
      }),
      { expiresIn: 3600 } // 1 hora — pode alterar
    );

    return {
      filename,
      url: signedUrl,
    };
  }

  async uploadMultiple(files: Express.Multer.File[], folder: string) {
    return Promise.all(files.map((file) => this.uploadFile(file, folder)));
  }
}

export const uploadService = new UploadService();
