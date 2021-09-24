import React, { useMemo } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface IProps {
  isReadOnly: boolean;
  canvasLayout: Layout[];
  imageSource: string;
  updateLayout: (layout: Layout[]) => void;
  showPhoto: boolean;
}

export function PhotoCanvas({
  canvasLayout,
  updateLayout,
  imageSource,
  isReadOnly,
  showPhoto,
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

  const renderItem = showPhoto ? (
    <GridLayout
      className="layout"
      layout={isReadOnly ? staticLayout : canvasLayout}
      cols={12}
      rowHeight={50}
      width={1350}
      isBounded
      onLayoutChange={onLayoutChange}
      onResize={onResize}
    >
      <div key="a" style={{ backgroundColor: "gray" }}>
        <img alt="test img 1" src={imageSource} width="100%" height="100%" />
      </div>
    </GridLayout>
  ) : null;

  return renderItem;
};

export const PhotoImage = ({imageSource}:any) => {
  return <img alt="test img 1" src={imageSource} width="100%" height="100%" />
}
