import React, { useState, useEffect, useMemo } from "react";
import ScoringOverview from "../../../atoms/ScoringOverview";
import { CardsList } from "./CardsList";
import SectionHeader from "./SectionHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
    useDeckBuilderState,
} from "../../../pages/DeckCreator";
import { CHAMPIONSHIP_FORMAT, validateObjectivesListForPlayFormat } from "../../../data/wudb";
import uuid4 from "uuid/v4";


function ObjectivesList() {
    const { selectedObjectives, format } = useDeckBuilderState();
    const [isValid, setIsValid] = useState(false);
    const [issues, setIssues] = useState([]);

    const totalGlory = useMemo(
        () =>
            selectedObjectives.reduce(
                (total, { glory }) => (total += glory),
                0
            ),
        [selectedObjectives]
    );

    const objectiveSummary = useMemo(
        () =>
            selectedObjectives.reduce(
                (acc, c) => {
                    acc[c.scoreType] += 1;
                    return acc;
                },
                { Surge: 0, End: 0, Third: 0 }
            ),
        [selectedObjectives]
    );

    useEffect(() => {
        const [isValid, issues] = validateObjectivesListForPlayFormat(
            selectedObjectives,
            format
        );

        setIsValid(isValid);
        setIssues(issues);

        console.log('SELECTED OBJECTIVES', selectedObjectives)
    }, [format, selectedObjectives]);

    return (
        <Grid
            item
            xs={12}
            lg={4}
            className={`${isValid ? "bg-green-100" : "bg-red-100"}`}
        >
            <SectionHeader>
                <div className="flex">
                    <h1 className="mr-4">
                        {selectedObjectives.length} Objectives
                    </h1>
                    <ScoringOverview
                        summary={objectiveSummary}
                        glory={totalGlory}
                    />
                </div>
                {!isValid && (
                    <div>
                        {
                            issues.map(issue => (
                                <Typography key={uuid4()} style={{ color: "darkred" }}>
                                    { issue }
                                </Typography>
                            ))
                        }
                    </div>
                )}
            </SectionHeader>
            <CardsList
                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                cards={selectedObjectives}
            />
        </Grid>
    );
}

export default ObjectivesList;
