"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Header options
    [{ font: [] }], // Font styles
    [{ size: ["small", false, "large", "huge"] }], // Font size
    ["bold", "italic", "underline", "strike"], // Text formatting
    [{ list: "ordered" }, { list: "bullet" }], // Ordered & Unordered lists
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ align: [] }], // Text alignment
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
];

const TextEditor = ({ message, setMessage }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      // Quill editor initialized
    }
  }, []);

  return (
    <ReactQuill
      innerRef={quillRef}
      theme="snow"
      placeholder="Type your message here..."
      value={message}
      onChange={setMessage}
      modules={modules}
      formats={formats}
    />
  );
};

export default TextEditor;

// import { Editor } from "@tinymce/tinymce-react";

// const TextEditor = ({ message, setMessage }) => {
//   return (
//     <Editor
//       apiKey="ize97xdydr7ma54y0mijjpbro47ckar0kkdpwbbyxf812n4v"
//       value={message}
//       onEditorChange={(newContent) => setMessage(newContent)}
//       init={{
//         height: 400,
//         menubar: true,
//         directionality: "ltr",
//         plugins: [
//           "advlist autolink lists link image charmap preview anchor",
//           "searchreplace visualblocks code fullscreen",
//           "insertdatetime media table paste code help wordcount",
//         ],
//         toolbar:
//           "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | " +
//           "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
//           "blockquote code | link image media table | preview fullscreen help",
//         image_title: true,
//         automatic_uploads: false,
//         file_picker_types: "image",
//         image_advtab: true,
//       }}
//     />
//   );
// };

// export default TextEditor;
