import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Menu from "@material-ui/core/Menu";
import Colors from '../colors'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    maxWidth: 500,
    minWidth: 350,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  modalContent: {
    textAlign: "center",
  },
  content: {
    font: "normal normal normal 16px/19px Work Sans",
    "& div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  items: {
    border: "1px solid grey",
    borderRadius: 7,
    padding: 7,
    cursor: "pointer",
  },
  bgColor: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: ({ backgroundColor }: any) => backgroundColor,
    border: "1px solid grey",
  },
  colorsContainer:{
    width:'250px',
    padding:'10px',
    display:'flex',
    alignItems:'center',
    flexWrap:'wrap'
  },
  colors:{
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1px solid grey",
    backgroundColor: ({ bgColor }: any) => bgColor,
    cursor:'pointer'
  },
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
}));

export type BackgroundModalProp = {
  open: boolean;
  backgroundColor: string;
  handleBackgroundChange:(color:string) => void,
  onClose: () => void;
};

export type BgColor = {
  bgColor: string;
  addBackgroundColor: () => void;
};

export const Color = ({bgColor,addBackgroundColor}:BgColor) => {
  const classes = useStyles({ bgColor });
  return <div className={classes.colors} onClick={addBackgroundColor}/>
}
export default function BackgroundModal({
  open,
  backgroundColor,
  handleBackgroundChange,
  onClose,
}: BackgroundModalProp) {
  const classes = useStyles({ backgroundColor });
  const handleClose = () => {
    console.log("got here");
    onClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosed = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open}>
          <div className={classes.paper}>
            <div className={classes.center}></div>
            <div className={clsx(classes.modalContent)}>
              <h3 id="transition-modal-title">
                <b>background</b>
              </h3>
              <div
                id="transition-modal-description"
                className={classes.content}
              >
                <div>
                  <p>Color</p>
                  <div>
                    <div className={classes.items} onClick={handleClick}>
                      <div className={classes.bgColor} />
                      <ArrowDropDownIcon />
                    </div>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClosed}
                    >
                      <div className={classes.colorsContainer}>
                        {Colors.map(item => <Color bgColor={item} key={item} addBackgroundColor={() => handleBackgroundChange(item)}/>)}
                      </div>
                    </Menu>
                  </div>
                </div>
                <div>
                  <p>Image</p>
                  <div className={classes.items}>
                    <b>Choose image</b>
                  </div>
                </div>
                <div>
                  <p>Reset to theme</p>
                  <div className={classes.items}>
                    <b>Reset</b>
                  </div>
                </div>
              </div>
              <Button className={classes.button} onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
