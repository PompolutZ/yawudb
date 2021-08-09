import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert evelevation={6} variant="filled" {...props} />;
}

export default Alert;
