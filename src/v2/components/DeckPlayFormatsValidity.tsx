import {
    ACTIVE_FORMATS,
    checkCardIsObjective,
    checkCardIsPloy,
    checkCardIsUpgrade,
    validateDeckForPlayFormat,
} from "@wudb";
import { PlayFormatPicture } from "./PlayFormatPicture";

export const DeckPlayFormatsValidity = ({ cards }: { cards: any[] }) => {
    if (!cards.length) return null;

    const cardsByType = {
        objectives: cards.filter(checkCardIsObjective),
        gambits: cards.filter(checkCardIsPloy),
        upgrades: cards.filter(checkCardIsUpgrade),
    };
    const allValidFormats = ACTIVE_FORMATS.map((format: string) => [
        format,
        ...validateDeckForPlayFormat(cardsByType, format),
    ]).filter(([, isValid]: [unknown, boolean]) => isValid);

    if (allValidFormats.length === 0) {
        return <div className="text-red-500 text-xs mt-4">Not Valid :(</div>;
    }

    return (
        <>
            <div className="flex items-center justify-center relative h-7 w-6">
                {allValidFormats.map(([format]: [string], i: number) => (
                    <div
                        key={format}
                        className={`absolute w-6 h-7`}
                        style={{
                            zIndex: allValidFormats.length - i,
                            left: `${i * 20}px`,
                            marginLeft: `-${allValidFormats.length * 5}px`,
                        }}
                    >
                        <PlayFormatPicture format={format} size="sm" />
                    </div>
                ))}
            </div>
        </>
    );
};
