import express, { Router } from "express";

import {
  listAllProducts,
  createProduct,
  deleteProduct,
  getProduct,
  editProduct,
} from "./controller/product.controller";

const router = Router();

/** GET: http://localhost:3030/products */
router.get("/products", listAllProducts);

/** POST: http://localhost:3030/product */
router.post("/product", createProduct);

/** GET: http://localhost:3030/product/:sku */
router.get("/product/:sku", getProduct);

/** DELETE: http://localhost:3030/product/:sku */
router.delete("/product/:sku", deleteProduct);

/** PUT: http://localhost:3030/product/:sku */
router.put("/product/:sku", editProduct);

export default router;
