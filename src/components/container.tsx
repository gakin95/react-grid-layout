import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Paper } from "@material-ui/core";
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
import MenuItem from "@material-ui/core/MenuItem";
import GetAppIcon from "@material-ui/icons/GetApp";
import LinkIcon from "@material-ui/icons/Link";
import Menu from "./menu/common";
import FormDialog from "./modal/form";
import { PhotoCanvas } from "./canvas/photo";

export type ContainerProp = {
  backgroundColor: string;
  handleOpenBackgroundModal: () => void;
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
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    width: "20%",
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

export default function PermanentDrawerLeft({
  backgroundColor,
  handleOpenBackgroundModal,
}: ContainerProp) {
  const classes = useStyles({ backgroundColor });
  let idCounter = 0;
  const defaultPhotoCanvasLayout = { i: "a", x: 0, y: 0, w: 4, h: 7 };
  const [photoImageSource,setPhotoImageSource] = useState(
    "https://webdevts.blob.core.windows.net/9dc0ac99-d919-4124-a6f7-1a703ed645b2/4bbd833a-0bb8-482f-b08a-a53f15a0dab6636935342121491070-4.jpg"
  );
  const [photoCanvasLayout, setPhotoCanvasLayout] = useState([
    defaultPhotoCanvasLayout,
  ]);

  const getId = () => {
    idCounter++;

    return idCounter.toString();
  };
  const fileInputRef = useRef<HTMLInputElement | any>(null);
  const [image, setImage] = useState(null);
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

  const photoLayoutChange = (layout: any) => {
    console.log("layout", layout);
    setPhotoCanvasLayout(layout);
  };


  const addNewItem = () => {
    const lists = [...layout];
    const length = lists.length + 1;
    const i = length.toString();
    console.log(length);
    setLayout((prev) => [...prev, { i: i, x: 0, y: length, w: 240, h: 2 }]);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 

  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleOpenFormDialog = () => {
    setAnchorEl(null);
    setOpenFormDialog(true);
  };

  const handleUploadFromDebice = (e:any) => {
    setAnchorEl(null);
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setPhotoImageSource(base64String as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPhotoImageSource("");
    }
  }, [image]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <FormDialog open={openFormDialog} handleClose={handleCloseFormDialog}/>
        <Menu anchorEl={anchorEl} handleClose={handleClose}>
          <MenuItem onClick={handleUploadFromDebice}>
            <GetAppIcon />
            <p>Upload from computer</p>
          </MenuItem>
          <MenuItem onClick={handleOpenFormDialog}>
            <LinkIcon />
            <p>By Url</p>
          </MenuItem>
        </Menu>
        <div className={classes.header}>
          <div className={classes.actionBtn}>
            <CallMadeIcon />
            <TextFieldsIcon />
            <PhotoIcon onClick={handleClick} />
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            <VideoCallIcon />
            <p onClick={handleOpenBackgroundModal}>Background</p>
          </div>
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
            onLayoutChange={(layout) => photoLayoutChange(layout)}
          >
            <div key='1' className={classes.interactiveItems}>
                ghjhj
              </div>
              <div key='2' className={classes.interactiveItems}>
              <div>
              <PhotoCanvas
              imageSource={photoImageSource}
              isReadOnly={false}
              canvasLayout={photoCanvasLayout}
              updateLayout={setPhotoCanvasLayout}
            />
              </div>
              </div>
          </GridLayout>
        </Paper>
      </main>
    </div>
  );
}
