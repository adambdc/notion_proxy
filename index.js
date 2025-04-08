const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/blocks/:block_id/children", async (req, res) => {
  const notionToken = req.headers.authorization;
  const blockId = req.params.block_id;

  if (!notionToken) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  try {
    const notionRes = await axios.get(
      `https://api.notion.com/v1/blocks/${blockId}/children`,
      {
        headers: {
          Authorization: notionToken,
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
