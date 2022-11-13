import React, { useState } from "react";
import { ACTIVE_FORMATS } from "@wudb";

const HexButton = ({
    format,
    odd,
    first,
    onClick,
    selected
}: {
    format: string;
    odd: boolean;
    first: boolean;
    selected: boolean;
    onClick: (format: string) => void;
}) => {
    return (
        <button onClick={() => onClick(format)}>
            <div
                className={`flex space-x-2 items-center group cursor-pointer ${
                    odd ? "ml-5" : ""
                } ${first ? "" : "-mt-3"}`}
            >
                <picture>
                    <source
                        type="image/webp"
                        srcSet={`/assets/icons/${format}_format.webp`}
                    />
                    <img
                        className={`w-10 h-11 duration-300 ${selected ? 'group-hover:scale-110 scale-105' : 'grayscale group-hover:scale-95 scale-90'}`}
                        src={`/assets/icons/${format}_format.png`}
                    />
                </picture>
                <div className="capitalize">{format}</div>
            </div>
        </button>
    );
};

const DeckPlayFormatToggle = ({
    formats,
    selectedFormat,
    onFormatChange,
}: {
    selectedFormat: string;
    onFormatChange: (format: string) => void;
    formats: string[];
}) => {
    return (
        <div className="flex flex-col space-y-2 self-stretch">
            {formats.map((format: string, i: number) => (
                <HexButton
                    format={format}
                    odd={i % 2 !== 0}
                    first={i < 1}
                    selected={selectedFormat === format}
                    onClick={onFormatChange}
                />
            ))}
        </div>
    );
};

export { DeckPlayFormatToggle };
