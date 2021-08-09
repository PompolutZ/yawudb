import React from "react";
import { ReactComponent as Logo } from "../../svgs/underworlds_logo.svg";

function Divider({ className }) {
    return (
        <div
            className={`w-full flex items-center space-x-2 ${className}`}
        >
            <hr className="flex-1 border-accent" />
            <Logo className="fill-current text-accent text-2xl" />
            <hr className="flex-1 border-accent" />
        </div>
    );
}

export default Divider;
