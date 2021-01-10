import React from 'react'
import { ReactComponent as ClockIcon } from "../../svgs/clock.svg";
import { ReactComponent as HourglassIcon } from "../../svgs/hourglass-2.svg";
import { ReactComponent as ZapIcon } from "../../svgs/zap.svg";

function ScoreIcon({ scoreType, classes, ...rest }) {
    switch (scoreType) {
        case "Surge":
            return <ZapIcon className={`${classes}`} />;
        case "End":
            return <ClockIcon className={`${classes}`} />;
        case "Third":
            return <HourglassIcon className={`fill-current ${classes}`} />;
        default:
            return null;
    }
}

export default ScoreIcon
