import React from "react";

function Logo({ className }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet="/Wunderworlds_Logo_sm.webp"
            />
            <img src="/Wunderworlds_Logo_sm.png" className={className} />
        </picture>
    );
}

export default Logo;
