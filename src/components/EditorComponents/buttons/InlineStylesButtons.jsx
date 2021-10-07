import React from "react";
import { RichUtils } from "draft-js";
import classes from '../MyEditor.module.css'

import InlineStyles from "./InlineStyles";

function InlineStyleButtons(props) {
  const setInlineStyle = (event) => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("use-style");
    props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, style));
  };

  const renderInlineStyleButton = (value, style) => {
    const currentInlineStyle = props.editorState.getCurrentInlineStyle();
    let styleActive = "";
    if (currentInlineStyle.has(style)) {
      styleActive = "active";
    }
    return (
      <input
        type="button"
        key={style}
        value={value}
        use-style={style}
        onMouseDown={setInlineStyle}
        className={styleActive}
      />
    );
  };

  return (
    <div className={classes.toolbar}>
      {InlineStyles.map((button) => {
        return renderInlineStyleButton(button.value, button.style);
      })}
    </div>
  );
}

export default InlineStyleButtons;
