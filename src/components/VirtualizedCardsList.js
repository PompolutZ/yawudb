import React, { useEffect, useRef, useState } from "react";
import { List } from "react-virtualized";
import PropTypes from 'prop-types';

const ratio = 744 / 532;
const minOptimalWidth = 200;

function VirtualizedCardsList({ width, height, cards, children, scrollIndex = 0 }) {
    const [cardRows, setCardRows] = useState([]);
    const [cardRenderHeight, setCardRenderHEight] = useState(0);
    const listRef = useRef();
    
    useEffect(() => {
        if(width === 0) return;
        const itemsPerRow = Math.floor(width / minOptimalWidth);
        const rows = cards.reduce((result, _, index, array) => {
            if (index % itemsPerRow === 0) {
                result.push(array.slice(index, index + itemsPerRow));
            }

            return result;
        }, []);

        setCardRows(rows);
        setCardRenderHEight(width / itemsPerRow * ratio)
    }, [cards, width])

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
        if (cards[index] && !cards[index].hasOwnProperty("name")) {
            return <span></span>;
        }

        return (
            <div className="w-full h-full flex">
                { children(cardRows[index] || []) }
            </div>
        );
    };


    return (
            <List
                ref={listRef}
                width={width}
                height={height}
                rowCount={cardRows.length}
                rowHeight={cardRenderHeight}
                rowRenderer={rowRenderer}
                scrollToIndex={scrollIndex}
            />
    );
}

VirtualizedCardsList.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cards: PropTypes.array,
    children: PropTypes.func.isRequired,
    scrollIndex: PropTypes.number,
}

export default VirtualizedCardsList;
