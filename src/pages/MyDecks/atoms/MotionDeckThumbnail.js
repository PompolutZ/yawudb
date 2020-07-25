import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import PublicIcon from "@material-ui/icons/Public";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        minHeight: "90px",
        width: "100%",
        position: "relative",
    },

    innerRoot: {
        display: "flex",
        justifyContent: "center",
        minHeight: "90px",
        width: "100%",
        background: 'white',
    },

    background: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
    },

    childrenContainer: {
        flex: "1 0 100%",
        borderBottom: `1px solid ${theme.palette.primary.main}`,
    },

    shareDeckContainer: {
        color: "white",
        flex: "0 0",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: '1rem',
        alignItems: "center",
        boxShadow: "inset -6px 0 10px -7px rgba(0,0,0,1)"
    },

    deleteDeckContainer: {
        color: "white",
        flex: "0 0",
        display: "flex",
        paddingLeft: '1rem',
        alignItems: "center",
        boxShadow: "inset 6px 0 10px -7px rgba(0,0,0,1)"
    },

    icon: {
        width: '2rem',
        height: '2rem',
    }
}));

function MotionDeckThumbnail({ className, children }) {
    const classes = useStyles();
    const [currentAction, setCurrentAction] = useState(null);
    const isMd = useMediaQuery("(min-width: 700px)");
    const dragOffset = 0; //isMd ? 0 : -15;
    const dragStartOffsetXRef = useRef(0);
    const x = useMotionValue(dragOffset);
    const opacityShare = useTransform(x, [0, 50], [0, 1]);
    const opacityDelete = useTransform(x, [-50, 0], [1, 0]);
    const colors = useTransform(x, [-50, 0, 50], ["rgba(240, 52, 52, 1)", "rgba(255,255,255,1)", "rgba(38, 166, 91, 1)"]);

    const handleDragEnd = (event, info) => {
        const deltaPercentage =
            (info.offset.x - dragStartOffsetXRef.current) / info.offset.x;
        const directionToRight = +(info.offset.x > 0);
        console.log("End", directionToRight, deltaPercentage);
        if (deltaPercentage > 0.5) {
            //setCurrentAction(actions[directionToRight]);
        }
        dragStartOffsetXRef.current = 0;
    };

    const handleDragStart = (event, info) => {
        console.log(info.offset);
        dragStartOffsetXRef.current = info.offset.x;
    };
    return (
        <div className={classes.root}>
            <motion.div
                className={classes.innerRoot}
                drag={isMd ? false : "x"}
                onDragOver={() => console.log(x)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{ x }}
                dragConstraints={{ left: dragOffset, right: dragOffset }}
                dragElastic={0.7}
                dragTransition={{
                    bounceStiffness: 600,
                }}
            >
                <motion.div
                    className={classes.shareDeckContainer}
                    style={{ opacity: opacityShare }}
                >
                    <PublicIcon className={classes.icon} />
                </motion.div>
                <motion.div className={classes.childrenContainer}>
                    {children}
                </motion.div>
                <motion.div
                    className={classes.deleteDeckContainer}
                    style={{ opacity: opacityDelete }}
                >
                    <DeleteIcon className={classes.icon} />
                </motion.div>
            </motion.div>

            <motion.div
                className={classes.background}
                style={{ backgroundColor: colors }}
            />
        </div>
    );
}

export default MotionDeckThumbnail;
