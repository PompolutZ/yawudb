import React, { useEffect, useRef, useState } from "react";
import { Grid } from "react-virtualized";
import PropTypes from 'prop-types';

const ratio = 744 / 532;
const minOptimalWidth = 200;
const optimalHeight = 16 * 3;

function VirtualizedCardsList({ width, height, cards, children, variant = 'grid', scrollIndex = 0 }) {
    const [cardRows, setCardRows] = useState([[]]);
    const [rowHeight, setRowHeight] = useState(0);
    const [columnWidth, setColumnWidth] = useState(minOptimalWidth);
    const listRef = useRef();
    
    useEffect(() => {
        if(width === 0) return;

        if(cards.length === 0) {
            setCardRows([[]]);
            return;
        }

        let itemsPerRow;
        let rows;

        if (variant == 'list') {
            itemsPerRow = 1;
            // why not?..
            setRowHeight(optimalHeight);
            
            rows = cards.reduce((result, _, index, array) => {
                if (index % itemsPerRow === 0) {
                    result.push(array.slice(index, index + itemsPerRow));
                }
    
                return result;
            }, [])
        } else {
            itemsPerRow = Math.floor(width / minOptimalWidth);
            
            rows = cards.reduce((result, _, index, array) => {
                if (index % itemsPerRow === 0) {
                    result.push(array.slice(index, index + itemsPerRow));
                }
    
                return result;
            }, [])
            setRowHeight(width / itemsPerRow * ratio);
            // row height will be according to card's height based on keeping original aspect ratio
        }
        setCardRows(rows);
        setColumnWidth(width / itemsPerRow);    
    }, [cards, width, variant])

    const rowRenderer = ({columnIndex, key, rowIndex, style}) => {
        return children(cardRows[rowIndex][columnIndex], key, style, rowIndex, columnIndex)
    };

    return (
            <Grid
                className="outline-none scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
                ref={listRef}
                width={width}
                height={height}
                columnCount={cardRows[0].length}
                columnWidth={columnWidth}
                rowCount={cardRows.length}
                rowHeight={rowHeight}
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
    variant: PropTypes.oneOf(['list', 'grid']),
}

export default VirtualizedCardsList;
