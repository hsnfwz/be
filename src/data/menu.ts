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
  pairing: { name: string; price: string };
};

export const tastingMenu: Menu = {
  name: 'Menu bé',
  price: '$300',
  courses: [
    {
      name: 'Cauliflower and caviar',
      description: 'Cauliflower, crème fraîche, caviar',
    },
    {
      name: 'Tartlet',
      description: 'Tartlet filled with peas and white asparagus',
    },
    {
      name: 'Kingfish with apple and wasabi',
      description: 'Sugar salted yellowtail kingfish, apple and wasabi broth',
    },
    {
      name: 'Gently smoked scallops',
      description: 'With a butter egg sauce, roe and pickled kohlrabi',
    },
    {
      name: 'Lobster glazed with citrus fruits, yuzu kosho foam',
    },
    {
      name: 'Grilled quail, quail jus, grilled Swiss chard. Plum purée (served also with bread milk brioche)',
    },
    {
      name: 'Pre-dessert strawberry and cream',
      description: 'Cocoa butter coating filled with a fresh strawberry filling and crème Anglaise',
    },
    {
      name: 'Rhubarb and raspberry',
      description: 'Rhubarb white chocolate set custard with a raspberry broth rhubarb sorbet',
    },
    {
      name: 'Chocolate and hazelnut praline mousse seasoned with miso and an orange butter ice cream',
    },
  ],
  pairing: {
    name: 'Wine Pairing',
    price: '$200',
  },
};
