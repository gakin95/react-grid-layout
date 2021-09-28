import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player/lazy";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

type videoSourceProp = {
  videoSource?: string;
  index: number;
  readonly: boolean;
  onDelete?: (index: number) => void;
};

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "gray",
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
   // justifyContent: "flex-end",
  },
}));

export const Video = ({
  videoSource,
  index,
  readonly,
  onDelete,
}: videoSourceProp) => {
  const classes = useStyles();
  const [showIcon, setShowIcon] = useState(false);
  const handleDisplayIcon = (e: any) => {
    if (e.type === "click") {
      setShowIcon(false);
    } else if (e.type === "contextmenu") {
      setShowIcon(true);
    }
  };
  const handeleDelete = () => {
    if (onDelete) onDelete(index);
  };
  return (
    <div
      className={classes.root}
      onClick={handleDisplayIcon}
      onContextMenu={handleDisplayIcon}
    >
      <ReactPlayer
        width="100%"
        style={{ padding: 10 }}
        height="100%"
        url={videoSource}
      />
      {showIcon && !readonly && (
        <HighlightOffIcon onClick={handeleDelete} color="error" />
      )}
    </div>
  );
};
