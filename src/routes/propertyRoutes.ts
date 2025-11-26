import { Router } from "express";
import { propertyController } from "../controller/propertyController";
import { upload } from "../middleware/upload";

const router = Router();

/**
 * POST /properties
 * Envia JSON + arquivos juntos (multipart/form-data)
 *
 * Campos esperados:
 * - data: JSON (texto)
 * - image: arquivo único
 * - gallery[]: múltiplos arquivos
 */
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
  ]),
  propertyController.create
);

router.get("/", propertyController.getAll);
router.get("/:id", propertyController.getOne);
router.put("/:id", propertyController.update);
router.delete("/:id", propertyController.delete);

export default router;
