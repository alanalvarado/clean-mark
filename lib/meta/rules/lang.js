
/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

function wrap (rule) {
  return ($) => {
    // If the program can't get a lang value from any html element, try with metadata, and if not, assign default
    let value = rule($) || 'en_US'
    if (typeof value !== 'string') return

    return value
  }
}

/**
 * Rules.
 */

module.exports = [
  wrap($ => $('[lang]').attr('lang')),
  wrap($ => $('meta[property="og:locale"]').attr('content'))
]
