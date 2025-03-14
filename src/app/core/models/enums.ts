export enum Category {
  BEST_SELLER = 'bestSeller',
  VALUE_MEALS = 'valueMeals',
  BIBING_MAMON = 'bibingMamon',
  FAMILY_FAVORITES = 'famFav',
  PARTY_PACK = 'partyPack',
  RICE_BOWL = 'riceBowl',
  BEVERAGES = 'beverages',
}


export const CategorySubheaders: { [key: string]: string } = {
  [Category.BEST_SELLER]: 'Our Best Sellers',
  [Category.VALUE_MEALS]: 'Affordable Meal Options',
  [Category.BIBING_MAMON]: 'Delicious Filipino Pastry',
  [Category.FAMILY_FAVORITES]: 'Meals Loved by the Whole Family',
  [Category.PARTY_PACK]: 'Perfect for Large Gatherings',
  [Category.RICE_BOWL]: 'Satisfying Rice-Based Meals',
  [Category.BEVERAGES]: 'Refreshing Drinks for Every Taste',
};

export enum DropdownOptions {
  BEST_SELLER = 'BEST_SELLER',
  VALUE_MEALS = 'VALUE_MEALS',
  BIBING_MAMON = 'BIBING_MAMON',
  FAMILY_FAVORITES = 'FAMILY_FAVORITES',
  PARTY_PACK = 'PARTY_PACK',
  RICE_BOWL = 'RICE_BOWL',
  BEVERAGES = 'BEVERAGES',
}

export enum Status {
  ACTIVE = 1,
  DELETED = 2
}