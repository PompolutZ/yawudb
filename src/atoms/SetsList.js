import React from "react";
import { getSetNameById } from "../data/wudb";
import ExpansionIcon from "./ExpansionIcon";

const SetsList = ({ sets = [] }) => (
    <div className="flex flex-wrap">
        {sets.map(s => <ExpansionIcon key={s} setName={getSetNameById(Number(s))} />)}
    </div>
);

export default SetsList;
