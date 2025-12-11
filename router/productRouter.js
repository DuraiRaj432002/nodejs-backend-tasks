import express from "express";
import { getProduct } from "../controller/productController.js";

const router = express.Router();

router.get("/getProduct", getProduct);

export default router;
