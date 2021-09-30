import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
type textBoxProp = {
  children: React.ReactNode;
  index: number;
  readonly: boolean;
  onDelete?: (index: number) => void;
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width:'100%',
    height:'100%'
  },
}));

export const TextContainer = ({
  children,
  index,
  readonly,
  onDelete,
}: textBoxProp) => {
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
      <div>{children}</div>
      {showIcon && !readonly && (
        <HighlightOffIcon onClick={handeleDelete} color="error" />
      )}
    </div>
  );
};
