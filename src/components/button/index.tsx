import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type BtnProps = {
  onClick: () => void;
  title: string;
  disabled?:boolean
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#fff",
    backgroundColor: "#D0021B",
    width: 46,
    height: 46,
    marginTop: 20,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#D0021B",
    },
  },
  disabled: {
    color: "#fff",
    backgroundColor: "grey",
    width: 46,
    height: 46,
    marginTop: 20,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#D0021B",
    },
  },
}));

const ButtonComponent = ({ title, disabled, onClick }: BtnProps) => {
  const classes = useStyles();
  return (
    <Button disabled={disabled} className={disabled? classes.disabled: classes.button} onClick={onClick}>
      {title}
    </Button>
  );
};

export default ButtonComponent;
