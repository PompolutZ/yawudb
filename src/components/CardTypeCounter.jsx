import React from "react";

const TypeCounter = ({ type, count }) => (
    <div
        style={{ display: "flex", alignItems: "center", marginRight: ".5rem" }}
    >
        <img
            src={`/assets/icons/${type}-icon.png`}
            alt={type}
            width="24"
            height="24"
            style={{ margin: "0 .1rem 0 0" }}
        />
        <div style={{ margin: "0 0 0 .1rem", fontSize: "1.2rem" }}>{count}</div>
    </div>
);

const GambitsCounter = ({ count, isAnySpells }) => (
    <div
        style={{ display: "flex", alignItems: "center", marginRight: ".5rem" }}
    >
        <img
            src={`/assets/icons/ploy-icon.png`}
            alt="ploy"
            width="24"
            height="24"
            style={{ margin: "0 .1rem 0 0" }}
        />
        {isAnySpells && (
            <img
                src={`/assets/icons/spell-icon.png`}
                alt="gambit spell"
                width="24"
                height="24"
                style={{ margin: "0 .1rem 0 0" }}
            />
        )}
        <div style={{ margin: "0 0 0 .1rem", fontSize: "1.2rem" }}>{count}</div>
    </div>
);

const CardTypeCounter = ({
    objectivesCount,
    gambitsCount,
    upgradesCount,
    isAnySpells,
}) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            margin: "auto 1rem .5rem 1rem",
        }}
    >
        <TypeCounter type="objective" count={objectivesCount} />
        <GambitsCounter count={gambitsCount} isAnySpells={isAnySpells} />
        <TypeCounter type="upgrade" count={upgradesCount} />
    </div>
);

export default CardTypeCounter;
