/**
 * The tasting menu, as structured data rather than a single run of <br/> tags.
 *
 * This is the restaurant's own copy. Spelling and punctuation were corrected
 * once, with the owner's sign-off; beyond that, don't rewrite the wording —
 * raise suggested changes rather than applying them.
 */

export type Course = {
  name: string;
  description?: string;
};

export type Menu = {
  name: string;
  price: string;
  courses: Course[];
  pairings: { name: string; price: string }[];
};

export const tastingMenu: Menu = {
  name: 'Menu bé',
  price: '€220',
  courses: [
    { name: 'Cauliflower and Caviar' },
    { name: 'Peas and White Asparagus' },
    { name: 'Kingfish, Apple, Wasabi' },
    { name: 'Scallops, Egg, XO' },
    { name: 'Lobster, Citrus, Yuzu Kosho' },
    { name: 'Quail, Plum, Chard' },
    { name: 'Strawberry, Crème Anglaise' },
    { name: 'Chocolate, Hazelnut, Miso' },
  ],
  pairings: [
    {
      name: 'Wine Pairing',
      price: '€175',
    },
    {
      name: 'Non-Alcoholic Pairing',
      price: '€100',
    },
  ],
};
