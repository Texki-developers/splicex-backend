import express, { Router } from "express";
import {
    deleteImageController,
  getImageController,
  saveImageController,
} from "../controllers/gallery.controller";
import { validateJwtToken } from "../middleware/jwtValidator";


const router: Router = express.Router();

router.post("/", validateJwtToken, saveImageController);
router.get("/", validateJwtToken, getImageController);
router.delete("/", validateJwtToken, deleteImageController);
export default router;
