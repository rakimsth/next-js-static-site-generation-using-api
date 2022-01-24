import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function TinyEditor({ data, onChange, id }) {
  const [initialValue, setInitialValue] = useState(
    data || "<p>Start Typing...</p>"
  );

  function updateValue(value) {
    onChange(value);
  }

  return (
    <>
      <Editor
        init={{
          selector: "#pageEditor",
          inline: true,
        }}
        id={id}
        apiKey="no-api-key"
        initialValue={initialValue}
        onEditorChange={(newText) => updateValue(newText)}
      />
    </>
  );
}
