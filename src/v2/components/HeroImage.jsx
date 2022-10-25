import React from 'react';

function HeroImage() {
    return (
        <picture>
            <source
                type="image/avif"
                srcSet="/assets/gnarlwood_bg_xs.webp 375w, /assets/gnarlwood_bg_lg.webp 1000w"
            />
            <source
                type="image/webp"
                srcSet="/assets/gnarlwood_bg_xs.webp 375w, /assets/gnarlwood_bg_lg.webp 1000w"
            />
            <img
                srcSet="/assets/gnarlwood_bg_xs.jpg 375w, /assets/gnarlwood_bg_lg.jpg 1000w"
                style={{
                    width: "100%",
                    height: "70%",
                    objectFit: "cover",
                }}
            />
        </picture>
    );
}

export default HeroImage;
