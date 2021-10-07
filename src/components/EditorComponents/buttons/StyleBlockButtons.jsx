import React from "react";
import { RichUtils } from "draft-js";

import BlockTypes from "./BlockTypes";
import classes from '../MyEditor.module.css'

function StyleBlockButtons(props) {
  const setBlockType = (event) => {
    event.preventDefault();
    let type = event.currentTarget.getAttribute("use-type");
    props.setEditorState(RichUtils.toggleBlockType(props.editorState, type));
  };

  const renderBlockTypeButton = (value, block) => {
    const currentBlockType = RichUtils.getCurrentBlockType(props.editorState);
    let typeActive = "";
    if (currentBlockType === block) {
      typeActive = "active";
    }

    return (
      <input
        type="button"
        key={block}
        value={value}
        use-type={block}
        onMouseDown={setBlockType}
        className={typeActive}
      />
    );
  };
  return (
    <div className={classes.toolbar}>
      {BlockTypes.map((button) => {
        return renderBlockTypeButton(button.value, button.block);
      })}
    </div>
  );
}

export default StyleBlockButtons;
