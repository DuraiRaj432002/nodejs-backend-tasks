import { ObjectId } from "mongodb";
import { connectDB } from "../dbConn.js";
import { sendResponse } from "../utils/sendResponse.js";

export const createTimeLog = async (req, res) => {
  try {
    const db = await connectDB();
    const data = req.body;

    const requiredFields = [
      "name",
      "company",
      "projectId",
      "date",
      "punchIn",
      "punchOut",
      "duration",
    ];

    requiredFields.forEach((field) => {
      if (!data.hasOwnProperty(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    let insertedData = {
      name: data?.name,
      company: data?.company,
      projectId: data?.projectId,
      date: new Date(data?.date),
      punchIn: data?.punchIn,
      punchOut: data?.punchOut,
      duration: data?.duration,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await db.collection("timeLogs").insertOne(insertedData);

    return await sendResponse(res, 201, {
      message: "Record created successfully",
      id: response.insertedId,
    });
  } catch (err) {
    if (err?.message?.includes("Missing required field")) {
      return await sendResponse(res, 400, { error: err.message });
    }
    return await sendResponse(res, 500, { error: err.message });
  }
};

export const getTimeLogs = async (req, res) => {
  try {
    const db = await connectDB();
    const { name, company, fromDate, toDate } = req.query;
    const filter = {};

    if (name) filter.name = name;
    if (company) filter.company = company;
    if (fromDate && toDate) {
      filter.date = {};
      if (fromDate) filter.date.$gte = new Date(fromDate);
      if (toDate) filter.date.$lte = new Date(toDate);
    }

    const results = await db.collection("timeLogs").find(filter).toArray();
    return await sendResponse(res, 200, {
      message: "Data Fetched successfully",
      timeLogs: results,
    });
  } catch (err) {
    return await sendResponse(res, 500, { error: err.message });
  }
};

export const updateTimeLog = async (req, res) => {
  try {
    const db = await connectDB();
    const data = req.body;

    const requiredFields = ["id", "date", "punchIn", "punchOut", "duration"];

    requiredFields.forEach((field) => {
      if (!data.hasOwnProperty(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    const updateRecord = {
      date: data?.date,
      punchIn: data?.punchIn,
      punchOut: data?.punchOut,
      duration: data?.duration,
      updatedAt: new Date(),
    };

    const response = await db
      .collection("timeLogs")
      .updateOne({ _id: new ObjectId(data?.id) }, { $set: updateRecord });

    return await sendResponse(res, 201, {
      message: "TimeLog updated successfully",
      modifiedRecordCount: response.modifiedCount,
    });
  } catch (err) {
    if (err?.message?.includes("Missing required field")) {
      return await sendResponse(res, 400, { error: err.message });
    }
    return await sendResponse(res, 500, { error: err.message });
  }
};

export const deleteTimeLog = async (req, res) => {
  try {
    const db = await connectDB();

    const id = req?.query?.id;

    if (!id) {
      throw new Error("Missing required field: id");
    }

    const response = await db
      .collection("timeLogs")
      .deleteOne({ _id: new ObjectId(id) });

    return await sendResponse(res, 201, {
      message: "TimeLog deleted successfully",
      affectedRecords: response.deletedCount,
    });
  } catch (err) {
    if (err?.message?.includes("Missing required field")) {
      return await sendResponse(res, 400, { error: err.message });
    }
    return await sendResponse(res, 500, { error: err.message });
  }
};
