import React from 'react';

function HeroImage() {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet="/assets/harrowdeep_bg_xs.webp 375w, /assets/harrowdeep_bg_lg.webp 1000w"
            />
            <img
                srcSet="/assets/harrowdeep_bg_xs.jpg 375w, /assets/harrowdeep_bg_lg.jpg 1000w"
                style={{
                    width: "100%",
                    height: "50%",
                    objectFit: "cover",
                }}
            />
        </picture>
    );
}

export default HeroImage;
