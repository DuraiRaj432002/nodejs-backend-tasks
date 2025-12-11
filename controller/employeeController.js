import { connectDB } from "../dbConn.js";
import { sendResponse } from "../utils/sendResponse.js";
import { flattenObject } from "../utils/flatten.js";

export const getEmployee = async (req, res) => {
  try {
    const db = await connectDB();
    const { id, name } = req.query;
    const filter = {};

    if (id) filter.id = id;
    if (name) filter.name = name;

    const employee = await db
      .collection("employees")
      .find(filter, { projection: { _id: 0 } })
      .toArray();

    const flattened = employee.map((emp) => flattenObject(emp));

    return await sendResponse(res, 200, {
      message: "Data Fetched successfully",
      employee: flattened,
    });
  } catch (err) {
    return await sendResponse(res, 500, { error: err.message });
  }
};
