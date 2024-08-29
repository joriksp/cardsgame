export enum Suits {
   Diamond = "diamonds",
   Club = "clubs",
   Heart = "hearts",
   Spade = "spades",
}

export enum Ranks {
   Ace = "ace",
   Queen = "queen",
   King = "king",
   Jack = "jack",
   Two = "2",
   Three = "3",
   Four = "4",
   Five = "5",
   Six = "6",
   Seven = "7",
   Eight = "8",
   Nine = "9",
   Ten = "10",
}

export interface CardI {
   suit: Suits;
   rank: Ranks;
   id: number;
}
