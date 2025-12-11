import express from "express";
import { getEmployee } from "../controller/employeeController.js";

const router = express.Router();

router.get("/getEmployee", getEmployee);

export default router;
