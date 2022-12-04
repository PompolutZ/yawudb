import { useHistory, useParams } from "react-router-dom";
import { DeckPlayFormatToggle } from "@components/DeckPlayFormatToggle";
import { ACTIVE_FORMATS, boards as wuboards, getBoardsValidForFormat } from "../../data/wudb";
import { BOARDS_BASE } from "../../constants/routes";
import SectionTitle from "../../v2/components/SectionTitle";

interface BoardsRouteParams {
    format: string;
}

const BoardPicture = ({ boardId }: { boardId: number }) => {
    const idx = `${boardId}`.padStart(2, "0");
    const filename = `BOARD${idx}`;
    const path = "/assets/boards/";
    return (
        <picture>
            <source type="image/avif" srcSet={`${path}${filename}.avif`} />
            <source type="image/webp" srcSet={`${path}${filename}.webp`} />
            <img alt={wuboards[boardId].name} src={`${path}${filename}.jpg`} />
        </picture>
    );
};

export const BoardsPage = () => {
    const { format } = useParams<BoardsRouteParams>();
    const history = useHistory();
    const boards =
        getBoardsValidForFormat(format)?.sort(
            (b1: number, b2: number) => b2 - b1
        ) ?? [];
    return (
        <div className="flex-1 p-4 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-2">
            <div className="bg-gray-200 lg:p-4 flex flex-col space-y-4">
                <SectionTitle title="Boards" className="text-gray-700" />
                <DeckPlayFormatToggle
                    selectedFormat={format}
                    formats={ACTIVE_FORMATS}
                    onFormatChange={(format) =>
                        history.replace(`${BOARDS_BASE}/${format}`)
                    }
                />
            </div>
            <section className="h-4 w-full col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {boards.map((boardId) => (
                    <article className="flex flex-col space-y-2 p-4">
                        <h3 className="text-xl">{wuboards[boardId].name}</h3>
                        <BoardPicture boardId={boardId} />
                        <p className="italic">
                            <span className="font-bold">Location: </span>
                            <span>{wuboards[boardId].location}</span>
                        </p>
                    </article>
                ))}
            </section>
        </div>
    );
};
