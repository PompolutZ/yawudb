import React from 'react'
import { ReactComponent as StarIcon } from "../../svgs/star.svg";

function Rank({ rank, classes, ...rest }) {
    const fullStars = new Array(5).fill(1);
    const emptyStars = new Array(5).fill(0);

    return (
        <div className="flex">
            {[...fullStars, ...emptyStars]
                .slice(5 - rank / 2, 10 - rank / 2)
                .map((star, i) => {
                    return star ? (
                        <StarIcon
                            key={i}
                            className={`fill-current ${classes}`}
                        />
                    ) : (
                        <StarIcon key={i} className={`opacity-25 ${classes}`} />
                    );
                })}
        </div>
    );
}

export default Rank
