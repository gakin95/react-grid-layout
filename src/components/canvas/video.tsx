import React, { useMemo, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import ReactPlayer from "react-player/lazy";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface IProps {
  isReadOnly: boolean;
  canvasLayout: Layout[];
  videoSource: string;
  showVideoCanvas: boolean;
  updateLayout: (layout: Layout[]) => void;
}

export function VideoCanvas({
  canvasLayout,
  updateLayout,
  videoSource,
  isReadOnly,
  showVideoCanvas,
}: IProps) {
  const makeLayoutStatic = (propsLayout: Layout[]): Layout[] => {
    return propsLayout.map<Layout>((x) => {
      return { ...x, static: true };
    });
  };

  const staticLayout = useMemo(
    () => makeLayoutStatic(canvasLayout),
    [canvasLayout]
  );

  const onLayoutChange = (layout: Layout[]) => {
    updateLayout(layout);
  };

  const onResize = (layout: Layout[]) => {
    updateLayout(layout);
  };

  const renderVideo = showVideoCanvas ? (
    <GridLayout
      className="layout"
      layout={isReadOnly ? staticLayout : canvasLayout}
      cols={12}
      rowHeight={30}
      width={1350}
      isBounded
      onLayoutChange={onLayoutChange}
      onResize={onResize}
    >
      <div
        key="a"
        style={{ backgroundColor: "gray", flex: 1, justifyContent: "center" }}
      >
        <ReactPlayer
          width="100%"
          style={{ padding: 10 }}
          height="100%"
          url={videoSource}
        />
      </div>
    </GridLayout>
  ) : null;

  return renderVideo;
}

export const Video = ({videoSource}:any) => {
  return <div
  style={{ backgroundColor: "gray", flex: 1, justifyContent: "center" }}
>
  <ReactPlayer
    width="100%"
    style={{ padding: 10 }}
    height="100%"
    url={videoSource}
  />
</div>
}
