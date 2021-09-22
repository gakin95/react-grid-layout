import Menu from '@material-ui/core/Menu';

type MenuProps = {
  anchorEl?:null | Element | ((element: Element) => Element),
  handleClose:() => void,
  children: React.ReactNode
}

export default function SimpleMenu({anchorEl,handleClose,children}:MenuProps) {
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </div>
  );
}
