import { useState, useEffect, useRef } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Paper } from "@material-ui/core";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CallMadeIcon from "@material-ui/icons/CallMade";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PhotoIcon from "@material-ui/icons/Photo";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MenuItem from "@material-ui/core/MenuItem";
import GetAppIcon from "@material-ui/icons/GetApp";
import LinkIcon from "@material-ui/icons/Link";
import { RichTextEditorModel } from '@syncfusion/ej2-react-richtexteditor';
import Menu from "./menu/common";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import FormDialog from "./modal/form";
import VideoFormDialog from "./modal/form";
import { PhotoImage } from "./slideItems/photo";
import { Video } from "./slideItems/video";
import { TextContainer } from "./slideItems/text";
import { ActionProp } from "./model";
import SlideNavigation, { drawerWidth } from "./slideItems/slideNavigation";
import ContextMenu from './menu/contextMenu';
import RichTextEditor from './EditorComponents/MyEditor';

//import "./MyEditor.sass";

import InlineStylesButtons from "./EditorComponents/buttons/InlineStylesButtons";
import StyleBlockButtons from "./EditorComponents/buttons/StyleBlockButtons.jsx";

import MarkdownViewer from "./EditorComponents/MarkdownViewer.jsx";
import FileSaverComponent from './EditorComponents/FileSaverComponent.jsx'

export type ContainerProp = {
  backgroundColor: string;
  handleOpenBackgroundModal: () => void;
};

