import React, { useState } from "react";
import WUCard from "./WUCard";

function ExpandableWUCard(props) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandChange = () => {
        setExpanded(prev => !prev);
    };

    return (
        <WUCard
            {...props}
            expanded={expanded}
            onExpandChange={handleExpandChange}
        />
    );
}

export default ExpandableWUCard;
