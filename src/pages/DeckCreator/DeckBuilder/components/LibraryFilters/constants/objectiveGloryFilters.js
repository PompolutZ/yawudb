export const OBJECTIVE_GLORY_FILTERS = [
    {
        label: "1",
        filter: card => card.glory === 1,
    },
    {
        label: "2",
        filter: card => card.glory === 2,
    },
    {
        label: "3",
        filter: card => card.glory === 3,
    },
    {
        label: "4+",
        filter: card => card.glory >= 4, 
    },
]