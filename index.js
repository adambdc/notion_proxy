const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

const NOTION_TOKEN = process.env.NOTION_TOKEN; // ← secure token set in Render

app.use(express.json());



// added for databases
app.post("/query-database/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${id}/query`,
      req.body || {},
      {
        headers: {
          "Authorization": `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error?.response?.status || 500).json({
      error: "Database query failed",
      message: error?.message || "Unknown error",
      data: error?.response?.data || {},
    });
  }
});

// end add

app.get("/blocks/:block_id/children", async (req, res) => {
  const blockId = req.params.block_id;

  try {
    const notionRes = await axios.get(
      `https://api.notion.com/v1/blocks/${blockId}/children`,
      {
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28"
        }
      }
    );
    res.json(notionRes.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({
      error: "Notion API request failed",
      message: error.message,
      data: error.response?.data || null
    });
  }
});

app.get("/", (req, res) => {
  res.send("Notion Proxy is live.");
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
