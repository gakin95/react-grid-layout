import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
type imageSourceProp = {
  imageSource?: string;
  index: number;
  readonly: boolean;
  onDelete?:(index:number) => void
};

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: ({ imageSource }: any) => `url(${imageSource})`,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "center",
    display: "flex",
    justifyContent: "flex-end",
  },
}));
export const PhotoImage = ({
  imageSource,
  index,
  readonly,
  onDelete
}: imageSourceProp) => {
  const classes = useStyles({ imageSource });
  const [showIcon, setShowIcon] = useState(false);
  const handleDisplayIcon = (e: any) => {
    if (e.type === "click") {
      setShowIcon(false);
    } else if (e.type === "contextmenu") {
      setShowIcon(true);
    }
  };
  const handeleDelete = () => {
     if (onDelete) onDelete(index)
  }
  return (
    <div
      className={classes.root}
      onClick={handleDisplayIcon}
      onContextMenu={handleDisplayIcon}
    >
      {showIcon && !readonly && <HighlightOffIcon onClick={handeleDelete} color="error" />}
    </div>
  );
};
