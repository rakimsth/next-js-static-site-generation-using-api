const { connectToDatabase } = require("../../lib/mongodb");
import axios from "axios";
axios.defaults.headers = {
  "Content-Type": "application/json",
  "Access-Control-Request-Headers": "*",
  "api-key": "ewAPnOVjegDeDJT75buYtiXCrGQJbyLcDhIhATkKTLm9KdlPqhAfCfl9gyxcOXZ5",
};
axios.defaults.baseURL =
  "https://data.mongodb-api.com/app/data-oyxty/endpoint/data/beta";
const dbConfig = {
  collection: "pages",
  database: "pages",
  dataSource: "Cluster0",
};

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPages(req, res);
    }

    case "POST": {
      return addPage(req, res);
    }

    case "PUT": {
      return updatePage(req, res);
    }

    case "DELETE": {
      return deletePage(req, res);
    }
  }
}

// Getting all pages.
async function getPages(req, res) {
  try {
    let data = await axios.post("/action/find", JSON.stringify(dbConfig));
    return res.json({
      message: data.data.documents,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Adding a new post
async function addPage(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection("pages").insertOne(JSON.parse(req.body));
    return res.json({
      message: "Page added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Updating a post
async function updatePage(req, res) {
  const { id, content } = req.body.data;
  try {
    let data = await axios.post(
      "/action/updateOne",
      JSON.stringify(
        Object.assign(dbConfig, {
          filter: { _id: { $oid: id } },
          update: {
            $set: { content },
          },
        })
      )
    );
    return res.json({
      message: "Page updated successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
