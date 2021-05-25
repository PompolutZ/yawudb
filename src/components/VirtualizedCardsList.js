import React, { useEffect, useRef, useState } from "react";
import { Grid } from "react-virtualized";
import PropTypes from 'prop-types';

const ratio = 744 / 532;
const minOptimalWidth = 200;

function VirtualizedCardsList({ width, height, cards, children, scrollIndex = 0 }) {
    const [cardRows, setCardRows] = useState([[]]);
    const [cardRenderHeight, setCardRenderHEight] = useState(0);
    const [columnWidth, setColumnWidth] = useState(minOptimalWidth);
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
        setCardRenderHEight(width / itemsPerRow * ratio);
        setColumnWidth(width / itemsPerRow);
    }, [cards, width])

    const rowRenderer = ({columnIndex, key, rowIndex, style}) => {
        const renderedItem = renderItem(columnIndex, rowIndex);
        return (
            <div key={key} style={style}>
                {renderedItem}
            </div>
        );
    };

    const renderItem = (columnIndex, rowIndex) => {
        const card = cardRows[rowIndex][columnIndex];
        // eslint-disable-next-line no-prototype-builtins
        if (card && !card.hasOwnProperty("name")) {
            return <span></span>;
        }

        return (
            <div className="w-full h-full flex">
                { children(card) }
            </div>
        );
    };


    return (
            <Grid
                ref={listRef}
                width={width}
                height={height}
                columnCount={cardRows[0].length}
                columnWidth={columnWidth}
                rowCount={cardRows.length}
                rowHeight={cardRenderHeight}
                cellRenderer={rowRenderer}
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
