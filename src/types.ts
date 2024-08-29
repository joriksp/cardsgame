export enum Suits {
   Diamond = "diamond",
   Club = "club",
   Heart = "heart",
   Spade = "spade",
}

export interface Card {
   suit: Suits;
   rank: string;
}
