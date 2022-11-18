const sizes = {
    sm: "w-6 h-7",
    lg: "w-10 h-11",
} as const;

export const PlayFormatPicture = ({
    format,
    className,
    size = "lg",
}: {
    format: string;
    className?: string;
    size?: keyof typeof sizes
}) => {

    return (    <picture>
        <source
            type="image/webp"
            srcSet={`/assets/icons/${format}_format.webp`}
        />
        <img
            className={`${sizes[size]} duration-300 ${className}`}
            src={`/assets/icons/${format}_format.png`}
        />
    </picture>
)
};
