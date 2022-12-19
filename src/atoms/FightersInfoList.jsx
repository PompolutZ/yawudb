import React, { useEffect, useState } from "react";
import { factionMembers } from "../data/wudb";
import { useSpring, animated as a } from "react-spring";
import { useDeckBuilderState } from "../pages/DeckCreator";

function useClickAway() {
    const [clickedAway, setClickedAway] = useState(false);

    useEffect(() => {
        const handleClick = (e) => {
            let el = document.elementFromPoint(e.clientX, e.clientY);
            if (el && el.nodeName !== "IMG") {
                setClickedAway(true);
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === "Escape") {
                setClickedAway(true);
            }
        };

        document.addEventListener("click", handleClick);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return clickedAway;
}

export default function FightersInfoList({ onClose }) {
    const { faction } = useDeckBuilderState();
    const clickedAway = useClickAway();

    useEffect(() => {
        if (clickedAway) {
            onClose();
        }
    }, [clickedAway, onClose]);

    return (
        <div className="flex-1 relative">
            <div className="absolute inset-0 overflow-y-auto p-4 lg:p-12">
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
            className="grid px-4 sm:px-0 mb-4 lg:w-1/3 lg:mx-auto cursor-pointer"
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
