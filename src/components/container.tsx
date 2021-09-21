import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import PrintIcon from "@material-ui/icons/Print";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import CallMadeIcon from "@material-ui/icons/CallMade";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PhotoIcon from "@material-ui/icons/Photo";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import VisibilityIcon from "@material-ui/icons/Visibility";

export type ContainerProp = {
  backgroundColor: string;
  handleOpenBackgroundModal:() => void
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#fff",
      color: "black",
    },
    "& .MuiPaper-elevation4": {
      boxShadow: "none",
    },
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  leftIcons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 3),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 3),
    cursor:'pointer'
  },
  preview: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& p": {
      marginRight: "10px",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3, 10),
    marginTop: "50px",
  },
  subContent: {
    border: "1px solid black",
    backgroundColor: ({ backgroundColor }: any) => backgroundColor,
    color: "white",
  },
  interacativeContent: {
    border: "1px solid",
    backgroundColor: ({ backgroundColor }: any) => backgroundColor,
    padding: theme.spacing(3, 10),
    height: "80vh",
  },
  interactiveItems: {
    border: "1px solid grey",
  },
}));

export default function PermanentDrawerLeft({ backgroundColor, handleOpenBackgroundModal }: ContainerProp) {
  console.log("backgroundColor", backgroundColor);
  const classes = useStyles({ backgroundColor });
  let idCounter = 0;

  const getId = () => {
    idCounter++;

    return idCounter.toString();
  };
  const [layout, setLayout] = useState([
    { i: getId(), x: 0, y: 0, w: 240, h: 2 },
    { i: getId(), x: 0, y: 1, w: 240, h: 2 },
    { i: getId(), x: 0, y: 2, w: 240, h: 2 },
  ]);

  const [mainLayout, setMainLayout] = useState([
    { i: "1", x: 0, y: 0, w: 800, h: 3 },
    { i: "2", x: 0, y: 1, w: 800, h: 20 },
  ]);

  const layOutChange = (layout: any) => {
    console.log("layout", layout);
    setLayout(layout);
  };

  const mainLayOutChange = (layout: any) => {
    console.log("layout", layout);
    setMainLayout(layout);
  };

  const addNewItem = () => {
    const lists = [...layout];
    const length = lists.length + 1;
    const i = length.toString();
    console.log(length);
    setLayout((prev) => [...prev, { i: i, x: 0, y: length, w: 240, h: 2 }]);
  };

  // const addNewItem = () => {
  //     const newItem = { x: 0, y: 0, w: 240, h: 2, i: uuidv4() };

  //     if (layout.some(item => item.x === 0 && item.y === 0)) {
  //         setLayout(layout
  //             .map(item => {
  //               if (item.x === 0) {
  //                 return { y: item.y++, ...item };
  //               }

  //               return item;
  //             })
  //             .concat([newItem]));
  //     } else {
  //       setLayout(prev => ([
  //           ...prev,
  //           newItem
  //       ]));
  //     }
  //   };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <div className={classes.header}>
          <CallMadeIcon />
          <TextFieldsIcon />
          <PhotoIcon />
          <VideoCallIcon />
          <p onClick={handleOpenBackgroundModal}>Background</p>
          <div className={classes.preview}>
            <p>Preview</p>
            <VisibilityIcon />
          </div>
        </div>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {/* <div className={classes.toolbar} /> */}
        <div className={classes.leftIcons}>
          <AddIcon onClick={addNewItem} />
          <ArrowDropDownIcon />
          <UndoIcon />
          <RedoIcon />
          <PrintIcon />
          <FormatPaintIcon />
          <ZoomInIcon />
        </div>
        <Divider />
        <div>
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={100}
            width={240}
            preventCollision={false}
            isDraggable={true}
            isResizable={true}
            onLayoutChange={(layout) => layOutChange(layout)}
          >
            {layout.map((item, i) => (
              <div key={item.i} className={classes.subContent}>
                {item.i}
              </div>
            ))}
          </GridLayout>
        </div>
      </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        <Paper className={classes.interacativeContent}>
          <GridLayout
            className="layout"
            layout={mainLayout}
            cols={12}
            rowHeight={15}
            width={900}
            preventCollision={false}
            isDraggable={true}
            isResizable={true}
            onLayoutChange={(layout) => mainLayOutChange(layout)}
          >
            {mainLayout.map((item, i) => (
              <div key={item.i} className={classes.interactiveItems}>
                {item.i}
              </div>
            ))}
          </GridLayout>
        </Paper>
      </main>
    </div>
  );
}
