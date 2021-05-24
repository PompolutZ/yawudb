import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { List, AutoSizer } from "react-virtualized";
import PropTypes from 'prop-types';

const ratio = 744 / 532;
const minOptimalWidth = 200;

function VirtualizedCardsList({ cards, children, scrollIndex = 0 }) {
    const [cardRows, setCardRows] = useState([]);
    const [cardRenderHeight, setCardRenderHEight] = useState(0);
    const widthRef = useRef(0);
    const heightRef = useRef(0);
    
    useLayoutEffect(() => {
        widthRef.current = document.getElementById("yawudb_main").offsetWidth;
        heightRef.current = document.getElementById("yawudb_main").offsetHeight;
    }, [])

    useEffect(() => {
        const itemsPerRow = Math.floor(widthRef.current / minOptimalWidth);
        const rows = cards.reduce((result, _, index, array) => {
            if (index % itemsPerRow === 0) {
                result.push(array.slice(index, index + itemsPerRow));
            }

            return result;
        }, []);

        setCardRows(rows);
        setCardRenderHEight(widthRef.current / itemsPerRow * ratio)
    }, [cards])

    const rowRenderer = (params) => {
        const renderedItem = renderItem(params.index);
        return (
            <div key={params.key} style={params.style}>
                {renderedItem}
            </div>
        );
    };

    const renderItem = (index) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!cards[index].hasOwnProperty("name")) {
            return <span></span>;
        }

        return (
            <div className="w-full h-full flex">
                { children(cardRows[index] || []) }
            </div>
        );
    };


    return (
        <AutoSizer>
            {({ width, height }) => (
                <List
                    width={width}
                    height={height}
                    rowCount={cardRows.length}
                    rowHeight={cardRenderHeight}
                    rowRenderer={rowRenderer}
                    scrollToIndex={scrollIndex}
                />
            )}
        </AutoSizer>
    );
}

VirtualizedCardsList.propTypes = {
    cards: PropTypes.array,
    children: PropTypes.func.isRequired,
    scrollIndex: PropTypes.number,
}

export default VirtualizedCardsList;
