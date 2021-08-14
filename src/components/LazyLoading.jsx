import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LazyLoading = () => (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        <div style={{ margin: "auto" }}>
            <CircularProgress style={{ color: "#3B9979" }} />
        </div>
    </div>
);

export default LazyLoading;
