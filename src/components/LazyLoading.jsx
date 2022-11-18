import React from "react";
import { ReactComponent as Logo } from "@icons/underworlds_logo.svg";

const LazyLoading = () => (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        <div style={{ margin: "auto" }}>
            <Logo className="animate-pulse fill-current text-purple-900 text-9xl" />
        </div>
    </div>
);

export default LazyLoading;
