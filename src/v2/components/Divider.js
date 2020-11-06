import React from "react";
import { ReactComponent as Logo } from "../../svgs/underworlds_logo.svg";

function Divider({ className }) {
    return (
        <div
            className={`w-full grid grid-cols-1fr/auto/1fr items-center gap-2 ${className}`}
        >
            <hr className="border-accent" />
            <Logo className="fill-current text-accent text-2xl" />
            <hr className="border-accent" />
        </div>
    );
}

export default Divider;
