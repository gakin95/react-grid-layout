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
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { SizeMe } from 'react-sizeme'
import FormDialog from "./modal/form";
import VideoFormDialog from "./modal/form";
import { PhotoCanvas } from "./canvas/photo";
import { VideoCanvas } from "./canvas/video";


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
    height: "90vh",
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
  const [photoImageSource,setPhotoImageSource] = useState("");
  const [videoUrlSource,SetVideoUrlSource] = useState('');
  const [photoCanvasLayout, setPhotoCanvasLayout] = useState([
    defaultPhotoCanvasLayout,
  ]);

  const [videoCanvasLayout, setVideoCanvasLayout] = useState([
    defaultPhotoCanvasLayout,
  ]);

  const [showPhoto, setShowPhoto] = useState(false);
  const [showVideoCanvas, setShowVideoCanvas] = useState(false);
  const [imgUrl,setImgUrl] = useState('');
  const handleImgUrlChange = (value:string) => {
    console.log(value)
    setImgUrl(value)
  }

  const handleVideoUrlChange = (value:string) => {
    console.log(value)
    SetVideoUrlSource(value)
  }

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
  const initialLayouts = {
    lg: [
      { i: "1", x: 0, y: 0, w: 800, h: 1},
    { i: "2", x: 0, y: 1, w: 800, h: 5 },
    ]
  };

  const [mainLayout, setMainLayout] = useState(initialLayouts);

  const layOutChange = (layout: any) => {
    console.log("layout", layout);
    setLayout(layout);
  };

  const mainLayOutChange = (x:any,layout: any) => {
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
  const [openVideoFormDialog, setOpenVideoFormDialog] = useState(false);

  const handleOpenFormDialog = () => {
    setAnchorEl(null);
    setOpenFormDialog(true);
  };

  const handleVideoOpenFormDialog = () => {
    setOpenVideoFormDialog(true);
  };

  const handleVideoCloseFormDialog = () => {
    setOpenVideoFormDialog(false);
  };

  const handleUploadFromDevice = (e:any) => {
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
        setShowPhoto(true);
      };
      reader.readAsDataURL(image);
    } else {
      setPhotoImageSource("");
      setShowPhoto(false);
    }
  }, [image]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <FormDialog title="Upload photo" type="image" handleSubmit={() => console.log(imgUrl)} open={openFormDialog} handleChange={handleImgUrlChange} handleClose={handleCloseFormDialog}/>
      <VideoFormDialog title="Upload video" type="video" handleSubmit={() => {
        setShowVideoCanvas(true);
        handleVideoCloseFormDialog()
      }}  open={openVideoFormDialog} handleChange={handleVideoUrlChange} handleClose={handleVideoCloseFormDialog}/>
        <Menu anchorEl={anchorEl} handleClose={handleClose}>
          <MenuItem onClick={handleUploadFromDevice}>
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
            <VideoCallIcon onClick={handleVideoOpenFormDialog}/>
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
        <SizeMe>{({ size }) => <div>
        <ResponsiveGridLayout
            className="layout"
            layouts={mainLayout}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
           cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            width={size.width?size.width:900}
            rowHeight={100}
            preventCollision={false}
            isDraggable={true}
            isResizable={true}
            onLayoutChange={mainLayOutChange}
          >
            <div key='1' className={classes.interactiveItems}>
                {size.height}
              </div>
              <div key='2' className={classes.interactiveItems}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta repudiandae blanditiis aut voluptatem hic nostrum tempore consequuntur optio. Magnam repellat totam animi ullam odio similique ex tenetur corrupti incidunt quia.
              <div>
              <PhotoCanvas
              imageSource={photoImageSource}
              isReadOnly={false}
              canvasLayout={photoCanvasLayout}
              updateLayout={setPhotoCanvasLayout}
              showPhoto={showPhoto}
            />
              </div>
              <div>
              <VideoCanvas
              videoSource={videoUrlSource}
              isReadOnly={false}
              canvasLayout={videoCanvasLayout}
              updateLayout={setVideoCanvasLayout}
              showVideoCanvas={showVideoCanvas}
            />
              </div>
              </div>
          </ResponsiveGridLayout>
          </div>}</SizeMe>
        </Paper>
      </main>
    </div>
  );
}
