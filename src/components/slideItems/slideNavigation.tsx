import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import GridLayout, { Layout } from "react-grid-layout";

import { PhotoImage } from './photo';
import { Video } from "./video";
import { TextContainer } from "./text";
import { ActionProp } from '../model';


export type SlideNavigatorProp = {
    backgroundColor: string;
    layout:any,
    gridItems:any,
    onLayoutChange?(layout: GridLayout.Layout[]): void,
    handleClick:(index:number) => void
  };

  export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop:64,
    },
    subContent: {
      border: "1px solid black",
      backgroundColor: ({ backgroundColor }: any) => backgroundColor,
      color: "white",
    },
  }));


const SlideNavigation = ({backgroundColor,layout,gridItems,onLayoutChange,handleClick}:SlideNavigatorProp) => {
    const classes = useStyles({backgroundColor});
    return (
        <div >
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
            isResizable={true}
            onLayoutChange={onLayoutChange}
          >
            {layout.map((item:any, i:number) => (
              <div key={item.i} className={classes.subContent} onClick={() => handleClick(i)}>
                {gridItems[i].map((item: any, i: number) => (
                  <div key={item.id}>
                    {item.type === ActionProp.photo ? (
                      <div style={{ width: "10vw", height: "10vh" }}>
                        <PhotoImage imageSource={item.content} />
                      </div>
                    ) : item.type === ActionProp.video ? (
                      <div style={{ width: "10vw", height: "10vh" }}>
                        <Video videoSource={item.content} />
                      </div>
                    ) : item.type === ActionProp.text ? (
                      <TextContainer>
                        <div
                          style={{
                            color: "#000",
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
        </div>
    )
}

export default SlideNavigation
