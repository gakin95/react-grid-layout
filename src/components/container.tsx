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
import { SizeMe } from "react-sizeme";
import FormDialog from "./modal/form";
import VideoFormDialog from "./modal/form";
import { PhotoImage } from "./canvasItems/photo";
import { Video } from "./canvasItems/video";
import { TextContainer } from "./canvasItems/text";

export type ContainerProp = {
  backgroundColor: string;
  handleOpenBackgroundModal: () => void;
};

type LayoutProp = {
  lg: Layout[];
}[]

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
  const [index, setIndex] = useState(0);
  const [videoUrlSource, SetVideoUrlSource] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const handleImgUrlChange = (value: string) => {
    console.log(value);
    setImgUrl(value);
  };

  const handleVideoUrlChange = (value: string) => {
    console.log(value);
    SetVideoUrlSource(value);
  };


  const getId = () => {
    idCounter++;

    return idCounter.toString();
  };
  
  const fileInputRef = useRef<HTMLInputElement | any>(null);
  const [layout, setLayout] = useState([
    { i: getId(), x: 0, y: 0, w: 240, h: 2 },
  ]);
  const initialLayouts = [
    {
      lg: [
        { i: "1", x: 0, y: 2, w: 6, h: 4 },
      ],
    },
    
  ];

  const [mainLayout, setMainLayout] = useState(initialLayouts);

  const [gridItems,setGridItem] = useState([
    [
      {
        id: 1,
        type: "text",
        content: "text content",
      },
    ],
  ]);

  const layOutChange = (layout: any) => {
    console.log("layout", layout);
    setLayout(layout);
  };

  const mainLayOutChange = (currentLayout: any, layouts: any) => {
    console.log("layouts", layouts);
    console.log("currentLayout", currentLayout);
    setMainLayout((prev) => [...prev, layouts]);
  };

  console.log("mainLayout", mainLayout);


  const addNewItem = () => {
    const lists = [...layout];
    const length = lists.length + 1;
    const i = length.toString();
    console.log(length);
    setLayout((prev) => [...prev, { i: i, x: 0, y: length, w: 240, h: 2 }]);
  };

  const addToCurrentGridItem = (type:string,content:string) => {
    const gridItemsLists = [...gridItems];
   const curSlideList = gridItemsLists[index];
   const newItemId = curSlideList.length + 1;
   const mainSlideLayoutLists = [...mainLayout];
   const defaultImageAndVideoLayout = { i: newItemId.toString(), x: 0, y: 0, w: 3, h: 2 };
  const defaultTextLayout = { i: newItemId.toString(), x: 0, y: 2, w: 6, h: 4 };
  const item = type === 'text'? defaultTextLayout : defaultImageAndVideoLayout;
   const curSlideLayout = mainSlideLayoutLists[index]['lg'];
   curSlideLayout.push(item)
  setMainLayout(mainSlideLayoutLists);
   curSlideList.push({
    id: newItemId,
    type: type,
    content: content,
  });
   setGridItem(gridItemsLists)
  };


  const addText = () => {
    //addToCurrentSlideLayout('text');
    addToCurrentGridItem('text','')
  };

  console.log('gridItems',gridItems)

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

  const handleUploadFromDevice = (e: any) => {
    setAnchorEl(null);
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        addToCurrentGridItem('photo',base64String as string)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSubmit = () => {
    addToCurrentGridItem('video',videoUrlSource);
    handleVideoCloseFormDialog();
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <FormDialog
          title="Upload photo"
          type="image"
          handleSubmit={() => console.log(imgUrl)}
          open={openFormDialog}
          handleChange={handleImgUrlChange}
          handleClose={handleCloseFormDialog}
        />
        <VideoFormDialog
          title="Upload video"
          type="video"
          handleSubmit={() => {
            handleVideoSubmit();
          }}
          open={openVideoFormDialog}
          handleChange={handleVideoUrlChange}
          handleClose={handleVideoCloseFormDialog}
        />
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
            <TextFieldsIcon onClick={addText}/>
            <PhotoIcon onClick={handleClick} />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
            <VideoCallIcon onClick={handleVideoOpenFormDialog} />
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
                {gridItems[index].map((item: any, i: number) => (
                  <div key={item.id}>
                    {item.type === "photo" ? (
                      <div style={{ width: "10vw", height: "10vh" }}>
                        <PhotoImage imageSource={item.content} />
                      </div>
                    ) : item.type === "video" ? (
                      <div style={{ width: "10vw", height: "10vh" }}>
                        <Video videoSource={item.content} />
                      </div>
                    ) : item.type === "text" ? (
                      <TextContainer>
                        <div
                        style={{
                          color:'#000'
                        }}
                      >
                        {item.content}
                      </div>
                      </TextContainer>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </GridLayout>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Paper className={classes.interacativeContent}>
          <SizeMe>
            {({ size }) => (
              <div>
                <ResponsiveGridLayout
                  className="layout"
                  layouts={mainLayout[index]}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                  width={size.width ? size.width : 900}
                  rowHeight={100}
                  preventCollision={false}
                  isDraggable={true}
                  isResizable={true}
                  onLayoutChange={mainLayOutChange}
                >
                  {gridItems[index].map((item: any, i: number) => (
                    <div key={item.id} className={classes.interactiveItems}>
                      {item.type === "photo" ? (
                        <PhotoImage imageSource={item.content} />
                      ) : item.type === "video" ? (
                        <Video videoSource={item.content} />
                      ) : (
                        <TextContainer>
                          <div>{item.content}</div>
                        </TextContainer>
                      )}
                    </div>
                  ))}
                </ResponsiveGridLayout>
              </div>
            )}
          </SizeMe>
        </Paper>
      </main>
    </div>
  );
}
