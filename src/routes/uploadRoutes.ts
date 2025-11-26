import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadController } from "../controller/uploadController";

const router = Router();

// 1 imagem principal (ex: capa)
router.post("/image", upload.single("image"), uploadController.uploadSingle);

// múltiplas imagens (galeria)
router.post(
  "/gallery",
  upload.array("images", 10),
  uploadController.uploadMultiple
);

export default router;
