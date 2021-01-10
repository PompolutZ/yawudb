import React from "react";
import SheduleIcon from "@material-ui/icons/Schedule";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";

const ObjectiveScoreTypeIcon = ({ type, style }) => {
    switch (type) {
        case 0:
        case 'Surge':
            return <FlashOnIcon style={style} />;
        case 1:
        case 'End':
            return <SheduleIcon style={style} />;
        case 2:
            return <HourglassFullIcon style={style} />;
        case 3:
        case 'Third':
            return <HourglassEmptyIcon style={style} />;
        default:
            return null;
    }
};

export default ObjectiveScoreTypeIcon;
