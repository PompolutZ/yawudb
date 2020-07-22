import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import makeStyles from '@material-ui/core/styles/makeStyles'
import DeleteIcon from '@material-ui/icons/Delete'
import PublicIcon from '@material-ui/icons/Public'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        height: '90px'
    },

    childrenContainer: {
        flex: '1 0 100%',
        borderBottom: `1px solid ${theme.palette.primary.main}`
    },

    shareDeckContainer: {
        color: "white",
        flex: "0 0 90px",
        background: "rgba(38, 166, 91, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    deleteDeckContainer: {
        color: "white",
        flex: "0 0 90px",
        background: "rgba(240, 52, 52, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

function MotionDeckThumbnail({ className, children }) {
    const classes = useStyles();
    const [currentAction, setCurrentAction] = useState(null)
    const isMd = useMediaQuery('(min-width: 700px)');
    const dragStartOffsetXRef = useRef(0)
    const x = useMotionValue(0)
    const opacityShare = useTransform(x, [0, 50], [0, 1])
    const opacityDelete = useTransform(x, [-50, 0], [1, 0])
    const handleDragEnd = (event, info) => {
        const deltaPercentage =
            (info.offset.x - dragStartOffsetXRef.current) / info.offset.x
        const directionToRight = +(info.offset.x > 0)
        console.log('End', directionToRight, deltaPercentage)
        if (deltaPercentage > 0.5) {
            //setCurrentAction(actions[directionToRight]);
        }
        dragStartOffsetXRef.current = 0
    }

    const handleDragStart = (event, info) => {
        console.log(info.offset)
        dragStartOffsetXRef.current = info.offset.x
    }
    return (
        <motion.div
            className={classes.root}
            drag={isMd ? false : 'x' }
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ x }}
            dragConstraints={{ left: 0, right: 0 }}
        >
            <motion.div className={classes.shareDeckContainer} style={{ opacity: opacityShare }}>
                <PublicIcon />
            </motion.div>
            <motion.div className={classes.childrenContainer}>{children}</motion.div>
            <motion.div className={classes.deleteDeckContainer} style={{ opacity: opacityDelete }}>
                <DeleteIcon />
            </motion.div>
        </motion.div>            
    )
}

export default MotionDeckThumbnail
