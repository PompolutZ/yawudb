import React from 'react';

function HeroImage() {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/direchasm_bg.webp`}
            />
            <img
                src={`/assets/direchasm_bg.jpg`}
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
