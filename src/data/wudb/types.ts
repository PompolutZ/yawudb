export interface Card {
    id: number;
    factionId: number;
    setId: number,
    name: string,
    type: string,
    glory: number;
    rule: string;
    scoreType?: string; // "End";
    status: string; //"V--_V-_V";
    rotated: boolean;
    duplicates: number[];
}