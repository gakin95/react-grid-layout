import {Motion, spring} from 'react-motion';
import {useContextMenu }from './useContexMenu';

type ContextMenuProp = {
    children:React.ReactNode
  }

const ContextMenu = ({ children }:ContextMenuProp) => {
    const { xPos, yPos, showMenu } = useContextMenu();
    console.log('xPos........',xPos)
    return (
      <Motion
        defaultStyle={{ opacity: 0 }}
        style={{ opacity: !showMenu ? spring(0) : spring(1) }}
      >
        {(interpolatedStyle) => (
          <>
            {showMenu ? (
              <div
                className="menu-container"
                style={{
                  top: yPos,
                  left: xPos,
                  opacity: interpolatedStyle.opacity,
                }}
              >
                {children}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </Motion>
    );
  };

  export default ContextMenu