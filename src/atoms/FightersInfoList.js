import React, { useState } from "react";
import { factionMembers } from "../data";
import { useSpring, animated as a } from "react-spring";

export default function FightersInfoList({ faction }) {
    return (
        <div className="flex-1 bg-red-500">
            { factionMembers[faction.name].map((fighter, index) => 
                <div key={fighter} className="mb-2 h-0 overflow-hidden relative"
                style={{ paddingTop: 'calc(532 / 744 * 100%)' }}>
                    <div className="absolute inset-0 flex">
                        <FighterCard faction={faction.name} index={index + 1} />    
                    </div>
                </div> 
            )}
        </div>
    )
}

function FighterCard({ faction, index }) {
    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });
    return (
        <div className="h-full relative flex-1"
            onClick={() => set((state) => !state)}
        >            
            <a.div
                className="absolute w-full h-full cursor-pointer bg-contain bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(/assets/cards/fighters/${faction}-${index}.png)`,
                    opacity: opacity.to((o) => 1 - o),
                    transform,
                }}
                />
            <a.div
                className="absolute w-full h-full cursor-pointer bg-contain bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(/assets/cards/fighters/${faction}-${index}-inspired.png)`,
                    opacity,
                    transform: transform.to((t) => `${t} rotateY(180deg)`),
                }}
            />
        </div>
    );
}