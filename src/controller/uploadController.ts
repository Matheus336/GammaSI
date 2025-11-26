import { Request, Response } from "express";
import { uploadService } from "../services/uploadService";

export class UploadController {
  async uploadSingle(req: Request, res: Response) {
    try {
      const result = await uploadService.uploadFile(req.file!, "properties");
      res.json({ message: "Upload concluído!", ...result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async uploadMultiple(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0)
        return res.status(400).json({ error: "Nenhuma imagem recebida." });

      const result = await uploadService.uploadMultiple(
        files,
        "properties/gallery"
      );
      res.json({ message: "Upload múltiplo concluído!", files: result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const uploadController = new UploadController();
