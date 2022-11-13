import React from "react";
import ExpansionIcon from "./ExpansionIcon";

const ToggableExpansionIcon = ({ set, variant, isEnabled, onClick }) => (
    <div
        className={`cursor-pointer ${isEnabled ? 'opacity-100' : 'opacity-20'}`}
        onClick={() => onClick(set)}
    >
        <ExpansionIcon setName={set} variant={variant} />
    </div>
);

export default ToggableExpansionIcon;
