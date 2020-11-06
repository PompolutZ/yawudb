import React, { PureComponent } from "react";

class DeckIcon extends PureComponent {
    render() {
        const { width, height, faction, style } = this.props;
        const strippedFaction = faction.startsWith("n_")
            ? faction.substr(2)
            : faction;
        return (
            <picture>
                <source
                    type="image/webp"
                    srcSet={`/assets/icons/${strippedFaction}-deck.webp`}
                />
                <img
                    src={`/assets/icons/${strippedFaction}-deck-64.png`}
                    alt={`${strippedFaction}`}
                    style={{
                        ...{
                            width: width,
                            height: height,
                            margin: "0 .3rem 0 0",
                            flex: "0 0 auto",
                        },
                        ...style,
                    }}
                />
            </picture>
        );
    }
}

export default DeckIcon;