type LayoutProp = {
  lg: Layout[];
}[];

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
    //width: `calc(100% - ${drawerWidth}px)`,
    //marginLeft: drawerWidth,
    //marginBottom:200
  },
  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: drawerWidth,
  // },
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
    //overflow:"hidden"
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
  let rowHeight = 50;
  const [index, setIndex] = useState(0);
  const [videoUrlSource, SetVideoUrlSource] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const handleImgUrlChange = (value: string) => {
    console.log(value);
    setImgUrl(value);
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
    [{ i: "1", x: 0, y: 2, w: 12, h: 6 }],
  ];

  const [mainLayout, setMainLayout] = useState(initialLayouts);

  console.log('manlayout', mainLayout)

  const [gridItems, setGridItem] = useState([
    [
      {
        id: 1,
        type: ActionProp.text,
        content: "add text",
        showIcon: false
      },
    ],
  ]);

  const layOutChange = (layout: any) => {
    console.log("layout", layout);
    setLayout(layout);
  };

  const mainLayOutChange = (layouts: any) => {
    console.log("layouts", layouts);
    const mainSlideLayoutLists = [...mainLayout];
    mainSlideLayoutLists[index] = layouts;
    setMainLayout(mainSlideLayoutLists);
  };

  console.log("mainLayout", mainLayout[index]);

  const addNewItem = () => {
    const lists = [...layout];
    const length = lists.length + 1;
    const i = length.toString();
    console.log(length);
    setLayout((prev) => [...prev, { i: i, x: 0, y: length, w: 12, h: 2 }]);
    addNewSlide();
  };

  const addToCurrentGridItem = (type: ActionProp, content: string) => {
    const gridItemsLists = [...gridItems];
    const curSlideList = gridItemsLists[index];
    const newItemId = curSlideList.length + 1;
    const mainSlideLayoutLists = [...mainLayout];
    const defaultImageAndVideoLayout = {
      i: newItemId.toString(),
      x: 0,
      y: 0,
      w: 12,
      h: 2,
    };
    const defaultTextLayout = {
      i: newItemId.toString(),
      x: 0,
      y: 2,
      w: 12,
      h: 4,
    };
    const item =
      type === ActionProp.text ? defaultTextLayout : defaultImageAndVideoLayout;
    const curSlideLayout = mainSlideLayoutLists[index];
    curSlideLayout.push(item);
    console.log('curSlideLayout', curSlideLayout)
    curSlideList.push({
      id: newItemId,
      type: type,
      content: content,
      showIcon: false,
    });
    setMainLayout(mainSlideLayoutLists);
    setGridItem(gridItemsLists);
  };

  const addText = () => {
    addToCurrentGridItem(ActionProp.text, "");
  };

  const addNewSlide = () => {
    const gridItemsLists = [...gridItems];
    const mainSlideLayoutLists = [...mainLayout];
    const defaultLayout = [{ i: "1", x: 0, y: 2, w: 6, h: 4 }];
    gridItemsLists.push([
      {
        id: 1,
        type: ActionProp.text,
        content: "added new text",
        showIcon: false,
      },
    ]);
    mainSlideLayoutLists[index + 1] = defaultLayout;
    setGridItem(gridItemsLists);
    setMainLayout(mainSlideLayoutLists);
    setIndex((prev) => prev + 1);
  };

  console.log("gridItems", gridItems);
  console.log("index", index);

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
        addToCurrentGridItem(ActionProp.photo, base64String as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSubmit = () => {
    addToCurrentGridItem(ActionProp.video, videoUrlSource);
    handleVideoCloseFormDialog();
  };

  const hadleDeleteItem = (itemIndex: number) => {
    const gridItemsLists = [...gridItems];
    const curSlideList = gridItemsLists[index];
    const mainSlideLayoutLists = [...mainLayout];
    const curSlideLayoutLists = mainSlideLayoutLists[index];
    curSlideLayoutLists.splice(itemIndex, 1);
    curSlideList.splice(itemIndex, 1);
    setGridItem(gridItemsLists);
    setMainLayout(mainSlideLayoutLists);
  }

  

  const renderItem = (type: ActionProp, content: string, index: number) => {
    switch (type) {
      case ActionProp.photo:
        return <PhotoImage imageSource={content} readonly={false} index={index} onDelete={hadleDeleteItem} />;
      case ActionProp.video:
        return <Video videoSource={content} readonly={false} index={index} onDelete={hadleDeleteItem} />;
      case ActionProp.text:
        return (
          <TextContainer readonly={false} index={index} onDelete={hadleDeleteItem}>
             <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Click here to activate input"
        />
          </TextContainer>
        );
      default:
        return null;
    }
  };

  const handleSubItemClick = (value: number) => {
    setIndex(value);
  };

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
            <AddIcon onClick={addNewItem} />
            <CallMadeIcon />
            <TextFieldsIcon onClick={addText} />
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
            <InlineStylesButtons
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <StyleBlockButtons
          editorState={editorState}
          setEditorState={setEditorState}
        />
          </div>
          <div className={classes.preview}>
            <p>Preview</p>
            <VisibilityIcon />
          </div>
        </div>
      </AppBar>
      <div>
        <SlideNavigation
          backgroundColor={backgroundColor}
          layout={layout}
          gridItems={gridItems}
          onLayoutChange={layOutChange}
          handleClick={handleSubItemClick}
          readonly={false}
          editorState={editorState}
        />
      </div>
      <main className={classes.content} onClick={(e) => console.log('clicked', e.type)} onContextMenu={(e: any) => console.log('ghjhgh', e.type)}>
        <Paper className={classes.interacativeContent}>
          <SizeMe>
            {({ size }) => (
              <div>
                <GridLayout
                  className="layout"
                  layout={mainLayout[index]}
                  width={size.width ? size.width : 900}
                  rowHeight={rowHeight}
                  cols={12}
                  preventCollision={false}
                  isDraggable={false}
                  isResizable={true}
                  onLayoutChange={mainLayOutChange}
                >
                  {gridItems[index].map((item: any, i: number) => (
                    <div key={item.id} className={classes.interactiveItems}>
                      {renderItem(item.type, item.content, i)}
                      <p>{size.height}</p>
                    </div>
                  ))}
                </GridLayout>
              </div>
            )}
          </SizeMe>
        </Paper>
        {/* <ContextMenu>
          <HighlightOffIcon/>
          </ContextMenu> */}
      </main>
    </div>
  );
}
