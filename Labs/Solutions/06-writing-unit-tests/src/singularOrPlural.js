/**
 * Given a number, it returns the respective singular or plural word
 * @param {Number} count
 * @param {String} singular
 * @param {String} plural
 * @return {String}
 * @example
 * (1, 'woman', 'women') -> woman
 * (2, 'person', 'people') -> people
 */
function getSinguralOrPlural(count, singular, plural) {
  if (count < 0 || typeof count != "number") {
    throw new Error("The first parameter needs to be a number 0 or higher");
  }
  if (count === 1) {
    return singular;
  }
  return plural;
  // return count > 1 ? plural : singular
}

module.exports = getSinguralOrPlural;
