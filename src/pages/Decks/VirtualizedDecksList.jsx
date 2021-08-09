import React from "react";
import { List, AutoSizer } from "react-virtualized";
import PublicDeckLink from "./PublicDeckLink";

function VirtualizedDecksList({ source = [] }) {
    const [data, setData] = React.useState(source);
    const [scrollIndex, setScrollIndex] = React.useState(0);

    React.useEffect(() => {
        setData(source);
        setScrollIndex(0);
    }, [source]);

    const renderItem = (index) => {
        return (
            <PublicDeckLink {...data[index]} />
        );
    };

    const renderRow = (params) => {
        const renderedItem = renderItem(params.index);
        return (
            <div key={params.key} style={params.style}>
                {renderedItem}
            </div>
        );
    };

    const calcRowHeight = (params) => {
        return 110;
    };

    return (
        <AutoSizer>
            {({ width, height}) => (
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
    );
}

export default VirtualizedDecksList;
