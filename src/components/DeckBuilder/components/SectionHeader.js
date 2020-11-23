import React from "react";
import Typography from "@material-ui/core/Typography";

function SectionHeader({ children, ...rest }) {
    return (
        <div className="my-4 mx-2 border-b border-gray-500">
            <Typography variant="h6" className="text-gray-800">{children}</Typography>
        </div>
    );
}

export default SectionHeader;
