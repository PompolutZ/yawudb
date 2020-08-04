import React, { useState, useRef, useCallback } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import PublicIcon from "@material-ui/icons/Public";
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import __debounce from 'lodash/debounce';

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

const debouncedLog = __debounce(() => console.log('DEBOUNCED'), 500);

function MotionDeckThumbnail({ className, children, deckId, onDelete }) {
    const classes = useStyles();
    const isMd = useMediaQuery("(min-width: 700px)");
    const dragOffset = 0; //isMd ? 0 : -15;
    const dragStartOffsetXRef = useRef(0);
    const [{ x }, set] = useSpring(() => ({ x: 0, y: 0 }));
    const bind = useDrag(
        ({ down, movement: [mx] }) => {
          set({ x: down ? mx : 0, immediate: down });
        
            if(down && mx > 100) {
                handleToggleShare();
                // __debounce(toggleShareCallback, 150);
                //__debounce(handleToggleShare, 150);
                // __debounce(toggleShareCallback, 150);
                // handleToggleShare();
            } 

            if(down && mx < -100) {
                handleDelete();
                // handleDelete();
            }
        },
        {
          bounds: { left: 0, right: 0 },
          rubberband: 0.2,
          axis: "x"
        }
      );
    
        // const toggleShareCallback = useCallback(__debounce(() => handleToggleShare()));

      const handleToggleShare = useCallback(__debounce(() => {
            console.log('DEBOUNCED CALLBACK');
      }, 500));

      const handleDelete = useCallback(__debounce(() => onDelete(deckId), 500));
    // const x = useMotionValue(dragOffset);
    // const opacityShare = useTransform(x, [0, 50], [0, 1]);
    // const opacityDelete = useTransform(x, [-50, 0], [1, 0]);
    // const colors = useTransform(x, [-50, 0, 50], ["rgba(240, 52, 52, 1)", "rgba(255,255,255,1)", "rgba(38, 166, 91, 1)"]);

    const handleDragEnd = (event, info) => {
        const deltaPercentage =
            (info.offset.x - dragStartOffsetXRef.current) / info.offset.x;
        const directionToRight = +(info.offset.x > 0);
        console.log("End", directionToRight, deltaPercentage);
        if (deltaPercentage > 0.5) {
            if(directionToRight) {
                // change share
            } else {
                //onDelete(deckId);
            }
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
            <animated.div
                className={classes.innerRoot}
                {...bind()}
                style={{ x }}
                // drag={isMd ? false : "x"}
                // onDragOver={() => console.log(x)}
                // onDragStart={handleDragStart}
                // onDragEnd={handleDragEnd}
                // style={{ x }}
                // dragConstraints={{ left: dragOffset, right: dragOffset }}
                // dragElastic={0.7}
                // dragTransition={{
                //     bounceStiffness: 600,
                // }}
            >
                <div
                    className={classes.shareDeckContainer}
                    // style={{ opacity: opacityShare }}
                >
                    <PublicIcon className={classes.icon} />
                </div>
                <div className={classes.childrenContainer}>
                    {children}
                </div>
                <div
                    className={classes.deleteDeckContainer}
                    // style={{ opacity: opacityDelete }}
                >
                    <DeleteIcon className={classes.icon} />
                </div>
            </animated.div>

            <animated.div
                className={classes.background}
                style={{ backgroundColor: x.to({ range: [-400, -50, 0, 50, 300], output: ["rgba(240, 52, 52, 1)", "rgba(240, 52, 52, 1)", "rgba(255,255,255,1)", "rgba(38, 166, 91, 1)", "rgba(38, 166, 91, 1)"]}) }}
            />
        </div>
    );
}

export default MotionDeckThumbnail;
