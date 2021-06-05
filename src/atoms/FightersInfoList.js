import React, { useState } from "react";
import { factionMembers } from "../data";
import { useSpring, animated as a } from "react-spring";

export default function FightersInfoList({ faction }) {
    return (
        <div className="flex-1 relative">
            <div className="absolute inset-0 overflow-y-auto pb-12">
                {factionMembers[faction.name].map((fighter, index) => (
                    <FighterCard
                        key={fighter}
                        faction={faction.name}
                        index={index + 1}
                    />
                ))}
            </div>
        </div>
    );
}

function FighterCard({ faction, index }) {
    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });
    return (
        <div
            className="grid px-4 sm:px-0 mb-4"
            onClick={() => set((state) => !state)}
        >
            <a.img
                className="w-full rounded-sm sm:w-3/4 row-start-1 col-start-1 sm:mx-auto cursor-pointer hover:shadow-lg"
                src={`/assets/cards/fighters/${faction}-${index}.png`}
                style={{
                    opacity: opacity.to((o) => 1 - o),
                    transform,
                }}
            />
            <a.img
                className="w-full rounded-sm sm:w-3/4 row-start-1 col-start-1 sm:mx-auto cursor-pointer hover:shadow-lg"
                src={`/assets/cards/fighters/${faction}-${index}-inspired.png`}
                style={{
                    opacity,
                    transform: transform.to((t) => `${t} rotateY(180deg)`),
                }}
            />
        </div>
    );
}
