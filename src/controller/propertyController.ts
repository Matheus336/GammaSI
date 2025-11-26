import { Request, Response } from "express";
import { propertyService } from "../services/propertyService";
import { uploadService } from "../services/uploadService";

export class PropertyController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body.data) {
        return res.status(400).json({ error: "O campo 'data' é obrigatório." });
      }

      // Body vem como texto no multipart => precisa converter
      const data = JSON.parse(req.body.data);

      // Se houver imagem principal -> faz upload
      if (req.files && "image" in req.files) {
        const imageFile = (req.files as any)["image"][0];
        const uploaded = await uploadService.uploadFile(
          imageFile,
          "properties"
        );
        data.image = uploaded.url;
      }

      // Se houver galeria -> faz upload de todas
      if (req.files && "gallery" in req.files) {
        const galleryFiles = (req.files as any)["gallery"];
        const uploadedGallery = await uploadService.uploadMultiple(
          galleryFiles,
          "properties/gallery"
        );
        data.gallery = uploadedGallery.map((file) => file.url);
      }

      const result = await propertyService.createProperty(data);

      res.status(201).json({
        message: "Imóvel cadastrado com sucesso!",
        property: result,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const result = await propertyService.getProperties();
    res.json(result);
  }

  async getOne(req: Request, res: Response) {
    const result = await propertyService.getPropertyById(req.params.id);

    if (!result)
      return res.status(404).json({ error: "Imóvel não encontrado." });

    res.json(result);
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await propertyService.updateProperty(
        req.params.id,
        req.body
      );
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    await propertyService.deleteProperty(req.params.id);
    res.json({ message: "Imóvel removido com sucesso." });
  }
}

export const propertyController = new PropertyController();
