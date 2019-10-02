import React from 'react'
import { List, AutoSizer } from 'react-virtualized'
import FluidDeckThumbnail from '../../atoms/FluidDeckThumbnail'

function VirtualizedDecksList({ source }) {
    const decks = JSON.parse(localStorage.getItem('yawudb_decks')) || {}
    const [anonDeckIds] = React.useState(JSON.parse(localStorage.getItem('yawudb_anon_deck_ids')) || []);
    const [data, setData] = React.useState(source)
    const [scrollIndex, setScrollIndex] = React.useState(0);
    
    const width = document.getElementById('yawudb_main').offsetWidth
    const height = document.getElementById('yawudb_main').offsetHeight

    React.useEffect(() => {
        setData(source);
        setScrollIndex(0);
    }, [source]);

    const renderItem = index => {
        
        return (
            <FluidDeckThumbnail
                deckId={data[index]}
                deck={decks[data[index]]}
                canUpdateOrDelete={anonDeckIds.some(anonDeckId => anonDeckId === data[index])}
            />
        )
    }

    const renderRow = params => {
        const renderedItem = renderItem(params.index)
        return (
            <div key={params.key} style={params.style}>
                {renderedItem}
            </div>
        )
    }

    const calcRowHeight = params => {
        return 90
    }

    return (
        <AutoSizer disableHeight>
            {() => (
                <List
                    width={width}
                    height={height}
                    rowCount={data.length}
                    rowHeight={calcRowHeight}
                    rowRenderer={renderRow}
                    scrollToIndex={scrollIndex}
                />
            )}
        </AutoSizer>
    )
}

export default VirtualizedDecksList
