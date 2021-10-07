import React from "react";
import FileSaver from "file-saver";
import { stateToMarkdown } from "draft-js-export-markdown";

function FileSaverComponent(props) {
  const saveToContent = (event) => {
    event.preventDefault();
    const markdown = stateToMarkdown(props.editorState.getCurrentContent());
    let filename = document.getElementById("filename").value;
    let blob = new Blob([markdown], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, filename);
  };

  return (
    <div className="toolbar">
      <input type="text" id="filename" placeholder=" insert filename.txt" />

      <input type="button" value="SAVE" onMouseDown={saveToContent} />
    </div>
  );
}

export default FileSaverComponent;
