import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "./materialUiComponents";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MUIModal = ({
  open,
  onClose,
  selectedDate,
  modalHeader,
  fullWidth,
  onAddOrEdit,
  children,
  showActionBtn,
  actionName,
}) => {
  const classes = useStyles();

  const handleOnAddOrEdit = () => {
    onAddOrEdit();
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{modalHeader}</DialogTitle>
      {children}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {showActionBtn && (
          <Button onClick={handleOnAddOrEdit} color="primary">
            {actionName}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  // <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  //   aria-labelledby="transition-modal-title"
  //   aria-describedby="transition-modal-description"
  //   className={classes.modal}
  //   open={open}
  //   onClose={onClose}
  //   closeAfterTransition
  //   BackdropComponent={Backdrop}
  //   BackdropProps={{
  //     timeout: 500,
  //   }}
  //   maxWidth={"xl"}
  // >
  //   <div>{children}</div>
  // </Modal>
};

export default MUIModal;
