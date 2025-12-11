import dotenv from "dotenv";
import express from "express";
import { sendResponse } from "./utils/sendResponse.js";

import timeSheetRouter from "./router/timeLogRouter.js";
import employeeRouter from "./router/employeeRouter.js";
import productRouter from "./router/productRouter.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/timeLogs", timeSheetRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/products", productRouter);

app.use(async (req, res) => {
  return await sendResponse(res, 404, { message: "API Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}/api`
  );
});
