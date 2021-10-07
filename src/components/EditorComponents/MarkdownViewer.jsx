import React from "react";
import { stateToMarkdown } from "draft-js-export-markdown";
import classes from './MyEditor.module.css'

function MarkdownViewer(props) {
  const markdownViewer = () => {
    const markdown = stateToMarkdown(props.editorState.getCurrentContent());
    return <textarea readOnly value={markdown} />;
  };

  return <div className={classes.markdownViewer}>{markdownViewer()}</div>;
}

export default MarkdownViewer;