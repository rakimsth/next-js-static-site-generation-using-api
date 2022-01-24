import { useState } from "react";
import axios from "axios";
import Editor from "../Editor";
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

export default function Body({ data }) {
  const [content, setContent] = useState(
    data && data.content ? data.content : ""
  );

  async function onChange(e) {
    if (e) {
      setContent(e);
    }
  }
  const handleSubmit = async () => {
    const id = data._id;
    const resp = await axios.post(
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
    if (resp) console.log("Page Updated Successfully");
  };

  return (
    <>
      <div className="container">
        <div className="text-center">
          <Editor
            data={content}
            id="pageEditor"
            onChange={(e) => onChange(e)}
          />
          <hr />
        </div>
        <button className="btn btn-danger" onClick={handleSubmit}>
          Update the content
        </button>
      </div>
    </>
  );
}
