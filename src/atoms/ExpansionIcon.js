import React from "react";

function ExpansionIcon({ setName, variant, ...rest }) {
    const size = 
        variant == 'large' ? "w-12 h-12" : 
        variant == 'medium' ? "w-8 h-8" :
        "w-4 h-4";
        
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/icons/${setName}-icon.webp`}
            />
            <img
                src={`/assets/icons/${setName}-icon-24.png`}
                alt={`${setName}`}
                className={`${size} ${rest.className}`}
            />
        </picture>
    );
}

export default ExpansionIcon;
