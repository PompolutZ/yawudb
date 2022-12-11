type Size = "small" | "large";

interface FactionDeckPictureProps {
    faction: string;
    size: Size;
    className: string;
}

const variants: Record<Size, Record<string, string>> = {
    small: {
        container: "w-[48px] h-[48px] relative",
        icon: "absolute w-[28px] h-[28px] bottom-[2px] left-[4px]",
    },
    large: {
        container: "w-[80px] h-[80px] relative",
        icon: "absolute w-[50px] h-[50px] bottom-[2px] left-[5px]",
    },
};

export function FactionDeckPicture({
    faction,
    className,
    size = "small",
}: FactionDeckPictureProps) {
    return (
        <div className={className}>
            <div className={variants[size].container}>
                <div className={variants[size].icon}>
                    <picture>
                        <source
                            type="image/webp"
                            srcSet={`/assets/icons/${faction}-icon.webp`}
                        />
                        <img src={`/assets/icons/${faction}-icon.png`} />
                    </picture>
                </div>
                <picture>
                    <source
                        type="image/webp"
                        srcSet="/assets/icons/Faction_Ring_with_Cards.webp"
                    />
                    <img
                        className="absolute"
                        src="/assets/icons/Faction_Ring_with_Cards.png"
                    />
                </picture>
            </div>
        </div>
    );
}

export function FactionPicture({
    faction,
    size = "w-20 h-20",
}: {
    faction: string;
    size: string;
}) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/icons/${faction}-icon.webp`}
            />

            <img
                className={`${size}`}
                src={`/assets/icons/${faction}-icon.png`}
            />
        </picture>
    );
}
