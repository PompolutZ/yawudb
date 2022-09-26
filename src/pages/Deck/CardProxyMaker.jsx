import React from "react";
import { useState } from "react";

const CardProxyMaker = ({ cards = [], onExit }) => {
    const [selectedCardIds, setSelectedCardIds] = useState(cards.map(c => c.id));

    const handleDownload = async () => {
        const { default: jsPDF } = await import("jspdf");
        let doc = new jsPDF({
            unit: "mm",
        });

        const w = 64.5;
        const h = 89.9;

        const cardsToPrint = cards.filter(card => selectedCardIds.includes(card.id));

        const pages = cardsToPrint.reduce((acc, el, index, array) => {
            if (index % 9 === 0) {
                acc.push(array.slice(index, index + 9));
            }
            return acc;
        }, []);

        for (let page of pages) {
            {
                const index = pages.indexOf(page);
                if (index > 0) {
                    doc.addPage();
                }
            }

            let rowIdx = 0;
            let x = 3;
            let y = 3;
            let idx = 0;

            for (let c of page) {
                doc.addImage(
                    document.getElementById(`proxy ${c.id}`),
                    "png",
                    x,
                    y,
                    w,
                    h,
                    "",
                    "SLOW"
                );
                x += w + 3;
                idx += 1;

                if (idx % 3 === 0) {
                    rowIdx += 1;
                    x = 3;
                    y = rowIdx * h + rowIdx * 5;
                    console.log(x, y);
                }
            }
        }

        doc.save("cards.pdf");
        onExit();
    };

    const handleToggleCardSelected = cardId => () => {
        const selectedCardIndex = selectedCardIds.indexOf(cardId);

        if (selectedCardIndex >= 0) {
            setSelectedCardIds(selectedCardIds.filter(id => id !== cardId));
        } else {
            setSelectedCardIds([...selectedCardIds, cardId]);
        }
    }

    const toggleAll = () => {
        if (selectedCardIds.length > 0) {
            setSelectedCardIds([]);
        } else {
            setSelectedCardIds(cards.map(({ id }) => id ));
        }
    }

    return (
        <div className="fixed inset-0 z-10 p-8 backdrop-blur">
            <div className="flex w-full h-full flex-col">
                <div className="flex-1 overflow-y-auto grid grid-cols-6 gap-y-2 p-4">
                    {cards.map((card) => (
                        <img
                            id={`proxy ${card.id}`}
                            key={card.id}
                            src={`/assets/cards/${String(card.id).padStart(
                                5,
                                "0"
                            )}.png`}
                            className={`w-[64.5mm] h-[89.9mm] filter ${selectedCardIds.includes(card.id) ? 'grayscale-0' : 'grayscale'}`}
                            onClick={handleToggleCardSelected(card.id)}
                        />
                    ))}
                </div>
                <div className="bg-gray-300 p-4 flex">
                    <button
                        className="btn btn-purple mr-8 cursor-pointer px-4 py-2 font-bold"
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                    <button
                        className="btn btn-purple mr-8 cursor-pointer px-4 py-2 font-bold"
                        onClick={toggleAll}
                    >
                        Toggle All
                    </button>
                    <button
                        className="ml-auto btn btn-purple mr-8 cursor-pointer px-4 py-2 font-bold"
                        onClick={onExit}
                    >
                        Quit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardProxyMaker;
