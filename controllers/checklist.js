const axios = require("axios");
const rules = require("../config/rules");

const fetchData = async () => {
  try {
    const { data } = await axios.get(process.env.API_URL);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data.");
  }
};

const evaluateChecklist = (data) => {
  return rules.map((rule) => ({
    name: rule.name,
    status: rule.condition(data) ? "Passed" : "Failed",
  }));
};

module.exports = {
  fetchData,
  evaluateChecklist,
};
