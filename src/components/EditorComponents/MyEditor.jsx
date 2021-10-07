import React from "react";

import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
//import "./MyEditor.sass";

import InlineStylesButtons from "./buttons/InlineStylesButtons.jsx";
import StyleBlockButtons from "./buttons/StyleBlockButtons.jsx";

import MarkdownViewer from "./MarkdownViewer.jsx";
import FileSaverComponent from './FileSaverComponent.jsx'

function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="editor-general-appearance">
      <div>
        <InlineStylesButtons
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <StyleBlockButtons
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </div>
      <div className="draft-editor-wrapper">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Click here to activate input"
        />
      </div>

      <div>
        <MarkdownViewer editorState={editorState} />
        <FileSaverComponent editorState={editorState}/>
      </div>
    </div>
  );
}

export default MyEditor;
