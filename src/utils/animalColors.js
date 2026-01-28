// Animal color mapping for visual distinction
export const ANIMAL_COLORS = {
  fox: '#ff6f00',
  wildboar: '#795548',
  default: '#757575',
};

/**
 * Get the color associated with an animal type
 * @param {string} animal - The animal name (e.g., 'fox', 'wildboar')
 * @returns {string} The hex color code for the animal
 */
export const getAnimalColor = (animal) => {
  return ANIMAL_COLORS[animal?.toLowerCase()] || ANIMAL_COLORS.default;
};
