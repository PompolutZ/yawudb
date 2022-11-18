interface FactionDeckPictureProps {
    faction: string;
    size: string;
    className: string;
}

export function FactionDeckPicture({
    faction,
    className,
    size = "w-20 h-20",
}: FactionDeckPictureProps) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/icons/${faction}-deck.webp`}
            />

            <img
                className={`${size} ${className}`}
                src={`/assets/icons/${faction}-deck-64.png`}
            />
        </picture>
    );
}

export function FactionPicture({
    faction,
    size = "w-20 h-20",
}: FactionDeckPictureProps) {
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
