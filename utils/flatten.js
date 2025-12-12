export const flattenObject = (obj, parentKey = "", res = {}) => {
  for (const key in obj) {
    const sanitizedKey = key.replace(/\s+/g, "_");

    const fullKey = parentKey ? `${parentKey}_${sanitizedKey}` : sanitizedKey;

    if (Array.isArray(obj[key])) {
      if (key.toLowerCase() === "reviews") {
        res[`${fullKey}_count`] = obj[key].length;
      }

      obj[key].forEach((item, index) => {
        const arrayKey = `${fullKey}_${index + 1}`;

        if (typeof item === "object" && !Array.isArray(item)) {
          flattenObject(item, arrayKey, res); // flatten objects inside arrays
        } else {
          res[arrayKey] = item; // save primitive values
        }
      });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], fullKey, res); // flatten nested objects
    } else {
      res[fullKey] = obj[key]; // store primitive values
    }
  }
  return res;
};
