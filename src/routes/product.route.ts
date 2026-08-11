import express from "express";
const router = express.Router();
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller";


router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;