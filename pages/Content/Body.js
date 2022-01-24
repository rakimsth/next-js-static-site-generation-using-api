import { useState } from "react";
import axios from "axios";
import Editor from "../Editor";

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
    const payload = { id: data._id, content };
    const resp = await axios.put("/api/pages", { data: payload });
    console.log(resp.data.message);
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
