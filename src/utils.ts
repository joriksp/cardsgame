export const varibleGap = (
   gapSizes: number[],
   gapValues: number[],
   cardsCount: number
) => {
   let gap = gapValues[0];

   for (let i = 0; i < gapSizes.length; i++) {
      if (cardsCount > gapSizes[i]) {
         gap = gapValues[i + 1];
      }
   }

   return gap;
};
