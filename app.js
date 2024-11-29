require("dotenv").config();
const API_URL = process.env.API_URL;
const express = require("express");
const { fetchData, evaluateChecklist } = require("./controllers/checklist");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const data = await fetchData();
    const results = evaluateChecklist(data);
    res.render("dashboard", { results });
  } catch (error) {
    res.status(500).send("Error processing checklist.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
