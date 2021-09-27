import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Modal,Backdrop, Menu, Slide, Container} from '@material-ui/core';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Colors from "../colors";
import Button from "../button";
import { ChromePicker } from "react-color";

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
  colorsContainer: {
    width: "250px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  colors: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    //border: "1px solid grey",
    backgroundColor: ({ bgColor }: any) => bgColor,
    cursor: "pointer",
  },
  colorTypeContainer:{
    cursor:'pointer'
  },
  colorType:{
    borderBottom:`5px solid`
  }
}));

export type BackgroundModalProp = {
  open: boolean;
  backgroundColor: string;
  handleBackgroundChange: (color: string) => void;
  onClose: () => void;
};

type colorType = 'solid' | 'gradient'

export type BgColor = {
  bgColor: string;
  addBackgroundColor: () => void;
};

export const Color = ({ bgColor, addBackgroundColor }: BgColor) => {
  const classes = useStyles({ bgColor });
  return <div className={classes.colors} onClick={addBackgroundColor} />;
};
export default function BackgroundModal({
  open,
  backgroundColor,
  handleBackgroundChange,
  onClose,
}: BackgroundModalProp) {
  const classes = useStyles({ backgroundColor });
  const [colorType, setColorType] = useState<colorType>('solid')
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

  const showListsOfColors = () => {
    if (colorType === 'gradient') return <ChromePicker color={backgroundColor} onChange={(color:any,event:React.ChangeEvent<HTMLInputElement>) => handleBackgroundChange(color.hex)}/>;
    return Colors.map((item: string) => (
      <Color
        bgColor={item}
        key={item}
        addBackgroundColor={() =>
          handleBackgroundChange(item)
        }
      />
    ))
  }

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
                      <Grid container spacing={1}>
                         <Grid className={classes.colorTypeContainer} item xs={6} onClick={() => setColorType('solid')}>
                           <Container>
                           <h5 className={colorType === 'solid' ? classes.colorType : ''}>Solid</h5>
                           </Container>
                         </Grid>
                         <Grid className={classes.colorTypeContainer} item xs={6} onClick={() => setColorType('gradient')}>
                         <Container>
                           <h5 className={colorType === 'gradient' ? classes.colorType : ''}>Gradient</h5>
                           </Container>
                         </Grid>
                      </Grid>
                      <div className={classes.colorsContainer}>
                      {showListsOfColors()}
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
              <Button title="Done" onClick={handleClose} />
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
