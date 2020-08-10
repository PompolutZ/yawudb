import React, { useState, useRef, useCallback } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import PublicIcon from "@material-ui/icons/Public";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import __debounce from "lodash/debounce";

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
        background: "white",
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
        paddingRight: "1rem",
        alignItems: "center",
        boxShadow: "inset -6px 0 10px -7px rgba(0,0,0,1)",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },

    deleteDeckContainer: {
        color: "white",
        flex: "0 0",
        display: "flex",
        paddingLeft: "1rem",
        alignItems: "center",
        boxShadow: "inset 6px 0 10px -7px rgba(0,0,0,1)",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        }
    },

    icon: {
        width: "2rem",
        height: "2rem",
    },
}));

function MotionDeckThumbnail({ className, children, deckId, onDelete }) {
    const classes = useStyles();
    const isMd = useMediaQuery("(min-width: 700px)");
    const [{ x }, set] = useSpring(() => ({ x: 0, y: 0 }));
    let bind = useDrag(
        ({ down, movement: [mx] }) => {
            set({ x: down ? mx : 0, immediate: down });

            if (down && mx > 100) {
                handleToggleShare();
            }

            if (down && mx < -100) {
                handleDelete();
            }
        },
        {
            bounds: { left: 0, right: 0 },
            rubberband: 0.2,
            axis: "x",
        }
    );

    let gestures = isMd ? {} : {...bind()};

    const handleToggleShare = useCallback(
        __debounce(() => {
            console.log("DEBOUNCED CALLBACK");
        }, 500)
    );

    const handleDelete = useCallback(__debounce(() => onDelete(deckId), 500));

    return (
        <div className={classes.root}>
            <animated.div
                className={classes.innerRoot}
                {...gestures}
                style={{ x }}
            >
                <div className={classes.shareDeckContainer}>
                    <PublicIcon className={classes.icon} />
                </div>
                <div className={classes.childrenContainer}>{children}</div>
                <div className={classes.deleteDeckContainer}>
                    <DeleteIcon className={classes.icon} />
                </div>
            </animated.div>

            <animated.div
                className={classes.background}
                style={{
                    backgroundColor: x.to({
                        range: [-400, -50, 0, 50, 400],
                        output: [
                            "rgba(240, 52, 52, 1)",
                            "rgba(240, 52, 52, 1)",
                            "rgba(255,255,255,1)",
                            "rgba(38, 166, 91, 1)",
                            "rgba(38, 166, 91, 1)",
                        ],
                    }),
                }}
            />
        </div>
    );
}

export default MotionDeckThumbnail;
