import { connectDB } from "../dbConn.js";
import { sendResponse } from "../utils/sendResponse.js";
import { flattenObject } from "../utils/flatten.js";

export const getProduct = async (req, res) => {
  try {
    const db = await connectDB();
    const { id, name } = req.query;
    const filter = {};

    if (id) filter.id = id;
    if (name) filter.name = name;

    const products = await db
      .collection("products")
      .find(filter, { projection: { _id: 0 } })
      .toArray();

    const flattened = products.map((product) => flattenObject(product));

    return await sendResponse(res, 200, {
      message: "Data Fetched successfully",
      products: flattened,
    });
  } catch (err) {
    return await sendResponse(res, 500, { error: err.message });
  }
};
