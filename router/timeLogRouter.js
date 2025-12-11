import express from "express";
import {
  createTimeLog,
  getTimeLogs,
  updateTimeLog,
  deleteTimeLog,
} from "../controller/timeLogController.js";

const router = express.Router();

router.post("/createTimeLog", createTimeLog);
router.get("/getTimeLogs", getTimeLogs);
router.put("/updateTimeLog", updateTimeLog);
router.delete("/deleteTimeLog", deleteTimeLog);

export default router;
