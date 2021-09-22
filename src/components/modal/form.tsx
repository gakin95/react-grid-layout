import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from "@material-ui/core/Slide";
import Button  from "../button";

type FormDialogProp = {
    open: boolean,
    handleClose: () => void
    handleChange:(value:string) => void,
    handleSubmit:() => void,
    title:string,
    type:string
}

export default function FormDialog({open,title,type,handleChange,handleSubmit,handleClose}:FormDialogProp) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Slide in={open}>
        <div>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           <small>Only select {type} that you have confirmed that you have the license to use.</small>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Paste url of image"
            type="url"
            fullWidth
            onChange={(e) => handleChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button title='Cancel' onClick={handleClose}/>
        <Button title='Insert' disabled={false} onClick={handleSubmit}/>
        </DialogActions>
        </div>
        </Slide>
      </Dialog>
    </div>
  );
}
