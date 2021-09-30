import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import GridLayout, { Layout } from "react-grid-layout";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

import { PhotoImage } from "./photo";
import { Video } from "./video";
import { TextContainer } from "./text";
import { ActionProp } from "../model";

export type SlideNavigatorProp = {
  backgroundColor: string;
  layout: any;
  gridItems: any;
  onLayoutChange?(layout: GridLayout.Layout[]): void;
  handleClick: (index: number) => void;
  readonly:boolean,
  onDelete?:(index:number) => void
};

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    //position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 64,
  },
  subContent: {
    border: "1px solid black",
    backgroundColor: ({ backgroundColor }: any) => backgroundColor,
    color: "white",
    overflow: "hidden",
    display: "flex",
  },
}));

const SlideNavigation = ({
  backgroundColor,
  layout,
  gridItems,
  readonly,
  onLayoutChange,
  handleClick,
}: SlideNavigatorProp) => {
  const classes = useStyles({ backgroundColor });
  const renderItem = (type: ActionProp, content: string, index: number) => {
    switch (type) {
      case ActionProp.photo:
        return (
          <div style={{ width: "10vw", height: "10vh" }}>
            <PhotoImage imageSource={content} readonly={true} index={index} />
          </div>
        );
      case ActionProp.video:
        return (
          <div style={{ width: "10vw", height: "10vh" }}>
            <Video videoSource={content} readonly={false} index={index} />
          </div>
        );
      case ActionProp.text:
        return (
          <TextContainer readonly={false} index={index}>
            <div
              style={{
                color: "#000",
              }}
            >
              {content}
            </div>
          </TextContainer>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div>
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={100}
            width={240}
            preventCollision={false}
            isDraggable={true}
            isResizable={false}
            onLayoutChange={onLayoutChange}
          >
            {layout.map((item: any, i: number) => (
              <div
                key={item.i}
                className={classes.subContent}
                onClick={() => handleClick(i)}
              >
                <div>
                  {gridItems[i].map((item: any, i: number) => (
                    <div key={item.id}>
                      {renderItem(item.type, item.content, i)}
                    </div>
                  ))}
                </div>
                {/* {!readonly && <Fab color="primary" aria-label="delete">
                  <DeleteIcon />
                </Fab>} */}
              </div>
            ))}
          </GridLayout>
        </div>
      </Drawer>
    </div>
  );
};

export default SlideNavigation;
