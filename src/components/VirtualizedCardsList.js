import React, { Component } from "react";
import { List, AutoSizer } from "react-virtualized";

const ratio = 744 / 532;
const minOptimalWidth = 200;

function CardPicture({ name, id }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/cards/${String(id).padStart(5, "0")}_xs.webp`}
            />
            <img
                className="relative w-full rounded-md cursor-pointer transform hover:scale-150 transition-all hover:z-10 filter hover:drop-shadow-md"
                alt={name}
                src={`/assets/cards/${String(id).padStart(5, "0")}.png`}
            />
        </picture>
    );
}

class VirtualizedCardsList extends Component {
    state = {
        cardRows: [],
        cardRenderWidth: 0,
        cardRenderHeight: 0,
        width: document.getElementById("yawudb_main").offsetWidth,
        height: document.getElementById("yawudb_main").offsetHeight,
    };

    componentDidMount() {
        const itemsPerRow = Math.floor(this.state.width / minOptimalWidth);
        const rows = this.props.cards.reduce((result, item, index, array) => {
            if (index % itemsPerRow === 0) {
                result.push(array.slice(index, index + itemsPerRow));
            }

            return result;
        }, []);

        this.setState({
            cardRows: rows,
            cardRenderWidth: this.state.width / itemsPerRow,
            cardRenderHeight: (this.state.width / itemsPerRow) * ratio,
        });
    }

    _rowRenderer = (params) => {
        const renderedItem = this._renderItem(params.index);
        return (
            <div key={params.key} style={params.style}>
                {renderedItem}
            </div>
        );
    };

    _renderItem = (index) => {
        if (!this.props.cards[index].hasOwnProperty("name")) {
            return <span></span>;
        }

        return (
            <div className="w-full h-full flex">
                {this.state.cardRows[index] &&
                    this.state.cardRows[index].map((card) => (
                        <div
                            key={card.id}
                            className="flex-1 m-2 flex items-center "
                        >
                            <CardPicture id={card.id} name={card.name} />
                        </div>
                    ))}
            </div>
        );
    };

    _setRef = (ref) => {
        this.List = ref;
    };

    _handleExpanded = (item) => {
        item.expanded = !item.expanded;
        this.List.recomputeRowHeights();
        this.List.forceUpdate();
    };

    render() {
        return (
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        ref={this._setRef}
                        width={width}
                        height={height}
                        rowCount={this.state.cardRows.length}
                        rowHeight={this.state.cardRenderHeight}
                        rowRenderer={this._rowRenderer}
                        scrollToIndex={this.props.scrollIndex}
                    />
                )}
            </AutoSizer>
        );
    }
}

export default VirtualizedCardsList;
