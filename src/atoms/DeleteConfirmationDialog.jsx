import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
    yesBtn: {
        color: "#3B9979",
    },

    noBtn: {
        color: "#3B9979",
    },
}));

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" {...props} ref={ref} />
));

function DeleteConfirmationDialog(props) {
    const classes = useStyles();
    const {
        open,
        title,
        description,
        onCloseDeleteDialog,
        onDeleteConfirmed,
        onDeleteRejected,
    } = props;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onCloseDeleteDialog}
            aria-labelledby="delete-confirmation-dialog-title"
            aria-describedby="delete-confirmation-dialog-description"
        >
            <DialogTitle id="delete-confirmation-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-confirmation-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className={classes.yesBtn} onClick={onDeleteConfirmed}>
                    Yes
                </Button>
                <Button className={classes.noBtn} onClick={onDeleteRejected}>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmationDialog;
